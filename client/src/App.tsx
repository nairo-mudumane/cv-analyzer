import { Route, Routes } from "react-router-dom";
import { Extract, NotFound, Translate, Upload } from "./pages";
import { useSelectedFile } from "./hooks";
import { LoadingScreen } from "./components";

export function App() {
  const { loading } = useSelectedFile();

  if (loading) return <LoadingScreen />;

  return (
    <Routes>
      <Route path="/" element={<Upload />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/translate" element={<Translate />} />
      <Route path="/extract" element={<Extract />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
