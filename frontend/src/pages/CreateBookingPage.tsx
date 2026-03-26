import { Navbar } from "../components/Navbar";
import { BookingForm } from "../features/create-booking/components/BookingForm";
import bgImage from "../assets/landet2.jpg";

export function CreateBookingsPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center pt-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="flex flex-1 justify-center items-center">
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
