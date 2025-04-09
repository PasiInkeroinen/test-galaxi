import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
import { useAuth } from "@/context/useAuth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/api/auth/login", { email });
      const { token } = response.data;
      login(token);
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        setError("Login failed. Please check your email.");
        console.error("Login error:", err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#005FA9]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-[#005FA9]">Login</h1>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Enter your XAMK email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#005FA9]"
          />

          <button
            type="submit"
            className="w-full bg-[#FDB913] hover:bg-yellow-500 text-white font-bold py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
