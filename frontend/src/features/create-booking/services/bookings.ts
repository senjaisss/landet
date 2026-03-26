const API_URL = import.meta.env.VITE_API_URL;

export type Booking = {
  bookingId: string;
  userId: string;
  familyId: string;
  startDate: string;
  endDate: string;
  people: number;
};

export type GetBookingsResponse = {
  success: boolean;
  data: Booking[];
};

export async function getBookings(): Promise<Booking[]> {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/bookings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to fetch bookings: ${error}`);
  }

  const data: GetBookingsResponse = await res.json();
  return data.data;
}
