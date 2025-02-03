"use client";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

type LoginFormData = {
  email: string;
  password: string;
  role: "admin" | "teacher" | "student";
};

export default function LoginPage() {
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) login(result.token);
    } catch (error) {
      console.error("Erreur de connexion", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Connexion</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Champ obligatoire" })}
              className="w-full p-2 border rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Mot de passe</label>
            <input
              type="password"
              {...register("password", { required: "Champ obligatoire" })}
              className="w-full p-2 border rounded"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Rôle</label>
            <select
              {...register("role", { required: "Champ obligatoire" })}
              className="w-full p-2 border rounded"
            >
              <option value="">Sélectionnez un rôle</option>
              <option value="admin">Administrateur</option>
              <option value="teacher">Enseignant</option>
              <option value="student">Étudiant</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Se connecter
          </button>

          <div className="text-center mt-4">
            <span className="text-gray-600">Pas encore de compte ? </span>
            <Link href="/auth/register" className="text-blue-500 hover:underline">
              S&apos;inscrire ici
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}