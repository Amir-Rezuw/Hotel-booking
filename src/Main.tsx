import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import HotelsProviderContext from "./UI/Context/HotelsProvider.ctx";
import "./index.css";

createRoot(document.querySelector("#root")!).render(
  <BrowserRouter>
    <HotelsProviderContext>
      <StrictMode>
        <App />
      </StrictMode>
    </HotelsProviderContext>
  </BrowserRouter>
);
