import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useHotels } from "../../Context/HotelsProvider.ctx";
import Loader from "../Shared/Loader";

interface IProps {}

const Hotels = ({}: IProps) => {
  const { hotels, isLoading, currentHotel } = useHotels();
  if (isLoading) return <Loader />;
  return (
    <div className="searchList">
      <h2>Search Results ({hotels.length})</h2>
      {hotels.map((item) => (
        <Fragment key={item.id}>
          <Link
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div
              className={`searchItem ${
                item.id === currentHotel?.id && "current-hotel"
              }`}
            >
              <img
                src={`${item.picture_url.url}`}
                alt={item.name}
              />
              <div className="searchItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  &euro; {item.price} &nbsp; <span>per night</span>
                </p>
              </div>
            </div>
          </Link>
        </Fragment>
      ))}
    </div>
  );
};

export default Hotels;
