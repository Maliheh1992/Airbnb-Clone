import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRef, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import useOutSideClick from "../../hooks/useOutSideClick";

export function GuestOptions({options,setOptions}) {
  const [openOption, setOpenOption] = useState(false);
 

  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div id="optionDropDown" className=" text-gray-400 text-sm " onClick={() => setOpenOption(!openOption)}>
        who
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-90">
        {openOption && (
          <GuestOptionList
            setOpenOption={setOpenOption}
            handleOptions={handleOptions}
            options={options}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}

function GuestOptionList({ options, handleOptions, setOpenOption }) {
  const optionsRef = useRef();
  useOutSideClick(optionsRef, "optionDropDown", () => setOpenOption(false));
  return (
    <div className="grid gap-4" ref={optionsRef}>
      <div className="grid gap-2">
        <OptionItem
          type="adult"
          handleOptions={handleOptions}
          options={options}
          minLimit={1}
        />
        <OptionItem
          type="children"
          handleOptions={handleOptions}
          options={options}
          minLimit={0}
        />
        <OptionItem
          type="room"
          handleOptions={handleOptions}
          options={options}
          minLimit={1}
        />
      </div>
    </div>
  );
}

function OptionItem({ options, minLimit, type, handleOptions }) {
  return (
    <div className="grid grid-cols-2 items-center">
      <span className="col-span-1 h-8">{type}</span>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => handleOptions(type, "dec")}
          className="p-2 rounded-lg"
          disabled={options[type] <= minLimit}
        >
          <HiMinus className="icon" />
        </Button>
        <span className="optionCounterNumber">{options[type]}</span>
        <Button
          variant="outline"
          className="p-2 rounded-lg"
          onClick={() => handleOptions(type, "inc")}
        >
          <HiPlus className="icon" />
        </Button>
      </div>
    </div>
  );
}
