import { useState } from "react";
import api from "@/api/axios";
import { useAuth } from "@/context/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/api/auth/login", { email });
      const token = response.data.token;
      login(token);
      navigate("/"); // or redirect to bookings
    } catch {
      setError("Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-xamk-blue rounded mt-20">
      <h2 className="text-xl font-bold text-xamk-blue mb-4">Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="XAMK email"
        className="w-full p-2 border rounded mb-4"
      />
      <button
        className="w-full bg-xamk-blue text-white py-2 rounded"
        onClick={handleLogin}
      >
        Send Login Link
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
