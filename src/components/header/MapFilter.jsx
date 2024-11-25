import React from "react";
import { categoryItem } from "../../../server/categoryItem";
import { Link } from "react-router-dom";
import CategoryBox from "./CategoryBox";

function MapFilter() {
  return (
    <div className="container-1 ">
      <div
        className="     pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto"
      >
        {categoryItem.map((item) => (
          <CategoryBox key={item.id} label={item.label} icon={item.icon} />
        ))}
      </div>
    </div>
  );
}

export default MapFilter;
