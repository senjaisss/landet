import { NavLink } from "react-router-dom";

export function Navbar() {
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
      </div>
    </nav>
  );
}
