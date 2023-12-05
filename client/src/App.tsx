import { Route, Routes } from "react-router-dom";
import { NotFound, Upload } from "./pages";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Upload />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
