// app/admin/teachers/[id]/edit/route.ts
import TeacherForm from "@/app/components/forms/TeacherForm";
import { Teacher } from "@/app/types/types";
import {notFound} from "next/navigation";
import {use} from "react";

const TeacherEditPage = ({params}: { params: Promise<{ id: string }> }) => {
  // Récupérer les données mockées ou via API
  const props = use(params);

  const mockTeachers: Teacher[] = [
    { id: "1", name: "Marie Curie", email: "marie@example.com" },
    { id: "2", name: "Albert Einstein", email: "albert@example.com" },
  ];

  const teacher = mockTeachers.find(t => t.id === props.id);

  if (!teacher) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Modifier l&rsquo;enseignant</h1>
      <TeacherForm initialData={teacher} onSubmit={(data) => console.log(data)} />
    </div>
  );
};

export default TeacherEditPage;