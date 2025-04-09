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
}

interface UserWithBookings {
  user: {
    id: number;
    email: string;
    username: string;
    role: string;
    createdAt: string;
  };
  bookings: Booking[];
}

export default function AdminUsersWithBookings() {
  const [data, setData] = useState<UserWithBookings[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.get("/api/admin/users-with-bookings");
        setData(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load users with bookings");
      }
    };

    fetch();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-xamk-light rounded shadow">
      <h1 className="text-2xl font-bold text-xamk-blue mb-6">
        Users & Bookings
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-8">
        {data.map(({ user, bookings }) => (
          <div
            key={user.id}
            className="bg-white border border-xamk-blue rounded shadow p-4"
          >
            <h2 className="text-xl font-semibold text-xamk-black mb-2">
              {user.username}
            </h2>
            <p className="text-sm">Email: {user.email}</p>
            <p className="text-sm">Role: {user.role}</p>
            <p className="text-sm mb-2 text-gray-500">
              Created: {new Date(user.createdAt).toLocaleString()}
            </p>

            {bookings.length === 0 ? (
              <p className="text-gray-500">No bookings</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {bookings.map((b) => (
                  <li
                    key={b.id}
                    className="border border-gray-300 p-3 rounded bg-gray-50 text-sm"
                  >
                    <div className="font-medium">{b.description}</div>
                    <div>
                      {new Date(b.startTime).toLocaleString()} →{" "}
                      {new Date(b.endTime).toLocaleString()}
                    </div>
                    <div>Computer ID: {b.computerId}</div>
                    {b.isRoomBooking && (
                      <div>Room type: {b.roomBookingType}</div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
