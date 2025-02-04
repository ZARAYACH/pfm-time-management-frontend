export type User = {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'teacher' | 'student';
    department?: string;
    classId?: string;
  };
  
  export type Room = {
    id: string;
    name: string;
    capacity: number;
    equipment: string[];
  };
  
  export type Module = {
    id: string;
    name: string;
    semester: string;
    //teacherId: string;
  };
  
  export type Teacher = {
    id: string;
    name: string;
    email: string;
    department?: string;
    subjects?: string[];
  };
  
  export type Notification = {
    id: string;
    message: string;
    date: Date;
    read: boolean;
  };

  export type ReservationRequest = {
    roomId: string;
    startTime: string; // ou Date si vous utilisez des objets Date
    endTime: string;   // ou Date si vous utilisez des objets Date
  };