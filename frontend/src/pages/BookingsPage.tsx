import { Navbar } from "../components/Navbar.tsx";
import { BookingsList } from "../features/bookings/components/BookingsList.tsx";
import bgImage from "../assets/landet2.jpg";

export function BookingsPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center pt-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="flex flex-1 justify-center items-center">
          <BookingsList />
        </div>
      </div>
    </div>
  );
}
