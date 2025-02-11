"use client";
import { useForm } from "react-hook-form";
import { useAuth } from "@/app/contexts/AuthContext";
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Créer un compte</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nom complet */}
          <div className="mb-4 px-4 py-3">
            <label className="block mb-2 text-gray-700 font-medium">Nom complet</label>
            <input
              type="text"
              {...register("name", { required: "Champ obligatoire" })}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4 px-4 py-3">
            <label className="block mb-2 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Champ obligatoire" })}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Mot de passe */}
          <div className="mb-4 px-4 py-3">
            <label className="block mb-2 text-gray-700 font-medium">Mot de passe</label>
            <input
              type="password"
              {...register("password", { 
                required: "Champ obligatoire",
                minLength: { value: 6, message: "6 caractères minimum" }
              })}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Rôle */}
          <div className="mb-4 px-4 py-3">
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
          <div className="mb-4 px-4 py-3">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              S&apos;inscrire
            </button>
          </div>

          {/* Lien vers l'inscription */}
          <div className="text-center mt-4">
            <span className="text-gray-600">Déjà un compte ? </span>
            <Link href="/auth/login" className="text-blue-600 font-semibold underline hover:text-blue-800">
              Se connecter
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
