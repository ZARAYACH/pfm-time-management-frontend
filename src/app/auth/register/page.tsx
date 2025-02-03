"use client";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "teacher" | "student";
};

export default function RegisterPage() {
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) login(result.token);
    } catch (error) {
      console.error("Erreur d'inscription", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Inscription</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Nom complet</label>
            <input
              type="text"
              {...register("name", { required: "Champ obligatoire" })}
              className="w-full p-2 border rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

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
              {...register("password", { 
                required: "Champ obligatoire",
                minLength: { value: 6, message: "6 caractères minimum" }
              })}
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
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            S&apos;inscrire
          </button>

          <div className="text-center mt-4">
            <span className="text-gray-600">Déjà un compte ? </span>
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Se connecter
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}