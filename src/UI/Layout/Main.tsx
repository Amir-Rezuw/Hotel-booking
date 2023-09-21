import { Outlet } from "react-router-dom";
import Maps from "../Components/Maps/Maps";

const Main = () => {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      {/* <div className="mapContainer"> */}
      <Maps />
      {/* </div> */}
    </div>
  );
};

export default Main;
