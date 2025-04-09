import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
}

export default function EditBooking() {
  const { id } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Fetch booking
  useEffect(() => {
    if (!id) return;

    api
      .get(`/api/me/bookings/${id}`)
      .then((res) => {
        const data = res.data;
        // ✅ Unauthorized access check
        if (auth?.userId !== data.userId && auth?.role !== "admin") {
          setError("Unauthorized access to this booking.");
          return;
        }
        setBooking(data);
      })
      .catch(() => setError("Failed to load booking."))
      .finally(() => setLoading(false));
  }, [id, auth]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!booking) return;
    const { name, value } = e.target;

    setBooking({
      ...booking,
      [name]: name.includes("Time") ? new Date(value).toISOString() : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking) return;

    // ✅ Client-side validation
    const start = new Date(booking.startTime);
    const end = new Date(booking.endTime);
    const now = new Date();

    if (start < now) {
      setFormError("Start time cannot be in the past.");
      return;
    }

    if (end <= start) {
      setFormError("End time must be after start time.");
      return;
    }

    if (
      booking.computerId &&
      (booking.computerId < 1 || booking.computerId > 5)
    ) {
      setFormError("Computer ID must be between 1 and 5.");
      return;
    }

    setFormError(null);

    try {
      await api.put(`/api/me/bookings/${booking.id}`, booking);
      navigate("/me/bookings");
    } catch (err) {
      alert("Failed to update booking.");
      console.error(err);
    }
  };

  if (loading) return <div className="p-4">Loading booking...</div>;
  if (error || !booking)
    return (
      <div className="p-4 text-red-500">{error ?? "Booking not found."}</div>
    );

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4">
      <h2 className="text-xl font-bold">Edit Booking</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {formError && <p className="text-red-500 text-sm">{formError}</p>}

        <div>
          <label className="block text-sm font-medium">Description</label>
          <input
            type="text"
            name="description"
            value={booking.description}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Start Time</label>
          <input
            type="datetime-local"
            name="startTime"
            value={booking.startTime.slice(0, 16)}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">End Time</label>
          <input
            type="datetime-local"
            name="endTime"
            value={booking.endTime.slice(0, 16)}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Computer ID (1–5) or leave blank
          </label>
          <input
            type="number"
            name="computerId"
            value={booking.computerId ?? ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
            min="1"
            max="5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Event Type (optional)
          </label>
          <input
            type="text"
            name="eventType"
            value={booking.eventType ?? ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
