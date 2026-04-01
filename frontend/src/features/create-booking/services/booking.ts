const API_URL = import.meta.env.VITE_API_URL;

export type CreateBookingInput = {
  startDate: string;
  endDate: string;
  people: number;
};

export type Booking = {
  bookingId: string;
  userId: string;
  familyId: string;
  startDate: string;
  endDate: string;
  people: number;
};

type CreateBookingResponse = {
  success: boolean;
  data: Booking;
};

export async function createBooking(
  input: CreateBookingInput,
): Promise<Booking> {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  const raw = await res.text();

  if (!res.ok) {
    let message = "Okänt fel";

    try {
      const data = JSON.parse(raw);
      message = data.message || message;
    } catch {
      if (raw) message = raw;
    }

    throw new Error(message);
  }

  const data: CreateBookingResponse = JSON.parse(raw);
  return data.data;
}
