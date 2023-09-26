import { Fragment } from "react";
import { Routes as RRD_Routes, Route } from "react-router-dom";

import AddBookmark from "./UI/Components/Bookmark/Add";
import Bookmarks from "./UI/Components/Bookmark/Bookmarks";
import SingleBookmark from "./UI/Components/Bookmark/SingleBookmark";
import HotelProfile from "./UI/Components/Hotels/HotelProfile";
import Hotels from "./UI/Components/Hotels/Hotels";
import LocationList from "./UI/Components/LocationList/LocationList";
import BookmarksLayout from "./UI/Layout/BookmarksLayout";
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
          element={<BookmarksLayout />}
        >
          <Route
            index
            element={<Bookmarks />}
          />
          <Route
            path="add"
            element={<AddBookmark />}
          />
          <Route
            path=":id"
            element={<SingleBookmark />}
          />
        </Route>
      </RRD_Routes>
    </Fragment>
  );
};

export default Routes;
