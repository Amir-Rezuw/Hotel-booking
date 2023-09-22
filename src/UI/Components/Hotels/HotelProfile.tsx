import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHotels } from "../../Context/HotelsProvider.ctx";
import Loader from "../Shared/Loader";

const HotelProfile = () => {
  const { id: hotelId } = useParams();
  const { getHotel, isCurrentHotelLoading, currentHotel } = useHotels();
  useEffect(() => {
    if (hotelId) getHotel(hotelId);
  }, [hotelId]);
  if (isCurrentHotelLoading || !currentHotel) return <Loader />;
  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel?.name}</h2>
        <div>
          {currentHotel?.number_of_reviews} reviews &bull;{" "}
          {currentHotel?.smart_location}
        </div>
        <img
          src={currentHotel?.xl_picture_url}
          alt={currentHotel?.name}
        />
      </div>
    </div>
  );
};

export default HotelProfile;
