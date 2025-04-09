import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-xamk-light p-4">
      <nav className="flex gap-4 mb-8 text-xamk-blue font-semibold">
        <Link to="/book">Book</Link>
        <Link to="/me/bookings">My Bookings</Link>
        <Link to="/admin/bookings">Admin Bookings</Link>
        <Link to="/admin/users">Admin Users</Link>
      </nav>
      <Outlet />
    </div>
  );
}
