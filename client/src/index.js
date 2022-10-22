import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import VoiceCareApp from "./Routes";
import vcStore from "./store/configureStore";
import "./common.scss";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={vcStore}>
    <BrowserRouter basename="/">
      <VoiceCareApp />
    </BrowserRouter>
  </Provider>
);
