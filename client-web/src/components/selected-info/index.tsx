import { CircularProgress } from "@mui/material";
import { useSelectedFile } from "../../hooks";

export function SelectedInfo() {
  const { selected, loading, error, finalData } = useSelectedFile();

  if (!selected) return null;

  return (
    <div className="flex-1 h-[inherit] border p-4 flex items-center justify-center">
      {loading ? (
        <div className="text-[#7961f2] flex gap-4">
          <CircularProgress color="inherit" />
          <span className="text-black">{loading}</span>
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <ul>
            <li>name: {finalData?.metadata.name}</li>
            <li>age: {finalData?.metadata.age ?? "not informed"}</li>
            <li>
              description: {finalData?.metadata.description ?? "not informed"}
            </li>
            <li>gender: {finalData?.metadata.gender ?? "not informed"}</li>
            <li>headline: {finalData?.metadata.headline ?? "not informed"}</li>
            <li>
              experience: {finalData?.metadata.experience ?? "not informed"}
            </li>
            <li>
              education: {finalData?.metadata.education ?? "not informed"}
            </li>
            <li>
              other relevant: {finalData?.metadata.other ?? "not informed"}
            </li>
            <li>skills: {finalData?.metadata.skills.toString()}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
