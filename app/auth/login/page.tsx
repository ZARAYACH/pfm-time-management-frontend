"use client";
import {useForm} from "react-hook-form";
import Link from "next/link";
import {Button} from "@radix-ui/themes";
import {useState} from "react";
import {useAuth} from "@/app/contexts/AuthContext";
import {toast} from "react-toastify";

export type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {login} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const {register, handleSubmit, formState: {errors}} = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try{
      await login(data);
    } catch (error) {
      toast.error("Provided credentials don't same to work, please try again.");
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Connexion</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input type="email"
                   {...register("email", {required: "Champ obligatoire"})}
                   className="w-full p-2 border rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Mot de passe</label>
            <input
              type="password"
              {...register("password", {required: "Champ obligatoire"})}
              className="w-full p-2 border rounded"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <Button loading={loading} type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Se connecter
          </Button>

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