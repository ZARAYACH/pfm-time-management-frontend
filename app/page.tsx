"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {useAuth} from "@/app/contexts/AuthContext";

export default function Home() {
  const router = useRouter();
  const {user, role} = useAuth();
  useEffect(() => {
    if (user && role) {
      switch(role[0]) {
        case 'admin': router.push('/admin'); break;
        case 'teacher': router.push('/teacher'); break;
        case 'student': router.push('/student'); break;
      }
    } else {
      router.push('/auth/login'); // Redirection vers la page de connexion
    }
  }, [user, router, role]);

  return null; // Aucun rendu visible
}
/*"use client";

import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/auth/loginForm";
//import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  //const router = useRouter();

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      
      if (response.ok) {
        login(data.token); // Stocke le token et redirige via AuthContext
      }
    } catch (err) {
      console.error("Erreur de connexion", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Connexion</h1>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}*/