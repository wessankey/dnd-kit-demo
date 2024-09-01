import {
  closestCenter,
  DndContext,
  DragEndEvent,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { SortableContext, useSortable } from "@dnd-kit/sortable";

import "./App.css";

function App() {
  const { setNodeRef } = useDroppable({ id: "unique-id" });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;
  };

  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items}>
        <div
          ref={setNodeRef}
          style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
        >
          {items.map((index) => {
            return <Card key={index} index={index} />;
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function Card({ index }: { index: number }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: index,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div className="card">{index}</div>
    </div>
  );
}

export default App;
