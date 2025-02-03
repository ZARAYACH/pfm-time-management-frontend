// contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  role: "admin" | "teacher" | "student";
  name: string;
  classId?: string;
  department?: string;
};

type AuthContextType = {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = (token: string) => {
    const decoded = JSON.parse(atob(token.split(".")[1])) as User;
    setUser(decoded);

    // Redirection selon le rôle
    if (decoded.role === "admin") {
      router.push("/admin/dashboard");
    } else if (decoded.role === "teacher") {
      router.push("/teacher/dashboard");
    } else if (decoded.role === "student") {
      router.push("/student/dashboard");
    }
  };
  setLoading(false);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);