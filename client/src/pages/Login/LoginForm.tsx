import { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email,
        }
      );

      const { token } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-xamk-light p-6 rounded shadow">
      <h1 className="text-2xl font-bold text-xamk-blue mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded bg-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-xamk-blue text-white p-2 rounded font-semibold"
        >
          Log in
        </button>
      </form>
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {token && <p className="text-green-600 mt-4">Token saved</p>}
    </div>
  );
}
