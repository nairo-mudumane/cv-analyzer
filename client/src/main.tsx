import "./main.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { App } from "./App";
import { SelectedFileProvider } from "./contexts";
import { MuiTheme } from "./global";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={MuiTheme}>
        <SelectedFileProvider>
          <App />
        </SelectedFileProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
