import { ReactCountryFlag } from "react-country-flag";
import { Link } from "react-router-dom";
import { useBookmarks } from "../Context/BookmarksList.ctx";
import Loader from "./Shared/Loader";
interface IProps {}

const Bookmarks = ({}: IProps) => {
  const { isLoading, bookmarkList, currentBookmark } = useBookmarks();
  if (isLoading) return <Loader />;
  return (
    <div>
      <div className="bookmarkList">
        <h2>Bookmark List</h2>
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
              <ReactCountryFlag
                svg
                countryCode={item.countryCode}
              />
              &nbsp;
              <strong>{item.cityName}</strong>
              &nbsp;
              <span>{item.country}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;
