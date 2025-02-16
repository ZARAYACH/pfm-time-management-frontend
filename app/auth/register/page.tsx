"use client";
import {useForm} from "react-hook-form";
import Link from "next/link";
import useApis from "@/app/contexts/ApiContext";
import {useRouter} from "next/navigation";
import {PostUserDto} from "@/app/openapi";
import {toast} from "react-toastify";

export default function RegisterPage() {
  const {signupApi} = useApis();
  const router = useRouter();
  const {register, handleSubmit, formState: {errors}} = useForm<PostUserDto>();

  const onSubmit = async (data: PostUserDto) => {
    signupApi.signUp({
      postUserDto: {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: "STUDENT" // This has no effect and changes nothing to add an admin you need to add a user throw admin dashboard
      }
    }).then(() => toast.success("Congrats, your account was successfully created"))
      .then(() => router.push("/auth/login"));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Inscription</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Prenom</label>
            <input
              type="text"
              {...register("firstName", {required: "Champ obligatoire"})}
              className="w-full p-2 border rounded"
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="block mb-1">Nom</label>
            <input
              type="text"
              {...register("lastName", {required: "Champ obligatoire"})}
              className="w-full p-2 border rounded"
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              {...register("email", {required: "Champ obligatoire"})}
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
                minLength: {value: 8, message: "8 caractères minimum"}
              })}
              className="w-full p-2 border rounded"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
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