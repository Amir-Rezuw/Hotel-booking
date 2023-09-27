import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthCtxProvider from "./UI/Context/Auth.ctx";
import BookmarksListProvider from "./UI/Context/BookmarksList.ctx";
import HotelsProviderContext from "./UI/Context/HotelsProvider.ctx";
import "./index.css";

createRoot(document.querySelector("#root")!).render(
  <BrowserRouter>
    <AuthCtxProvider>
      <BookmarksListProvider>
        <HotelsProviderContext>
          <StrictMode>
            <App />
          </StrictMode>
        </HotelsProviderContext>
      </BookmarksListProvider>
    </AuthCtxProvider>
  </BrowserRouter>
);
