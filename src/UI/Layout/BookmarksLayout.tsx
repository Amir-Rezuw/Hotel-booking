import { Outlet } from "react-router-dom";
import Maps from "../Components/Maps/Maps";
import { useBookmarks } from "../Context/BookmarksList.ctx";

const BookmarksLayout = () => {
  const { bookmarkList } = useBookmarks();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Maps markedLocations={bookmarkList} />
    </div>
  );
};

export default BookmarksLayout;
