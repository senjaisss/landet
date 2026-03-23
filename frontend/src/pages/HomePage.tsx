import { BookingsList } from "../features/timeline/components/BookingsList";

export function HomePage() {
  return(
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
      <BookingsList />
    </div>
  )
}