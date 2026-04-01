import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "/@features/login/hooks/useAuth";

export function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="flex justify-center mt-4">
      <div className="bg-green-200/70 px-6 py-3 rounded-full bg-green-500/20 backdrop-blur-md flex space-x-8">
        <NavLink
          to="/bookings"
          className={({ isActive }: { isActive: boolean }) =>
            `relative font-medium ${
              isActive
                ? "text-green-200"
                : "text-white hover:text-custom-green"
            }`
          }
        >
          BOKNINGAR
        </NavLink>

        <NavLink
          to="/create-booking"
          className={({ isActive }: { isActive: boolean }) =>
            `relative font-medium ${
              isActive
                ? "text-green-200"
                : "text-white hover:text-custom-green"
            }`
          }
        >
          NY BOKNING
        </NavLink>

        <button
        onClick={handleLogout}
        className="text-white hover:text-red-300"
      >
        Logga ut
      </button>
      </div>
    </nav>
  );
}
