import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "@/api/axios";
import { useAuth } from "@/context/useAuth";

interface Booking {
  id: number;
  userId: number;
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
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize] = useState(5);
  const [userId, setUserId] = useState("");
  const [computerId, setComputerId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = { page, pageSize };
      if (userId) params.userId = userId;
      if (computerId) params.computerId = computerId;

      const res = await api.get("/api/admin/bookings", { params });
      setBookings(res.data.items);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, userId, computerId]);

  useEffect(() => {
    if (auth?.role === "admin") {
      fetchBookings();
    }
  }, [auth?.role, fetchBookings]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      await api.delete(`/api/admin/bookings/${id}`);
      fetchBookings();
    } catch (err) {
      console.error(err);
      alert("Failed to delete booking");
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">All Bookings</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="number"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
            setPage(1);
          }}
          placeholder="Filter by User ID"
          className="border rounded p-1"
        />

        <select
          value={computerId}
          onChange={(e) => {
            setComputerId(e.target.value);
            setPage(1);
          }}
          className="border rounded p-1"
        >
          <option value="">All Computers</option>
          {[1, 2, 3, 4, 5].map((id) => (
            <option key={id} value={id}>
              Computer #{id}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setUserId("");
            setComputerId("");
            setPage(1);
          }}
          className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
        >
          Reset
        </button>
      </div>

      {/* Booking List */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && bookings.length === 0 && <p>No bookings found.</p>}

      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="border rounded-xl shadow p-4 bg-white space-y-1"
        >
          <div>
            <span className="font-semibold">User:</span>{" "}
            {booking.user?.username} ({booking.user?.email})
          </div>
          <div>
            <span className="font-semibold">Description:</span>{" "}
            {booking.description}
          </div>
          <div>
            <span className="font-semibold">Start:</span>{" "}
            {new Date(booking.startTime).toLocaleString()}
          </div>
          <div>
            <span className="font-semibold">End:</span>{" "}
            {new Date(booking.endTime).toLocaleString()}
          </div>
          {booking.computerId && (
            <div>
              <span className="font-semibold">Computer:</span> #
              {booking.computerId}
            </div>
          )}
          {booking.eventType && (
            <div>
              <span className="font-semibold">Event Type:</span>{" "}
              {booking.eventType}
            </div>
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-4 items-center pt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
