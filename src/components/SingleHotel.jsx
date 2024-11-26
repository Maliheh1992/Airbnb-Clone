import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
import { useHotels } from "../context/HotelsProvider";
import { useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MapPin } from "lucide-react";
function SingleHotel() {
  const { id } = useParams();
  const { getHotel, isLoadingCurrentHotel, currentHotel } = useHotels();
  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoadingCurrentHotel || !currentHotel ) return <Loader />;
  return (
   
    <div className="flex flex-col gap-2 w-full">
      <div className=" 
            w-full 
            relative 
           ">
        <img src={currentHotel.xl_picture_url} alt={currentHotel.name} className=" object-cover 
              h-[400px] w-full group-hover:scale-110 transition rounded-xl" />
              <div className="absolute top-3 right-3">
             <div
            className=" relative hover:opacity-80 transition cursor-pointer"
        >
            <AiOutlineHeart
                size={28}
                className=" fill-white absolute -top-[2px] -right-[2px]"
            />
        </div>
          </div>
      </div>
      <div className="my-6 flex gap-2 flex-col">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-bold text-3xl">£ {currentHotel.price}</h2>
            <h2 className="text-gray-500 text-lg flex gap-2"><MapPin/>{currentHotel.street}</h2>
          </div>
        </div>
        <hr />
        <div className="mt-4 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">Amenities :</h2>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            <h2 className="flex gap-2 items-center justify-center bg-primary rounded-lg p-2  hover:bg-primary/90 text-white ">{currentHotel.amenities[0]}</h2>
            <h2 className="flex gap-2 items-center justify-center bg-primary rounded-lg p-2  hover:bg-primary/90 text-white ">{currentHotel.amenities[1]}</h2>
            <h2 className="flex gap-2 items-center justify-center bg-primary rounded-lg p-2  hover:bg-primary/90 text-white ">{currentHotel.amenities[2]}</h2>
            <h2 className="flex gap-2 items-center justify-center bg-primary rounded-lg p-2  hover:bg-primary/90 text-white ">{currentHotel.amenities[3]}</h2>
            <h2 className="flex gap-2 items-center justify-center bg-primary rounded-lg p-2  hover:bg-primary/90 text-white ">{currentHotel.amenities[4]}</h2>
            <h2 className="flex gap-2 items-center justify-center bg-primary rounded-lg p-2  hover:bg-primary/90 text-white ">{currentHotel.amenities[5]}</h2>
          </div>
        </div>
        <hr />
        <div className="mt-2">

        <h2 className="font-bold text-2xl mb-2">{currentHotel.state}</h2>
        <p className="text-gray-600">{currentHotel.description}</p>
        </div>
        <div>
          {currentHotel.number_of_reviews} reviews &bull;{" "}
          {currentHotel.smart_location}
        </div>
      </div>
    </div>
  );
}

export default SingleHotel;
