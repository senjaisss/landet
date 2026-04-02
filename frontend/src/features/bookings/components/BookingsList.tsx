import { useState } from "react";
import { useBookings } from "/@features/bookings/hooks/useBookings";
import { useDeleteBooking } from "/@features/bookings/hooks/useDeleteBookings";
import { ConfirmationDialog } from "/@components/ConfirmationDialog";

export function BookingsList() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { bookings, setBookings, loading, error } = useBookings();
  const { remove } = useDeleteBooking();
  const currentUserId = localStorage.getItem("userId");
  const familyId = bookings[0]?.familyId;

  if (loading) return;
  if (error) return <p className="text-red-500">{error}</p>;
  if (bookings.length === 0)
    return <p className="text-white">Inga bokningar hittades...</p>;

  const sortedBookings = [...bookings].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );

  const openDialog = (id: string) => {
    setSelectedId(id);
    setDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedId) return;

    await remove(selectedId);
    setBookings((prev) => prev.filter((b) => b.bookingId !== selectedId));

    setDialogOpen(false);
    setSelectedId(null);
  };

  return (
    <section
      className="w-full max-w-4xl p-16 pt-10 rounded-2xl bg-green-500/10 backdrop-blur-md"
      aria-label="bokningslista"
    >
      <h1 className="text-white mb-4">
        Kommande bokningar för{" "}
        <span className="text-green-200 font-semibold">{familyId}</span>
      </h1>

      <div className="max-h-[80vh] overflow-y-auto pr-2">
        <ul className="scrollable-list flex flex-col space-y-4">
          {sortedBookings.map((b) => (
            <li key={b.bookingId}>
              <article
                className={`p-4 rounded-lg text-white ${
                  b.userId === currentUserId
                    ? "bg-white/20 border border-green-400"
                    : "bg-white/20"
                }`}
              >
                {b.userId === currentUserId && (
                  <p className="text-xs text-green-200 mb-1">
                    <strong>Din bokning</strong>
                  </p>
                )}

                <p><strong>Användare:</strong> {b.userId}</p>

                <p>
                  <strong>Datum:</strong>{" "}
                  <time dateTime={b.startDate}>{b.startDate}</time> →{" "}
                  <time dateTime={b.endDate}>{b.endDate}</time>
                </p>

                <p><strong>Antal personer:</strong> {b.people}</p>

                {b.userId === currentUserId && (
                  <button
                    onClick={() => openDialog(b.bookingId)}
                    className="mt-3 text-sm text-red-200 hover:text-red-400 transition-colors"
                  >
                    Avboka
                  </button>
                )}
              </article>
            </li>
          ))}
        </ul>
      </div>
      <ConfirmationDialog
        open={dialogOpen}
        type="confirm"
        message="Vill du verkligen avboka?"
        onConfirm={confirmDelete}
        onCancel={() => setDialogOpen(false)}
      />
    </section>
  );
}
