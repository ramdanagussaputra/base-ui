import { format } from "date-fns";

export function DateBlock({ date }: { date: Date }) {
  return (
    <div className="flex items-center gap-1">
      <p className="text-secondary-300 text-small-text-400">
        {format(date, "MMM dd, yyyy")}
      </p>
      <span className="bg-secondary-300 h-[2px] w-[2px] rounded-full"></span>
      <p className="text-secondary-300 text-small-text-400">
        {format(date, "hh:mm a")}
      </p>
    </div>
  );
}
