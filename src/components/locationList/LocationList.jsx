import ReactCountryFlag from "react-country-flag";
import useFetch from "../../hooks/useFetch";
import { useBookmark } from "../context/BookmarkListContext";
import { Link, NavLink } from "react-router-dom";

function LocationList() {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");
  const { currentBookmark } = useBookmark();
  if (isLoading) <p> Loading...</p>;
  return (
    <div className="container-1 mt-8">
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {data.map((item) => {
          return (
            <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div className="flex flex-col" key={item.id}>
              <div className="relative h-72 ">
                <img
                  className="rounded-lg h-full object-cover"
                  src={item.xl_picture_url}
                  alt={item.name}
                />
              </div>
             <NavLink to="/" className="mt-2">
             <h3 className="font-medium text-base"> {item.smart_location} </h3>
              <p className="text-muted-foreground text-sm ">{item.name}</p>
              <p className="pt-2 text-muted-foreground">
                <span className="font-medium text-black">
                  ₤&nbsp;{item.price}&nbsp;
                </span>
                night
              </p>
             </NavLink>
            </div>
          </Link>
        );
        })}
      </div>
     
    </div>
  );
}

export default LocationList;
