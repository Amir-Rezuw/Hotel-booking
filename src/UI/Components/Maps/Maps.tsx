import { LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useSearchParams } from "react-router-dom";
import { downCaster } from "../../../Service/Functions";
import { useHotels } from "../../Context/HotelsProvider.ctx";
import useGetLocation from "../../hooks/useGetLocation";

interface IProps {}

const Maps = ({}: IProps) => {
  const { hotels } = useHotels();
  const [mapCenter, setMapCenter] = useState<LatLngTuple>([48.56, 2.35]);
  const [searchParams] = useSearchParams();
  const { isLoading, position, getLocation } = useGetLocation();
  const paramsLat = searchParams.get("lat");
  const paramsLng = searchParams.get("lng");
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
          {isLoading ? "Loading ..." : "Use you location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
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
