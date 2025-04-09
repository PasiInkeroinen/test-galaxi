import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

export default function LogoutButton() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-[#002F5F] hover:bg-[#005EB8] text-white px-4 py-2 rounded-xl"
    >
      Logout
    </button>
  );
}
