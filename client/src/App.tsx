// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthProvider";
import PrivateRoute from "@/components/PrivateRoute";

import Layout from "./Layout";
import Login from "./pages/Login/Login";
import CreateBooking from "./pages/book/CreateBooking";
import MyBookings from "./pages/me/MyBookings";
import EditBooking from "./pages/me/EditBooking";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminUsersWithBookings from "./pages/admin/AdminUsersWithBookings";

export default function App() {
  return (
    <AuthProvider>
      <Router>
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
      </Router>
    </AuthProvider>
  );
}
