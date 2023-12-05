import React from "react";
import { SelectedFileContext } from "../contexts";

export function useSelectedFile() {
  const context = React.useContext(SelectedFileContext);
  return context;
}
