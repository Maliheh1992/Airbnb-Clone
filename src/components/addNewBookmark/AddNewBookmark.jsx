import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Loader from "../loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../context/BookmarkListContext";
import { Button } from "@/components/ui/button";
const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookmark() {
  const [lat, lng] = useUrlLocation();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [county, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoLocation, setIsLoadingGeoLocation] = useState(false);
  const [errorGeoLocation, setErrorGeoLocation] = useState(null);
  const { createBookmark } = useBookmark();
  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchLocationData() {
      setIsLoadingGeoLocation(true);
      setErrorGeoLocation(null);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode)
          throw new Error(
            "This location is not a city ! please click somewhere!!"
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || data.locality || "");
        setCountryCode(data.countryCode);
      } catch (error) {
        setErrorGeoLocation(error.message);
      } finally {
        setIsLoadingGeoLocation(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !county) return;
    const newBookmark = {
      cityName,
      county,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + "" + county,
    };
    await createBookmark(newBookmark);
    navigate("/bookmark");
  };

  if (isLoadingGeoLocation) return <Loader />;

  if (errorGeoLocation) return <p>{errorGeoLocation}</p>;

  return (
    <div className="">
      <h2 className="font-bold text-2xl my-4 text-center">AddNewBookmark</h2>
      <form
        action=""
        className="relative max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label
            htmlFor="cityName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            City Name
          </label>
          <input
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            name="City Name"
            id="City Name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="countyName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            {" "}
            Country Name{" "}
          </label>
          <input
            value={county}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            name="countyName"
            id="countyName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <ReactCountryFlag
            className="absolute right-4 top-[60%]"
            svg
            countryCode={countryCode}
          />
        </div>
        <div className="flex items-center justify-between">
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr;
          </Button>
          <Button>Add</Button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
