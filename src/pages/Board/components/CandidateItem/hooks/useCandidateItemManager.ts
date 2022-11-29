import { useCallback, useRef } from "react";
import { throttle } from "shared/lib/throttle";
import { UseDragDropPropsReturn } from "shared/lib/interfaces";
import { UseCandidateItemManagerProps } from "./interfaces";

export const useCandidateItemManager = ({
  onDrop,
  onItemMove,
}: UseCandidateItemManagerProps) => {
  const isDragging = useRef(false);
  const startedDragItemPosition = useRef({ x: 0, y: 0, width: 0 });

  const onItemMoveThrottled = useCallback(throttle(onItemMove, 100), []);

  const handleOnItemMove = useCallback(
    ({
      mouseY,
      translateY,
      translateX,
      hoveredElement,
      dragItem,
    }: UseDragDropPropsReturn) => {
      if (dragItem) {
        if (!startedDragItemPosition.current.x) {
          const { x, y, width } = dragItem.getBoundingClientRect();
          startedDragItemPosition.current = { x, y, width };
        }

        document.body.classList.add("dragging");
        dragItem?.classList.add("moved");
        dragItem.style.transform = `translate(${translateX}px, ${translateY}px) rotate(-4deg)`;
        dragItem.style.position = "fixed";
        dragItem.style.top = `${startedDragItemPosition.current.y}px`;
        dragItem.style.left = `${startedDragItemPosition.current.x}px`;
        dragItem.style.zIndex = "999999";
        dragItem.style.width = `${startedDragItemPosition.current.width}px`;
      }

      isDragging.current = true;
      onItemMoveThrottled({ mouseY, hoveredElement, dragItem });
    },
    []
  );

  const handleOnDrop = (dropZone: Element | null, dragItem: HTMLElement) => {
    onDrop(dropZone);
    if (dragItem) {
      document.body.classList.remove("dragging");
      dragItem?.classList.remove("moved");
      dragItem.style.transform = "";
      dragItem.style.position = "";
      dragItem.style.top = "";
      dragItem.style.left = "";
      dragItem.style.zIndex = "";
      dragItem.style.width = "";
    }
    startedDragItemPosition.current = { x: 0, y: 0, width: 0 };
    setTimeout(() => {
      isDragging.current = false;
    }, 100);
  };
  return {
    handleOnItemMove,
    handleOnDrop,
    isDragging,
  };
};
