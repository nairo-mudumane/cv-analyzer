import { CircularProgress } from "@mui/material";
import { useSelectedFile } from "../../hooks";
import { ILoadingScreenProps } from "./@types";
import clsx from "clsx";

export function LoadingScreen({ fixed = false }: ILoadingScreenProps) {
  const { loading } = useSelectedFile();

  return (
    <div
      className={clsx(
        fixed && "fixed z-50 top-0 left-0",
        "bg-white w-screen h-screen gap-4 flex flex-col items-center justify-center"
      )}
    >
      <CircularProgress />

      {typeof loading === "string" && (
        <span className="text-secondary font-semibold">{loading}</span>
      )}
    </div>
  );
}
