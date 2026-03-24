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

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Create booking failed: ${error}`);
  }

  const data: CreateBookingResponse = await res.json();
  return data.data;
}
