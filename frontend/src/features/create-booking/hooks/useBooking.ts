import { useState } from "react";
import type { CreateBookingInput, Booking } from "/@features/create-booking/services/booking";
import { createBooking } from "/@features/create-booking/services/booking";

export function useBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (input: CreateBookingInput): Promise<Booking> => {
    setLoading(true);
    setError(null);

    try {
      const booking = await createBooking(input);
      return booking;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to create booking";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
}