import { useState } from "react";
import { useBooking } from "../hooks/useBooking";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function BookingForm() {
  const { create, loading, error } = useBooking();
  const [people, setPeople] = useState(1);
  const [range, setRange] = useState<DateRange | undefined>();
  const [success, setSuccess] = useState<string | null>(null);

  const formatDate = (date?: Date) =>
    date ? date.toISOString().split("T")[0] : "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(null);

    if (!range?.from || !range?.to) return;

    const booking = await create({
      startDate: formatDate(range.from),
      endDate: formatDate(range.to),
      people,
    });

    setSuccess(`Booking created: ${booking.bookingId}`);
    setRange(undefined);
    setPeople(1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-3xl p-12 rounded-2xl bg-green-500/10 backdrop-blur-md space-y-4"
    >
      <h2 className="text-white text-xl mb-2">Skapa bokning</h2>

      <div className="text-white">
        <div className="bg-white/20 p-4 rounded">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
          />
        </div>
      </div>

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
