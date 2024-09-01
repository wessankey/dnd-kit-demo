import {
  closestCenter,
  DndContext,
  DragEndEvent,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";

import "./App.css";
import { useState } from "react";

function App() {
  const { setNodeRef } = useDroppable({ id: "unique-id" });
  const [items, setItems] = useState([1, 2, 3, 4]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items}>
        <div
          ref={setNodeRef}
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
          }}
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
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: index,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div className="card">{index}</div>
    </div>
  );
}

export default App;
