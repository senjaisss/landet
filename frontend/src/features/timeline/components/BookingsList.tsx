import { useBookings } from "../hooks/useBookings";

export function BookingsList() {
  const { bookings, loading, error } = useBookings();

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (bookings.length === 0) return <p>No bookings found.</p>;

  return (
    <ul className="space-y-2">
      {bookings.map((b) => (
        <li key={b.bookingId} className="border p-2 rounded">
          <p>
            <strong>Booking ID:</strong> {b.bookingId}
          </p>
          <p>
            <strong>Family:</strong> {b.familyId} | <strong>User:</strong>{" "} {b.userId}
          </p>
          <p>
            <strong>Dates:</strong> {b.startDate} → {b.endDate}
          </p>
          <p>
            <strong>People:</strong> {b.people}
          </p>
        </li>
      ))}
    </ul>
  );
}
