import { Api } from "../../../env/Api";
import { env } from "../../../env/env";
import useHttpRequest from "../../hooks/useHttpRequest";

interface IProps {}

const LocationList = ({}: IProps) => {
  const { data, isLoading } = useHttpRequest(`${env.baseUtl}${Api.hotels}`);
  if (isLoading) return <p>Loading</p>;

  return (
    <div className="nearbyLocations">
      <h2>Nearby Locations</h2>
      <div className="locationList">
        {data.map((item) => (
          <div
            className="locationItem"
            key={item.id}
          >
            <img
              src={item.picture_url.url}
              alt={item.name}
            />
            <div className="locationItemDesc">
              <p className="location">{item.smart_location}</p>
              <p className="name">{item.name}</p>
              <p className="price">
                &euro;&nbsp;{item.price}&nbsp;
                <span>Nights</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationList;
