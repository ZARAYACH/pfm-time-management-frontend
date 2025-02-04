"use client";
import {useForm} from "react-hook-form";
import Link from "next/link";
import useApis from "@/app/contexts/ApiContext";
import {HTTPHeaders} from "@/app/openapi";
import {useRouter} from "next/navigation";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {authenticationApi} = useApis();
  const {register, handleSubmit, formState: {errors}} = useForm<LoginFormData>();
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    authenticationApi.login(async (requestContext) => {
      return {
        headers: {
          ...requestContext.init.headers,
          ...createAuthHeaders(data.email, data.password),
        },
      } as RequestInit;
    }).then(res => {
        const access_token = res.accessToken;
        if (!access_token) {
          return;
        }
        // const base64Url = access_token.split('.')[1];
        // const base64 = base64Url.replace('-', '+').replace('_', '/');
        // const claims = JSON.parse(window.atob(base64))
        localStorage.setItem('access_token', access_token)
        router.push("/admin/dashboard")
      }
    )
  };
  const createAuthHeaders = (username: string, password: string): HTTPHeaders => {
    const encodedCredentials = btoa(`${username}:${password}`);
    return {
      Authorization: `Basic ${encodedCredentials}`
    };
  }

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

          <button type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
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