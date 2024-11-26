import React from "react";
import { Outlet } from "react-router-dom";
import Map from "../Map";
import { useHotels } from "../context/HotelsProvider";

function AppLayout() {
  const { hotels } = useHotels();
  return (
    <div className="container-1 grid grid-cols-1  md:grid-cols-2 mt-5">
      <div>
        <Outlet />
      </div>
      <div className="  fixed hidden md:block right-10 h-full md:w-[350px] lg:w-[450px] xl:w-[650px]">
        <Map markerLocations={hotels} />
      </div>
    </div>
  );
}

export default AppLayout;
