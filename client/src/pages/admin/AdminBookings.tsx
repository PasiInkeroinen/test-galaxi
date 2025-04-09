// src/pages/admin/AdminBookings.tsx

import { useState, useEffect } from "react";
import api from "@/api/axios";
import { useAuth } from "@/context/useAuth";

import { parseISO, format } from "date-fns";

interface Booking {
  id: number;
  description: string;
  startTime: string;
  endTime: string;
  computerId: number | null;
  eventType: string | null;
  createdAt: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
}

export default function AdminBookings() {
  const { auth } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (auth?.role !== "admin") return;

    const fetchBookings = async () => {
      try {
        const response = await api.get("/api/admin/bookings", {
          params: {
            startDate: startDate || undefined,
            endDate: endDate || undefined,
          },
        });
        setBookings(response.data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [auth?.role, startDate, endDate]);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Admin View: All Bookings</h2>

      <div className="flex gap-2 items-center">
        <label>Start:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-1 rounded"
        />
        <label>End:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-1 rounded"
        />
      </div>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking.id}
            className="border rounded-xl shadow p-4 bg-white space-y-2"
          >
            <p>
              <span className="font-semibold">User:</span>{" "}
              {booking.user.username} ({booking.user.email})
            </p>
            <p>
              <span className="font-semibold">Description:</span>{" "}
              {booking.description}
            </p>
            <p>
              <span className="font-semibold">Start:</span>{" "}
              {format(parseISO(booking.startTime), "Pp")}
            </p>
            <p>
              <span className="font-semibold">End:</span>{" "}
              {format(parseISO(booking.endTime), "Pp")}
            </p>
            {booking.computerId && (
              <p>
                <span className="font-semibold">Computer:</span>{" "}
                {booking.computerId}
              </p>
            )}
            {booking.eventType && (
              <p>
                <span className="font-semibold">Event Type:</span>{" "}
                {booking.eventType}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
