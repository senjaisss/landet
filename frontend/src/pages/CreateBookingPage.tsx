import { Navbar } from "../components/Navbar";
import { BookingForm } from "../features/booking/components/BookingForm";

export function CreateBookingsPage() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <BookingForm />
      </div>
    </>
  );
}
