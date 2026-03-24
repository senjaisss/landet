import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="bg-gray-200 p-4 flex justify-center">
      <div className="flex space-x-8">
        <Link to="/bookings" className="text-gray-800 hover:text-gray-600 font-medium">
          Bookings
        </Link>
        <Link to="/create-booking" className="text-gray-800 hover:text-gray-600 font-medium">
          New Booking
        </Link>
      </div>
    </nav>
  );
}