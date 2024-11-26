import { format } from "date-fns";

import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { DateRange } from "react-date-range";

export function DatePicker({ date, setDate }) {
  const [openDate, setOpenDate] = useState(false);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          onClick={() => setOpenDate(!openDate)}
          className={cn(
            "mt-1 font-semibold text-xs text-gray-400",
            !date && "text-muted-foreground"
          )}
        >
          {`${format(date[0].startDate, "MM/dd/yy")} to ${format(
            date[0].endDate,
            "MM/dd/yy"
          )} `}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        {openDate && (
          <DateRange
            onChange={(item) => setDate([item.selection])}
            ranges={date}
            minDate={new Date()}
            moveRangeOnFirstSelection={true}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
