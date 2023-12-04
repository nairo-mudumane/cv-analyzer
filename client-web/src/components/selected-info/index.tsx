import { CircularProgress } from "@mui/material";
import { useSelectedFile } from "../../hooks";

export function SelectedInfo() {
  const { selected, loading, error, finalData } = useSelectedFile();

  if (!selected) return null;

  return (
    <div className="flex-1 h-[inherit] border p-4 flex items-center justify-center">
      {loading ? (
        <div>
          <CircularProgress />
          <span>{loading}</span>
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>{String(finalData)}</div>
      )}
    </div>
  );
}
