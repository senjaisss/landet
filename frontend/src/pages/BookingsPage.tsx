import { Navbar } from "../components/Navbar.tsx";
import { BookingsList } from "../features/create-booking/components/BookingsList.tsx";

export function BookingsPage() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
        <BookingsList />
      </div>
    </>
  );
}
