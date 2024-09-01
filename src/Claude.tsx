import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: "1px solid black",
    padding: "10px",
    margin: "5px",
    backgroundColor: "white",
    zIndex: transform ? 1 : "auto", // Increase z-index when dragging
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {id}
    </div>
  );
};

const DraggableCards = () => {
  const [items, setItems] = React.useState(["1", "2", "3", "4", "5"]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <SortableContext items={items} strategy={horizontalListSortingStrategy}>
          {items.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default DraggableCards;
