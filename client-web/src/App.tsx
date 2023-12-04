import { DraggableArea, SelectedInfo } from "./components";

export function App() {
  return (
    <main className="h-screen flex gap-6 justify-between items-center container mx-auto">
      <DraggableArea />
      <SelectedInfo />
    </main>
  );
}
