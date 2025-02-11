// types/user.ts
export type User = {
    id: string;
    name: string;
    email: string; // Propriété manquante
    role: 'admin' | 'teacher' | 'student';
    classId?: string;
    department?: string;
    lastLogin?: Date;
  };