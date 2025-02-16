import {useForm} from "react-hook-form";
import {Room} from "@/app/types/types";

type RoomFormProps = {
  onSubmit: (data: Room) => void;
  initialData?: Room;
};

const RoomForm = ({onSubmit, initialData}: RoomFormProps) => {
  const {register, handleSubmit, formState: {errors}} = useForm<Room>({
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1">Nom de la salle</label>
        <input
          type="text"
          {...register("name", {required: "Champ obligatoire"})}
          className="w-full p-2 border rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block mb-1">Capacité</label>
        <input
          type="number"
          {...register("capacity", {required: "Champ obligatoire"})}
          className="w-full p-2 border rounded"
        />
        {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity.message}</p>}
      </div>

      <div>
        <label className="block mb-1">Équipement</label>
        <input
          type="text"
          {...register("equipment")}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {initialData ? "Modifier" : "Créer"} la salle
      </button>
    </form>
  );
};

export default RoomForm;