export interface User {
  id: number;
  email: string;
  username: string;
  role: string;
  createdAt: string;
}

export interface Booking {
  id: number;
  description: string;
  startTime: string;
  endTime: string;
  computerId: number;
  isRoomBooking: boolean;
  roomBookingType: string | null;
  createdAt: string;
}
