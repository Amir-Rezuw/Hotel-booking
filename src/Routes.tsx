import { Fragment } from "react";
import { Routes as RRD_Routes, Route } from "react-router-dom";
import Bookmarks from "./UI/Components/Bookmarks";
import HotelProfile from "./UI/Components/Hotels/HotelProfile";
import Hotels from "./UI/Components/Hotels/Hotels";
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
            element={<Hotels />}
          />
          <Route
            path=":id"
            element={<HotelProfile />}
          />
        </Route>
        <Route
          path="/bookmarks"
          element={<Bookmarks />}
        ></Route>
      </RRD_Routes>
    </Fragment>
  );
};

export default Routes;
