import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "@/api/axios";
import { useAuth } from "@/context/useAuth";

interface Booking {
  id: number;
  description: string;
  startTime: string;
  endTime: string;
  computerId: number | null;
  eventType: string | null;
  createdAt: string;
}

export default function MyBookings() {
  const { auth } = useAuth();
  const token = auth?.token;
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      const response = await api.get("/api/me/bookings");
      setBookings(response.data);
    } catch (err) {
      setError("Failed to load bookings.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      await api.delete(`/api/me/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      alert("Failed to delete booking.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchBookings();
    }
  }, [token]);

  if (loading) return <div className="p-4">Loading bookings...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (bookings.length === 0) return <div className="p-4">No bookings yet.</div>;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">My Bookings</h2>
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="border rounded-xl shadow p-4 bg-white space-y-2"
        >
          <p>
            <span className="font-semibold">Description:</span>{" "}
            {booking.description}
          </p>
          <p>
            <span className="font-semibold">Start:</span>{" "}
            {new Date(booking.startTime).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">End:</span>{" "}
            {new Date(booking.endTime).toLocaleString()}
          </p>
          {booking.computerId && (
            <p>
              <span className="font-semibold">Computer:</span> #
              {booking.computerId}
            </p>
          )}
          {booking.eventType && (
            <p>
              <span className="font-semibold">Event Type:</span>{" "}
              {booking.eventType}
            </p>
          )}

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleDelete(booking.id)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
            <Link
              to={`/me/bookings/edit/${booking.id}`}
              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
