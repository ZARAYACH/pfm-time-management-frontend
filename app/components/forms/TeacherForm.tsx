import {useForm} from "react-hook-form";
import {Teacher} from "@/app/types/types";

type TeacherFormProps = {
  onSubmit: (data: Teacher) => void;
  initialData?: Teacher;
};

const TeacherForm = ({onSubmit, initialData}: TeacherFormProps) => {
  const {register, handleSubmit, formState: {errors}} = useForm<Teacher>({
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1">Nom complet</label>
        <input
          {...register("name", {required: "Champ obligatoire"})}
          className="w-full p-2 border rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
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

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {initialData ? "Modifier" : "Créer"} l&apos;enseignant
      </button>
    </form>
  );
};

export default TeacherForm;