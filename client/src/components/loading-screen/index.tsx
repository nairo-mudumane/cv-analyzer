import { CircularProgress } from "@mui/material";
import { useSelectedFile } from "../../hooks";

export function LoadingScreen() {
  const { loading } = useSelectedFile();

  return (
    <div className="w-screen h-screen gap-4 flex flex-col items-center justify-center">
      <CircularProgress />

      {typeof loading === "string" && (
        <span className="text-secondary font-semibold">{loading}</span>
      )}
    </div>
  );
}
