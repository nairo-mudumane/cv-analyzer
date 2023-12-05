import { Route, Routes } from "react-router-dom";
import { DraggableArea, SelectedInfo } from "./components";
import { NotFound } from "./pages";

export function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  return (
    <main className="h-screen flex gap-6 justify-between items-center container mx-auto">
      <DraggableArea />
      <SelectedInfo />
    </main>
  );
}
