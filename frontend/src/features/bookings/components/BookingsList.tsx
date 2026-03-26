import { useBookings } from "../hooks/useBookings";
import { useDeleteBooking } from "../hooks/useDeleteBookings";

export function BookingsList() {
  const { bookings, setBookings, loading, error } = useBookings();
  const { remove } = useDeleteBooking();
  const currentUserId = localStorage.getItem("userId");
  const familyId = bookings[0]?.familyId;

  if (loading) return;
  if (error) return <p className="text-red-500">{error}</p>;
  if (bookings.length === 0) return <p>No bookings found.</p>;

  const handleDelete = async (id: string) => {
    await remove(id);
    setBookings((prev) => prev.filter((b) => b.bookingId !== id));
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <ul className="flex flex-col w-full max-w-4xl p-16 rounded-2xl bg-green-500/10 backdrop-blur-md space-y-4">
        <h1 className="text-white mb-2">
          Kommande bokningar för{" "}
          <span className="text-green-200 font-semibold">{familyId}</span>
        </h1>
        {bookings.map((b) => (
          <li
            key={b.bookingId}
            className={`p-4 rounded-lg text-white ${
              b.userId === currentUserId
                ? "bg-white/20 border border-green-00"
                : "bg-white/20"
            }`}
          >
            {b.userId === currentUserId && (
              <p className="text-xs text-green-200 mb-1">Din bokning</p>
            )}

            <p>{b.userId}</p>

            <p>
              Datum: {b.startDate} → {b.endDate}
            </p>
            <p>Antal personer: {b.people}</p>

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
