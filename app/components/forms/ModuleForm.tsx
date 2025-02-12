import { useForm } from "react-hook-form";
import {CourseDto} from "@/app/openapi";

type ModuleFormProps = {
  onSubmit: (data: CourseDto) => void;
  initialData?: CourseDto;
};

const ModuleForm = ({ onSubmit, initialData }: ModuleFormProps) => {
  const { register, handleSubmit } = useForm<CourseDto>({
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1">Nom du module</label>
        <input
          {...register("name")}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Semestre</label>
        <select
          className="w-full p-2 border rounded"
          required
        >
          <option value="S1">Semestre 1</option>
          <option value="S2">Semestre 2</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        {initialData ? "Modifier" : "Créer"} le module
      </button>
    </form>
  );
};

export default ModuleForm;