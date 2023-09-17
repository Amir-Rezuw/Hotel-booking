import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <div className="mapContainer"></div>
    </div>
  );
};

export default Main;
