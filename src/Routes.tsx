import { Fragment } from "react";
import { Routes as RRD_Routes, Route } from "react-router-dom";
import LocationList from "./UI/Components/LocationList/LocationList";
import Main from "./UI/Layout/Main";
const Routes = () => {
  return (
    <Fragment>
      <RRD_Routes>
        <Route
          path="/"
          element={<LocationList />}
        />
        <Route
          path="/hotels"
          element={<Main />}
        >
          <Route
            index
            element={<div>hotels</div>}
          />
          <Route
            path=":id"
            element={<div>a hotel</div>}
          />
        </Route>
      </RRD_Routes>
    </Fragment>
  );
};

export default Routes;
