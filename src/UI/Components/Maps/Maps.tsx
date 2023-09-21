import { LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useSearchParams } from "react-router-dom";
import { downCaster } from "../../../Service/Functions";
import { useHotels } from "../../Context/HotelsProvider.ctx";

interface IProps {}

const Maps = ({}: IProps) => {
  const { hotels } = useHotels();
  const [mapCenter, setMapCenter] = useState<LatLngTuple>([48.56, 2.35]);
  const [searchParams] = useSearchParams();
  const paramsLat = searchParams.get("lat");
  const paramsLng = searchParams.get("lng");
  useEffect(() => {
    if (paramsLat && paramsLng)
      setMapCenter(downCaster<LatLngTuple>([paramsLat, paramsLng]));
  }, [paramsLat, paramsLng]);
  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom
      >
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
