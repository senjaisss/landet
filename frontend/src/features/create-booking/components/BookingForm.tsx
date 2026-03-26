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
      className="flex flex-col w-full max-w-3xl p-12 rounded-2xl bg-green-500/10 backdrop-blur-md space-y-4"
    >
      <h2 className="text-white text-xl mb-2">Skapa bokning</h2>

      <label className="text-white">
        Startdatum
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          className="w-full p-3 mt-1 rounded bg-white/20 text-white focus:outline-none cursor-pointer"
        />
      </label>

      <label className="text-white">
        Slutdatum
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          className="w-full p-3 mt-1 rounded bg-white/20 text-white focus:outline-none cursor-pointer"
        />
      </label>

      <label className="text-white">
        Antal personer
        <input
          type="number"
          value={people}
          onChange={(e) => setPeople(Number(e.target.value))}
          min={1}
          required
          className="w-full p-3 mt-1 rounded bg-white/20 text-white focus:outline-none cursor-pointer"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 p-3 rounded bg-custom-green text-white hover:bg-gray-500 transition-colors"
      >
        {loading ? "Skapar..." : "Skapa bokning"}
      </button>

      {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
      {success && <p className="text-green-200 text-sm mt-2">{success}</p>}
    </form>
  );
}
