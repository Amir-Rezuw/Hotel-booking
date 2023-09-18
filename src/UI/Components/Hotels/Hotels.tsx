import { Fragment } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { IHotelsData } from "../../../Types/IHotelsData";
import { Api } from "../../../env/Api";
import { env } from "../../../env/env";
import useHttpRequest from "../../hooks/useHttpRequest";
import Loader from "../Shared/Loader";

interface IProps {}

const Hotels = ({}: IProps) => {
  const [searchParams, _setSearchParams] = useSearchParams();

  const roomOptions = JSON.parse(searchParams.get("options") ?? "");
  const destination = searchParams.get("destination");
  const { data, isLoading } = useHttpRequest<IHotelsData>(
    `${env.baseUtl}${Api.hotels}`,
    `q=${destination || ""}&accommodates_gte=${roomOptions?.room || 1}`
  );
  if (isLoading) return <Loader />;
  return (
    <div className="searchList">
      <h2>Search Results ({data.length})</h2>
      {data.map((item) => (
        <Fragment key={item.id}>
          <Link
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div className="searchItem">
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
