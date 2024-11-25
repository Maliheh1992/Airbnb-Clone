import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotels } from "../context/HotelsProvider";
import { MdOutlineBedroomChild } from "react-icons/md";
import { LuBath } from "react-icons/lu";
function Hotels() {
  const { isLoading, hotels, currentHotel } = useHotels();
  if (isLoading) <Loader />;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-3">
      
      {hotels.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div
              className={`flex flex-col items-center md:items-start ${
                item.id === currentHotel?.id ? "current-hotel" : ""
              }`}
            >
              
              <img  height={150} src={item.xl_picture_url} className="rounded-lg  object-cover w-full h-[200px] mb-3" alt={item.name} />
              <div className="flex flex-col gap-2">
                <p className="text-lg font-semibold text-gray-900">{item.smart_location}</p>
                <p className="text-sm text-gray-900">{item.name}</p>
                <div className="flex ">
               <p className="font-bold text-xl">₤&nbsp;{item.price}</p>
               <span className="ml-2">night</span></div>
               <div className="flex gap-2 mt-2 ">
                <p className="flex w-1/4 items-center justify-center gap-2 text-lg bg-primary hover:bg-primary/90 rounded-md p-2 text-white">
                <MdOutlineBedroomChild className="h-6 w-6"  />
                  {item.bedrooms}
                </p>
                <p className="flex w-1/4 items-center justify-center gap-2 text-lg bg-primary hover:bg-primary/90 rounded-md p-2 text-white">
                <LuBath className="h-6 w-6" />  
                  {item.bathrooms}
                </p>
               </div>
              </div>
              
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Hotels;
