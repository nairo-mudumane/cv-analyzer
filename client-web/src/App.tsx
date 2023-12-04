import { DraggableArea } from "./components";

export function App() {
  return (
    <main className="w-screen h-screen flex gap-4 justify-between items-center">
      <DraggableArea />
      <aside className="bg-red-400 hidden">aside</aside>
    </main>
  );
}
