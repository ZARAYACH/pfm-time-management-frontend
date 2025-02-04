// app/admin/teachers/[id]/edit/page.tsx
import TeacherForm from "@/app/components/forms/TeacherForm";
import { Teacher } from "@/app/types/types";
import { notFound } from "next/navigation";

const TeacherEditPage = async ({ params }: { params: { id: string } }) => {
  // Récupérer les données mockées ou via API
  const mockTeachers: Teacher[] = [
    { id: "1", name: "Marie Curie", email: "marie@example.com" },
    { id: "2", name: "Albert Einstein", email: "albert@example.com" },
  ];

  const teacher = mockTeachers.find(t => t.id === params.id);

  if (!teacher) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Modifier l&rsquo;enseignant</h1>
      <TeacherForm initialData={teacher} onSubmit={(data) => console.log(data)} />
    </div>
  );
};

export default TeacherEditPage;