import { useState } from "react";
import { useBooking } from "../hooks/useBooking";
import type { DateRange } from "react-day-picker";

import { MyCalendar } from "./Calender";
import { ConfirmationDialog } from "../../../components/ConfirmationDialog";

export function BookingForm() {
  const { create, loading } = useBooking();
  const [people, setPeople] = useState(1);
  const [range, setRange] = useState<DateRange | undefined>();
  const [dialog, setDialog] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const formatDate = (date?: Date) =>
    date ? date.toISOString().split("T")[0] : "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!range?.from || !range?.to) return;

    try {
      const booking = await create({
        startDate: formatDate(range.from),
        endDate: formatDate(range.to),
        people,
      });

      setDialog({
        type: "success",
        message: `Bokning skapad! ID: ${booking.bookingId}`,
      });

      setRange(undefined);
      setPeople(1);
    } catch (err: unknown) {
      let errorMessage = "Okänt fel";

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }

      setDialog({
        type: "error",
        message: "Bokning misslyckades. " + errorMessage,
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-3xl p-12 rounded-2xl bg-green-500/10 backdrop-blur-md space-y-4"
    >
      <div className="flex justify-center">
        <MyCalendar range={range} onSelect={setRange} />
      </div>

      <label className="text-white">
        Antal personer
        <input
          type="number"
          value={people}
          onChange={(e) => setPeople(Number(e.target.value))}
          min={1}
          max={10}
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

      <ConfirmationDialog
        open={!!dialog}
        type={dialog?.type}
        message={dialog?.message || ""}
        onCancel={() => setDialog(null)}
      />
    </form>
  );
}
