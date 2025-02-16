"use client";

import {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {HTTPHeaders, UserDto, UserDtoRoleEnum} from "@/app/openapi";
import useApis from "@/app/contexts/ApiContext";
import {decodeJwt} from "jose";
import {LoginFormData} from "@/app/auth/login/page";

type AuthContextType = {
  authenticated: boolean;
  user: UserDto | undefined;
  role: UserDtoRoleEnum[] | undefined;
  accessToken: string | null;
  loading: boolean,
  login: (data: LoginFormData) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {

  const {authenticationApi, tokensApi, usersApi} = useApis();
  const router = useRouter();
  const pathname = usePathname();
  const [authContext, setAuthContext] = useState<AuthContextType>({} as AuthContextType);
  const publicRoutes = useMemo(() => ["/auth/register"], [])

  const createAuthHeaders = (username: string, password: string): HTTPHeaders => {
    const encodedCredentials = btoa(`${username}:${password}`);
    return {
      Authorization: `Basic ${encodedCredentials}`
    };
  }

  const checkAuth = useCallback(async () => {
    const accessToken = typeof window !== 'undefined' ? window.localStorage.getItem('access_token') : null;
    let response;
    if (accessToken) {
      response = await fetch("/auth/validate", {
        method: "GET",
        headers: [['Authorization', 'Bearer ' + accessToken]],
        credentials: "include"
      });
    }

    if (response && response.ok) {
      const user = await usersApi.getMe();
      setAuthContext(prevState => ({
        ...prevState,
        authenticated: true,
        loading: false,
        user
      }));
      if (accessToken && pathname == "/auth/login") {
        console.log(decodeJwt(accessToken)['ROLES'])
        router.replace(getDashboardUrl((decodeJwt(accessToken)['ROLES'] as UserDtoRoleEnum[])?.[0]));
      }
      return;
    }

    if (response && response.status === 401 || !accessToken) {
      const accessToken = await tokensApi.refreshToken();
      if (accessToken) {
        localStorage.setItem("access_token", accessToken?.["access_token"]);
        const decodedToken = decodeJwt(accessToken?.["access_token"]);
        const user = await usersApi.getMe();
        setAuthContext(prevState => ({
          ...prevState,
          accessToken: accessToken?.["access_token"],
          user: user,
          role: decodedToken['ROLES'] as UserDtoRoleEnum[],
          authenticated: true,
          loading: false,
        }));
        router.replace(getDashboardUrl((decodedToken['ROLES'] as UserDtoRoleEnum[])?.[0]));
        return;
      }
    }
  }, [pathname, router, tokensApi, usersApi]);

  const login = useCallback(async (data: LoginFormData) => {
    const res = await authenticationApi.login(async (requestContext) => {
      return {
        headers: {
          ...requestContext.init.headers,
          ...createAuthHeaders(data.email, data.password),
        },
      } as RequestInit;
    })
    const accessToken = res.accessToken as string;
    if (!accessToken) {
      return;
    }
    localStorage.setItem('access_token', accessToken);
    setAuthContext(prevState => ({...prevState, accessToken}));

    await checkAuth();
  }, [authenticationApi, checkAuth])

  const logout = useCallback(async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("access_token");
    }
    setAuthContext(() => ({
        user: undefined,
        role: undefined,
        accessToken: null,
        authenticated: false,
        loading: false,
        logout,
        login
      })
    )
    await authenticationApi.logout()
    await fetch("/auth/logout", {
      method: "GET",
      credentials: "include"
    });
    await checkAuth().catch(() => {
      router.push("/auth/login")
    })
  }, [authenticationApi, checkAuth, login, router])
  useEffect(() => {
    const accessToken = typeof window !== 'undefined' ? window.localStorage.getItem('access_token') : null;
    const decodedToken = accessToken && decodeJwt(accessToken);

    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
    }

    setAuthContext(() => ({
      authenticated: false,
      user: {email: decodedToken?.sub} as UserDto,
      loading: true,
      role: decodedToken && decodedToken['ROLES'] as string[],
      accessToken,
      login,
      logout
    } as AuthContextType));


  }, [login, logout]);


  useEffect(() => {
    if (publicRoutes.includes(pathname)) {
      return;
    }
    checkAuth().catch(reason => {
      console.error(reason);
      localStorage.removeItem("access_token");
      logout();
      router.push("/auth/login");
    });
  }, [checkAuth, logout, pathname, publicRoutes, router]);

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};
export const getDashboardUrl = (role: UserDtoRoleEnum | undefined): string => {
  if ("ROLE_" + role === "ROLE_ADMIN") {
    return "/admin/dashboard"
  }
  if ("ROLE_" + role === "ROLE_TEACHER") {
    return "/teacher/dashboard"
  }
  return "/student/dashboard"

}

export const useAuth = () => useContext(AuthContext);