import { useBookings } from "../hooks/useBookings";
import { useDeleteBooking } from "../hooks/useDeleteBookings";

export function BookingsList() {
  const { bookings, setBookings, loading, error } = useBookings();
  const { remove } = useDeleteBooking();
  const currentUserId = localStorage.getItem("userId");

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (bookings.length === 0) return <p>No bookings found.</p>;

  const handleDelete = async (id: string) => {
    await remove(id);
    setBookings((prev) => prev.filter((b) => b.bookingId !== id));
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <ul className="flex flex-col w-90 p-10 rounded-2xl bg-green-500/10 backdrop-blur-md">
        <h1 className="text-costum-green-2xl font-bold mb-4">
          Allas bokningar
        </h1>
        {bookings.map((b) => (
          <li
            key={b.bookingId}
            className="p-4 rounded-lg bg-white/20 text-white shadow-sm"
          >
            {/* <p>
              <strong>Booking ID:</strong> {b.bookingId}
            </p> */}
           {/*  <p>
              <strong>Family:</strong> {b.familyId} | <strong>User:</strong>{" "}
              {b.userId}
            </p> */}
            <p>
              {b.userId}
            </p>

            <p>
              Datum: {b.startDate} → {b.endDate}
            </p>
            <p>
              Antal personer: {b.people}
            </p>

            {b.userId === currentUserId && (
              <button
                onClick={() => handleDelete(b.bookingId)}
                className="mt-3 text-sm text-red-200 hover:text-red-400 transition-colors"
              >
                Avboka
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
