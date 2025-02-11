"use client";
import { createContext, useState, useContext } from "react";

type Student = {
  id: number;
  name: string;
  class: string;
};

// ✅ Définition du type du contexte
type StudentsContextType = {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
};
const StudentsContext = createContext<StudentsContextType | undefined>(undefined);

export const StudentsProvider = ({ children }: { children: React.ReactNode }) => {
  const [students, setStudents] = useState([
    { id: 1, name: "Alice Dupont", class: "4ème A" },
    { id: 2, name: "Bob Martin", class: "3ème B" },
    { id: 3, name: "Charlie Leroy", class: "5ème C" },
  ]);

  return (
    <StudentsContext.Provider value={{ students, setStudents }}>
      {children}
    </StudentsContext.Provider>
  );
};

export const useStudents = () => {
  const context = useContext(StudentsContext);
  if (!context) {
    throw new Error("useStudents doit être utilisé dans un StudentsProvider");
  }
  return context;
};
