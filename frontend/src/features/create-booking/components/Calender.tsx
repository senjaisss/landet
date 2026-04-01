import { DayPicker, getDefaultClassNames } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import { sv } from "date-fns/locale";
import "react-day-picker/dist/style.css";

interface MyCalendarProps {
  range?: DateRange;
  onSelect: (range?: DateRange) => void;
}

export function MyCalendar({ range, onSelect }: MyCalendarProps) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <div className="text-white backdrop-blur-xl">
      <DayPicker
        mode="range"
        selected={range}
        onSelect={onSelect}
        locale={sv}
        classNames={{
          day: `${defaultClassNames.day} text-white`,
          today: `border-custom-green`,
          selected: `bg-custom-green text-white`,
          range_start: `bg-custom-green text-white`,
          range_end: `bg-custom-green text-white`,
          range_middle: `bg-custom-green/30 text-white`,
          root: `${defaultClassNames.root} shadow-lg p-6 rounded-lg w-full max-w-lg p-6 rounded-lg w-full max-w-lg`,
          chevron: `fill-white`,
          caption_label: "text-white font-bold",
        }}
      />
    </div>
  );
}
