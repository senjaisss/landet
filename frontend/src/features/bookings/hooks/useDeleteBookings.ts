import { useState } from "react";
import { deleteBooking } from "/@features/bookings/services/deleteBookings";

export function useDeleteBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async (bookingId: string) => {
    setLoading(true);
    setError(null);

    try {
      await deleteBooking(bookingId);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Delete failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error };
}
