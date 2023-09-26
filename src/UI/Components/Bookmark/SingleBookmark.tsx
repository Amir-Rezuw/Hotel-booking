import { useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { useNavigate, useParams } from "react-router-dom";
import { useBookmarks } from "../../Context/BookmarksList.ctx";
import Loader from "../Shared/Loader";

interface IProps {}

const SingleBookmark = ({}: IProps) => {
  const { id: bookmarkId } = useParams();
  const { getBookmarks, isLoading, currentBookmark } = useBookmarks();
  const navigate = useNavigate();
  useEffect(() => {
    getBookmarks({ id: bookmarkId ?? "" });
  }, [bookmarkId]);
  if (isLoading || !currentBookmark) return <Loader />;
  return (
    <div>
      <button
        className="btn btn--back"
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </button>
      <br />
      <br />
      <h2>{currentBookmark.cityName}</h2>
      <br />
      <div className={`bookmarkItem`}>
        <ReactCountryFlag
          svg
          countryCode={currentBookmark.countryCode}
        />
        &nbsp;
        <strong>{currentBookmark.cityName}</strong>
        &nbsp;
        <span>{currentBookmark.country}</span>
      </div>
    </div>
  );
};

export default SingleBookmark;
