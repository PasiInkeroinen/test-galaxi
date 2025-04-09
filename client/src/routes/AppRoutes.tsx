import { Routes, Route } from "react-router-dom";
import Layout from "@/Layout";
import CreateBooking from "@/pages/book/CreateBooking";
import MyBookings from "@/pages/me/MyBookings";
import AdminBookings from "@/pages/admin/AdminBookings";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminUsersWithBookings from "@/pages/admin/AdminUsersWithBookings";
import EditBooking from "@/pages/me/EditBooking";
import Login from "@/pages/Login/Login";
import PrivateRoute from "@/components/PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route
          path="book"
          element={
            <PrivateRoute>
              <CreateBooking />
            </PrivateRoute>
          }
        />
        <Route
          path="me/bookings"
          element={
            <PrivateRoute>
              <MyBookings />
            </PrivateRoute>
          }
        />
        <Route
          path="me/bookings/edit/:id"
          element={
            <PrivateRoute>
              <EditBooking />
            </PrivateRoute>
          }
        />
        <Route
          path="admin/bookings"
          element={
            <PrivateRoute>
              <AdminBookings />
            </PrivateRoute>
          }
        />
        <Route
          path="admin/users"
          element={
            <PrivateRoute>
              <AdminUsers />
            </PrivateRoute>
          }
        />
        <Route
          path="admin/users-with-bookings"
          element={
            <PrivateRoute>
              <AdminUsersWithBookings />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}
