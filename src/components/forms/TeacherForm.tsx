"use client";
import { useForm } from "react-hook-form";
import { Teacher } from "../../types/types";

type TeacherFormProps = {
  onSubmit: (data: Teacher) => void;
  initialData?: Teacher;
};

const TeacherForm = ({ onSubmit, initialData }: TeacherFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Teacher>({
    defaultValues: initialData,
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium">Nom complet</label>
          <input
            {...register("name", { required: "Champ obligatoire" })}
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Champ obligatoire" })}
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          {initialData ? "Modifier" : "Créer"} l&apos;enseignant
        </button>
      </form>
    </div>
  );
};

export default TeacherForm;
