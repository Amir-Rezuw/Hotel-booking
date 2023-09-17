import { Fragment } from "react";
import { Routes as RRD_Routes, Route } from "react-router-dom";
import LocationList from "./Components/LocationList/LocationList";
const Routes = () => {
  return (
    <Fragment>
      <RRD_Routes>
        <Route
          path="/"
          element={<LocationList />}
        />
        {/* <Route path="/hotels" /> */}
      </RRD_Routes>
    </Fragment>
  );
};

export default Routes;
