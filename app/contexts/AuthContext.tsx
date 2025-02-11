"use client";

import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {UserDto, UserDtoRoleEnum} from "@/app/openapi";
import useApis from "@/app/contexts/ApiContext";
import {decodeJwt} from "jose";

type AuthContextType = {
  authenticated: boolean;
  user: UserDto | undefined;
  role: UserDtoRoleEnum[] | undefined;
  accessToken: string | null;
  loading: boolean,
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {

  const {tokensApi} = useApis();
  const router = useRouter();
  const pathname = usePathname();
  const [authContext, setAuthContext] = useState<AuthContextType>({} as AuthContextType);

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("accessToken");
    }
    setAuthContext(prevState => ({
        user: undefined,
        role: undefined,
        accessToken: null,
        authenticated: !prevState.authenticated,
        loading: false,
        logout
      })
    )
  }, [router])

  useEffect(() => {
    const accessToken = typeof window !== 'undefined' ? window.localStorage.getItem('access_token') : null;
    const decodedToken = accessToken && decodeJwt(accessToken);

    setAuthContext(() => ({
      authenticated: false,
      user: {email: decodedToken?.sub} as UserDto,
      loading: true,
      role: decodedToken && decodedToken['ROLES'] as string[],
      accessToken,
    } as AuthContextType));

    if (authContext?.accessToken) {
      localStorage.setItem('accessToken', authContext.accessToken);
    }
  }, [authContext?.accessToken]);

  const checkAuth = useCallback(async () => {
    const response = await fetch("/auth/validate", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      setAuthContext((prevState) => ({
        ...prevState,
        authenticated: true,
        loading: false,
      }));
      if (pathname == "/auth/login") {
        router.push("/dashboard");
      }
      return;
    }


    if (response.status === 401) {
      const accessToken = await tokensApi.refreshToken();
      if (!accessToken) {
        const decodedToken = decodeJwt(accessToken);
        setAuthContext((prevState) => ({
          ...prevState,
          accessToken: accessToken,
          user: {email: decodedToken.sub} as UserDto,
          role: decodedToken['ROLES'] as UserDtoRoleEnum[],
          authenticated: true,
          loading: false,
        }));
        router.replace(getDashboardUrl(authContext?.role?.[0]));
        return;
      }
    }
  }, [router, tokensApi]);

  useEffect(() => {
    checkAuth().catch(reason => {
      console.error(reason);
      localStorage.removeItem("accessToken");
      logout();
      router.push("/auth/login");
    });
  }, [checkAuth, logout, router, tokensApi]);

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};
export const getDashboardUrl = (role: UserDtoRoleEnum | undefined) : string => {
  if (role == "ADMIN"){
    return "/admin/dashboard"
  }
  if (role == "STUDENT"){
    return "/student/dashboard"
  }
  return "/teacher/dashboard"

}

export const useAuth = () => useContext(AuthContext);