import { useNavigate, useParams } from "react-router-dom";

import Loader from "../Loader/Loader";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useBookmark } from "../context/BookmarkListContext";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getBookmark, isLoading, currentBookmark } = useBookmark();
  useEffect(() => {
    getBookmark(id);
  }, [id]);

  if (isLoading || !currentBookmark) return <Loader />;
  return (
    <div>
      <Button onClick={() => navigate(-1)} >
        &larr; Back
      </Button>
      <h2 className="font-bold text-2xl my-4">{currentBookmark.cityName}</h2>
      <div className="` border rounded-xl p-4 border-gray-200 flex  items-center  justify-between shadow-md">
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp;
        <span>{currentBookmark.country}</span>
      </div>
    </div>
  );
}

export default SingleBookmark;
