import { MouseEvent } from "react";
import { ReactCountryFlag } from "react-country-flag";
import { HiOutlineTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useBookmarks } from "../../Context/BookmarksList.ctx";
import Loader from "../Shared/Loader";
const Bookmarks = () => {
  const { isLoading, bookmarkList, currentBookmark, deleteBookmark } =
    useBookmarks();
  const bookmarkDeleteButton = (
    e: MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();
    deleteBookmark(id);
  };
  if (isLoading) return <Loader />;
  return (
    <div>
      <div className="bookmarkList">
        <h2>Bookmarked Cities</h2>
        {bookmarkList.map((item) => (
          <Link
            to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            key={item.id}
          >
            <div
              className={`bookmarkItem ${
                currentBookmark?.id === item.id && "current-bookmark"
              }`}
            >
              <div>
                <ReactCountryFlag
                  svg
                  countryCode={item.countryCode}
                />
                &nbsp;
                <strong>{item.cityName}</strong>
                &nbsp;
                <span>{item.country}</span>
              </div>
              <button
                onClick={(e) => bookmarkDeleteButton(e, item.id ?? 0)}
                disabled={isLoading}
              >
                <HiOutlineTrash className="trash" />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;
