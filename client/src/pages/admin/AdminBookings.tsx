import { useEffect, useState } from "react";
import api from "@/api/axios";

interface Booking {
  id: number;
  description: string;
  startTime: string;
  endTime: string;
  computerId: number;
  isRoomBooking: boolean;
  roomBookingType: string | null;
  createdAt: string;
  userId: number;
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.get("/api/bookings");
        setBookings(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch all bookings");
      }
    };

    fetch();
  }, []);

  return (
    <div className="max-w-5xl mx-auto bg-xamk-light p-6 rounded shadow">
      <h1 className="text-2xl font-bold text-xamk-blue mb-4">All Bookings</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {bookings.map((booking) => (
          <li
            key={booking.id}
            className="bg-white p-4 border border-xamk-blue rounded shadow-sm"
          >
            <h2 className="text-xamk-black font-semibold">
              {booking.description}
            </h2>
            <p className="text-sm">
              {new Date(booking.startTime).toLocaleString()} →{" "}
              {new Date(booking.endTime).toLocaleString()}
            </p>
            <p className="text-sm">User ID: {booking.userId}</p>
            <p className="text-sm">Computer: {booking.computerId}</p>
            {booking.isRoomBooking && (
              <p className="text-sm">Room Type: {booking.roomBookingType}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
