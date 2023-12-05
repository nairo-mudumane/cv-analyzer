import "./main.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { SelectedFileProvider } from "./contexts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SelectedFileProvider>
      <App />
    </SelectedFileProvider>
  </React.StrictMode>
);
