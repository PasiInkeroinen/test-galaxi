import { useState } from "react";
import api from "@/api/axios";

export default function CreateBooking() {
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [computerId, setComputerId] = useState(1);
  const [isRoomBooking, setIsRoomBooking] = useState(false);
  const [roomBookingType, setRoomBookingType] = useState<
    "private" | "public" | null
  >(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/api/book", {
        description,
        startTime,
        endTime,
        computerId,
        isRoomBooking,
        roomBookingType,
        userId: 1, // 🧪 Temporary test user ID; replace with JWT later
      });
      setMessage("Booking created successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Booking failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-xamk-light p-6 rounded shadow">
      <h1 className="text-2xl font-bold text-xamk-blue mb-4">Create Booking</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Description"
          className="w-full p-2 border rounded bg-white"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="datetime-local"
          className="w-full p-2 border rounded bg-white"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />

        <input
          type="datetime-local"
          className="w-full p-2 border rounded bg-white"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />

        <div className="space-y-2">
          <label className="block font-medium text-xamk-black">
            Computer ID:
          </label>
          <select
            value={computerId}
            onChange={(e) => setComputerId(Number(e.target.value))}
            className="w-full p-2 border rounded bg-white"
          >
            {[1, 2, 3, 4, 5].map((id) => (
              <option key={id} value={id}>
                Computer {id}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isRoomBooking}
              onChange={(e) => setIsRoomBooking(e.target.checked)}
            />
            <span className="text-xamk-black">Book entire gaming room</span>
          </label>

          {isRoomBooking && (
            <div>
              <label className="block font-medium text-xamk-black">
                Room Booking Type:
              </label>
              <select
                className="w-full p-2 border rounded bg-white"
                value={roomBookingType ?? ""}
                onChange={(e) =>
                  setRoomBookingType(
                    e.target.value === ""
                      ? null
                      : (e.target.value as "private" | "public")
                  )
                }
              >
                <option value="">Select type</option>
                <option value="private">Private</option>
                <option value="public">Public</option>
              </select>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-xamk-blue text-white p-2 rounded font-semibold"
        >
          Submit Booking
        </button>
      </form>

      {message && <p className="mt-4 text-xamk-black">{message}</p>}
    </div>
  );
}
