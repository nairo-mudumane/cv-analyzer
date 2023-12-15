import { DraggableArea } from "../../components";
import TranslateTarget from "./translate-target";

export function Upload() {
  return (
    <main className="h-screen flex gap-6 justify-between items-center container mx-auto">
      <div className="flex-1 flex flex-col gap-6 justify-center">
        <TranslateTarget />
        <DraggableArea />
      </div>
    </main>
  );
}
