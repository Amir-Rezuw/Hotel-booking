import { LatLngTuple, LeafletMouseEvent } from "leaflet";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { downCaster } from "../../../Service/Functions";
import { IBookmarkedHotels } from "../../../Types/IBookmarkedHotels";
import { IHotelsData } from "../../../Types/IHotelsData";
import useGetLocation from "../../hooks/useGetLocation";
import useUrlLocation from "../../hooks/useUrlLocation";

interface IProps {
  markedLocations: IHotelsData[] | IBookmarkedHotels[];
}

const Maps = ({ markedLocations: hotels }: IProps) => {
  const [mapCenter, setMapCenter] = useState<LatLngTuple>([48.56, 2.35]);
  const [paramsLat, paramsLng] = useUrlLocation();

  const { isLoading, position, getLocation } = useGetLocation();
  useEffect(() => {
    if (paramsLat && paramsLng)
      setMapCenter(downCaster<LatLngTuple>([paramsLat, paramsLng]));
  }, [paramsLat, paramsLng]);
  useEffect(() => {
    if (position?.latitude && position?.longitude) {
      const { latitude, longitude } = position;
      setMapCenter(downCaster([latitude, longitude]));
    }
  }, [position]);
  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom
      >
        <button
          className="getLocation"
          onClick={getLocation}
          disabled={isLoading}
        >
          {isLoading ? "Loading ..." : "Use your location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <DetectClick />
        <ChangeCenter position={mapCenter} />
        {hotels.map((item) => (
          <Marker
            position={downCaster<LatLngTuple>([item.latitude, item.longitude])}
            key={item.id}
          >
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Maps;
function ChangeCenter({ position }: { position: LatLngTuple }) {
  const map = useMap();
  map.setView(position);
  return null;
}

const DetectClick = () => {
  const navigate = useNavigate();
  useMapEvent("click", (event: LeafletMouseEvent) => {
    navigate(`/bookmarks/add?lat=${event.latlng.lat}&lng=${event.latlng.lng}`);
  });
  return null;
};
