import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import { attachTokenInterceptor } from "@/api/axios";

import Layout from "./Layout";
import CreateBooking from "./pages/book/CreateBooking";
import MyBookings from "./pages/me/MyBookings";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminUsersWithBookings from "./pages/admin/AdminUsersWithBookings";
import EditBooking from "./pages/me/EditBooking";

function AppRoutes() {
  const { auth } = useAuth();

  useEffect(() => {
    if (auth?.token) {
      attachTokenInterceptor(() => auth.token);
    }
  }, [auth?.token]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="book" element={<CreateBooking />} />
        <Route path="me/bookings" element={<MyBookings />} />
        <Route path="me/bookings/edit/:id" element={<EditBooking />} />
        <Route path="admin/bookings" element={<AdminBookings />} />
        <Route path="admin/users" element={<AdminUsers />} />
        <Route
          path="admin/users-with-bookings"
          element={<AdminUsersWithBookings />}
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
