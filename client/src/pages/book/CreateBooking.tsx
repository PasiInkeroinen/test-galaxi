// src/pages/book/CreateBooking.tsx

import { useState } from "react";
import api from "@/api/axios";
import { useNavigate } from "react-router-dom";

interface BookingRequest {
  description: string;
  startTime: Date;
  endTime: Date;
  computerId?: number;
  eventType?: string;
}

export default function CreateBooking() {
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [computerId, setComputerId] = useState<number | null>(null);
  const [eventType, setEventType] = useState<string>("");

  const [availableComputers, setAvailableComputers] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const fetchAvailableComputers = async () => {
    if (!startTime || !endTime) return;

    if (startTime >= endTime) {
      setError("Start time must be before end time.");
      return;
    }

    try {
      const response = await api.get(
        `/api/computers/available?start=${startTime.toISOString()}&end=${endTime.toISOString()}`
      );
      setAvailableComputers(response.data);
    } catch (err) {
      console.error("Failed to fetch available computers", err);
      setError("Could not load available computers.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startTime || !endTime || startTime >= endTime) {
      setError("Please provide a valid date range.");
      return;
    }

    const booking: BookingRequest = {
      description,
      startTime,
      endTime,
      computerId: computerId ?? undefined,
      eventType: eventType || undefined,
    };

    try {
      await api.post("/api/me/bookings", booking);
      navigate("/me/bookings");
    } catch (err) {
      console.error("Failed to create booking", err);
      setError("Failed to create booking.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Booking</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Description:
          <input
            type="text"
            className="mt-1 block w-full border rounded px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label className="block">
          Start Time:
          <input
            type="datetime-local"
            className="mt-1 block w-full border rounded px-3 py-2"
            onChange={(e) => setStartTime(new Date(e.target.value))}
            required
          />
        </label>

        <label className="block">
          End Time:
          <input
            type="datetime-local"
            className="mt-1 block w-full border rounded px-3 py-2"
            onChange={(e) => setEndTime(new Date(e.target.value))}
            required
          />
        </label>

        <button
          type="button"
          onClick={fetchAvailableComputers}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Check Available Computers
        </button>

        {availableComputers.length > 0 && (
          <label className="block">
            Select Computer:
            <select
              className="mt-1 block w-full border rounded px-3 py-2"
              value={computerId ?? ""}
              onChange={(e) =>
                setComputerId(e.target.value ? parseInt(e.target.value) : null)
              }
            >
              <option value="">None</option>
              {availableComputers.map((id) => (
                <option key={id} value={id}>
                  Computer #{id}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="block">
          Event Type (optional):
          <input
            type="text"
            className="mt-1 block w-full border rounded px-3 py-2"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          />
        </label>

        {error && <div className="text-red-500">{error}</div>}

        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
}
