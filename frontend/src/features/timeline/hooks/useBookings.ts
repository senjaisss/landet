import { useState, useEffect } from "react";
import type { Booking } from "../services/bookings";
import { getBookings } from "../services/bookings";

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await getBookings();
        setBookings(data);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch bookings",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  return { bookings, loading, error };
}
