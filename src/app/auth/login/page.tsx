"use client"; 
import { useForm } from "react-hook-form";
import { useAuth } from "@/app/contexts/AuthContext";
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Connexion</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="px-4 py-2">
            <label className="block mb-2 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Champ obligatoire" })}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Mot de passe */}
          <div className="px-4 py-2">
            <label className="block mb-2 text-gray-700 font-medium">Mot de passe</label>
            <input
              type="password"
              {...register("password", { required: "Champ obligatoire" })}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Rôle */}
          <div className="px-4 py-2">
            <label className="block mb-2 text-gray-700 font-medium">Rôle</label>
            <select
              {...register("role", { required: "Champ obligatoire" })}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
            >
              <option value="">Sélectionnez un rôle</option>
              <option value="admin">Administrateur</option>
              <option value="teacher">Enseignant</option>
              <option value="student">Étudiant</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
          </div>

          {/* Bouton */}
          <div className="px-4 py-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Se connecter
            </button>
          </div>

          {/* Lien vers l'inscription */}
          <div className="text-center mt-4">
            <span className="text-gray-600">Pas encore de compte ? </span>
            <Link href="/auth/register" className="text-blue-600 font-semibold underline hover:text-blue-700">
              S&apos;inscrire ici
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
