"use client";
import TeacherForm from "@/components/forms/TeacherForm";
import { useRouter } from "next/navigation";
import { Teacher } from "@/types/types";

const NewTeacherPage = () => {
  const router = useRouter();

  const handleTeacherSubmit = async (data: Omit<Teacher, "id">) => {
    await fetch("http://localhost:5000/teachers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    router.push("/admin/teachers");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Ajouter un enseignant</h1>
      <TeacherForm onSubmit={handleTeacherSubmit} />
    </div>
  );
};

export default NewTeacherPage;
