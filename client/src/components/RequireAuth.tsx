import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

export default function RequireAuth() {
  const { auth } = useAuth();

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
