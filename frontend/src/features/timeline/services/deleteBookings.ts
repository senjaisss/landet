const API_URL = import.meta.env.VITE_API_URL;

export async function deleteBooking(bookingId: string): Promise<void> {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/bookings/${bookingId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Delete failed: ${error}`);
  }
}
