import { useBookmark } from "../context/BookmarkListContext";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import { FaTrashCan } from "react-icons/fa6";
function BookMark() {
  const { isLoading, bookmarks, currentBookmark, deleteBookmark } =
    useBookmark();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  if (isLoading) return <Loader />;
  if (!bookmarks.length) return <p>there is no bookmarks`</p>;

  return (
    <div className="">
      <h2 className="font-bold text-2xl my-4">Bookmark List</h2>
      <div className="mt-4 ">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`mb-4 border rounded-xl p-4 border-gray-200 flex  items-center  justify-between shadow-md ${
                  item.id === currentBookmark?.id ? "current-bookmark" : ""
                }`}
              >
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp; <strong>{item.cityName}</strong> &nbsp;
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <FaTrashCan className="w-4 h-4 text-rose-500" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BookMark;
