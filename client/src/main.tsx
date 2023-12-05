import "./main.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { SelectedFileProvider } from "./contexts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SelectedFileProvider>
        <App />
      </SelectedFileProvider>
    </BrowserRouter>
  </React.StrictMode>
);
