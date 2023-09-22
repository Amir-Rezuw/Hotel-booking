import { Outlet } from "react-router-dom";
import Maps from "../Components/Maps/Maps";
import { useHotels } from "../Context/HotelsProvider.ctx";

const Main = () => {
  const { hotels } = useHotels();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Maps markedLocations={hotels} />
    </div>
  );
};

export default Main;
