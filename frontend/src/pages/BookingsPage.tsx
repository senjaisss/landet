import { Navbar } from "../components/Navbar.tsx";
import { BookingsList } from "../features/bookings/components/BookingsList.tsx";
import bgImage from "../assets/landet2.jpg";

export function BookingsPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center pt-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Navbar />
      <BookingsList />
    </div>
  );
}
