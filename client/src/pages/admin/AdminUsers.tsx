import { useEffect, useState } from "react";
import api from "@/api/axios";

interface User {
  id: number;
  email: string;
  username: string;
  role: string;
  createdAt: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/api/users");
        setUsers(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="max-w-5xl mx-auto bg-xamk-light p-6 rounded shadow">
      <h1 className="text-2xl font-bold text-xamk-blue mb-4">All Users</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="border border-xamk-blue bg-white p-4 rounded shadow-sm"
          >
            <p className="text-lg font-semibold text-xamk-black">
              {user.username}
            </p>
            <p className="text-sm text-xamk-black">Email: {user.email}</p>
            <p className="text-sm text-xamk-black">Role: {user.role}</p>
            <p className="text-sm text-gray-500">
              Created: {new Date(user.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
