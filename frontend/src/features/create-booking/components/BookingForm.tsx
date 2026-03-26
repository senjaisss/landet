import { useState } from "react";
import { useBooking } from "../hooks/useBooking";

export function BookingForm() {
  const { create, loading, error } = useBooking();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [people, setPeople] = useState(1);

  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(null);

    const booking = await create({
      startDate,
      endDate,
      people,
    });

    setSuccess(`Booking created: ${booking.bookingId}`);

    setStartDate("");
    setEndDate("");
    setPeople(1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-4 border rounded w-64"
    >
      <h2 className="font-bold">Create Booking</h2>

      <label>
        Start date
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          className="border w-full p-1"
        />
      </label>

      <label>
        End date
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          className="border w-full p-1"
        />
      </label>

      <label>
        People
        <input
          type="number"
          value={people}
          onChange={(e) => setPeople(Number(e.target.value))}
          min={1}
          required
          className="border w-full p-1"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white p-1 mt-2"
      >
        {loading ? "Creating..." : "Create"}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}
    </form>
  );
}
