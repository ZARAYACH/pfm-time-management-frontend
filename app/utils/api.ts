import {ReservationRequest, Room, Teacher} from '../types/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';


export const fetchRooms = async (): Promise<Room[]> => {
  const res = await fetch(`${API_URL}/rooms`);
  return res.json();
};

export const fetchTeachers = async (): Promise<Teacher[]> => {
  const res = await fetch(`${API_URL}/teachers`);
  return res.json();
};

export const createReservation = async (data: ReservationRequest) => {
  const res = await fetch(`${API_URL}/reservations`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });
  return res.json();
};

export const checkConflict = async (data: ReservationRequest) => {
  const res = await fetch(`${API_URL}/reservations/check`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });
  return res.json();
};