import { useForm } from "react-hook-form";
import { ReservationRequest } from "../../types/types";

type ReservationFormProps = {
  onSubmit: (data: ReservationRequest) => void;
};

const ReservationForm = ({ onSubmit }: ReservationFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ReservationRequest>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1">Salle</label>
        <select
          {...register("roomId", { required: "Champ obligatoire" })}
          className="w-full p-2 border rounded"
        >
          <option value="">Sélectionner une salle</option>
          <option value="1">Salle 1</option>
          <option value="2">Salle 2</option>
        </select>
        {errors.roomId && <p className="text-red-500 text-sm">{errors.roomId.message}</p>}
      </div>

      <div>
        <label className="block mb-1">Date de début</label>
        <input
          type="datetime-local"
          {...register("startTime", { required: "Champ obligatoire" })}
          className="w-full p-2 border rounded"
        />
        {errors.startTime && <p className="text-red-500 text-sm">{errors.startTime.message}</p>}
      </div>

      <div>
        <label className="block mb-1">Date de fin</label>
        <input
          type="datetime-local"
          {...register("endTime", { required: "Champ obligatoire" })}
          className="w-full p-2 border rounded"
        />
        {errors.endTime && <p className="text-red-500 text-sm">{errors.endTime.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Valider la réservation
      </button>
    </form>
  );
};

export default ReservationForm;