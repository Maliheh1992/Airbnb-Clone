import React from "react";

function CategoryBox({ icon: Icon, label }) {
  return (
    <div
      className=" flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
       hover:border-b-2
        hover:text-rose-600
        transition
        cursor-pointer"
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
}

export default CategoryBox;
