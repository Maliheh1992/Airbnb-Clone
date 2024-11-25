import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useRef, useState } from "react";
import useOutSideClick from "../../hooks/useOutSideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { LuLogOut } from "react-icons/lu";
import {
  createSearchParams,
  Link,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import MapFilter from "./MapFilter";
import { useAuth } from "../context/AuthProvider";

import { Button } from "@/components/ui/button";
import UserNav from "./UserNav";
import { DatePicker } from "./DatePicker";
import { GuestOptions } from "./guestOptions";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();

  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  return (
    <div className="w-full sticky bg-white z-10 shadow-sm top-0">
      <div className="py-4 border-b container-1 ">
        <div
          className=" flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0"
        >
          <NavLink to="/">
            <img
              src="../../../public/image/logo-2.png"
              alt="Desktop Logo"
              className="w-28 hidden lg:block"
            />
            <img
              src="../../../public/image/logo-mobile.png"
              alt="Mobile Logo"
              className="w-8 lg:hidden block "
            />
          </NavLink>

          {/* Search Item */}
          <div
            className="  border 
        w-full 
        md:w-auto 
        py-2 
        px-2
        rounded-full 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer "
          >
            <div className=" flex flex-row items-center justify-center">
              <div className=" flex flex-col  justify-center text-sm font-semibold  px-5">
                <p>Where</p>
                <input
                  className="py-1"
                  type="text"
                  placeholder="where to go ?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  name="destination"
                  id="destination"
                />
              </div>

              <div
                className="
            hidden sm:block text-sm border-x-[1px] 
            flex-1  font-semibold px-6"
              >
                <p>When</p>
                <DatePicker date={date} setDate={setDate} />
              </div>

              <div
                className="
           text-sm 
           px-6
           
            flex 
            flex-row 
            items-center 
            gap-3 text-nowrap
            font-semibold
            "
              >
                <div className="hidden sm:block">
                  <p>Add Guest</p>
                  <GuestOptions options={options} setOptions={setOptions} />
                </div>
              </div>
              <Button
                onClick={handleSearch}
                className="rounded-full  p-2 text-white shadow-md"
              >
                <HiSearch size={24} />
              </Button>
            </div>
          </div>

          <UserNav />
        </div>
      </div>
      {/* <MapFilter /> */}
    </div>
  );
}

export default Header;

