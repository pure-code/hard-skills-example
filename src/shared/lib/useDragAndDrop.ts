import React, { useCallback, useEffect, useRef } from "react";
import { DOMRectProps, UseDragDropProps } from "./interfaces";

const initialDomRect: DOMRectProps = {
  top: 0,
  left: 0,
};

const useDragAndDrop = ({ onDrop, handleOnItemMove }: UseDragDropProps) => {
  const isDragged = useRef(false);
  const dragItemRef = useRef<HTMLElement | null>(null);
  const coors = useRef<DOMRectProps>(initialDomRect);
  const shiftX = useRef(0);
  const shiftY = useRef(0);

  const onDrag = useCallback((ev: MouseEvent | TouchEvent) => {
    if (!dragItemRef.current) return;
    const evClientX =
      ev.type === "mousemove"
        ? (ev as MouseEvent).clientX
        : (ev as TouchEvent).targetTouches[0].clientX;
    const evClientY =
      ev.type === "mousemove"
        ? (ev as MouseEvent).clientY
        : (ev as TouchEvent).targetTouches[0].clientY;
    if (!isDragged.current) {
      shiftX.current = evClientX - coors.current.left;
      shiftY.current = evClientY - coors.current.top;
    }
    const translateX = evClientX - coors.current.left - shiftX.current;
    const translateY = evClientY - coors.current.top - shiftY.current;
    document.body.style.userSelect = "none";
    isDragged.current = true;

    dragItemRef.current.style.pointerEvents = "none";
    const hoveredElement = document.elementFromPoint(
      evClientX,
      evClientY
    ) as HTMLElement;
    dragItemRef.current.style.pointerEvents = "";

    handleOnItemMove({
      mouseX: evClientX,
      mouseY: evClientY,
      translateX,
      translateY,
      shiftX: shiftX.current,
      shiftY: shiftY.current,
      hoveredElement,
      dragItemCoors: coors.current,
      dragItem: dragItemRef.current,
    });
  }, []);

  const onDragEnd = (ev: MouseEvent | TouchEvent) => {
    if (!dragItemRef.current || !isDragged.current) {
      reset();
      return;
    }

    const evClientX =
      ev.type === "mouseup"
        ? (ev as MouseEvent).clientX
        : (ev as TouchEvent).changedTouches[0].clientX;
    const evClientY =
      ev.type === "mouseup"
        ? (ev as MouseEvent).clientY
        : (ev as TouchEvent).changedTouches[0].clientY;

    dragItemRef.current.style.pointerEvents = "none";
    const dropZone = document.elementFromPoint(evClientX, evClientY);
    dragItemRef.current.style.pointerEvents = "";
    if (onDrop) {
      onDrop(dropZone, dragItemRef.current);
    }
    reset();
  };

  const reset = () => {
    if (!dragItemRef.current) return;
    window.removeEventListener("mousemove", onDrag);
    window.removeEventListener("mouseup", onDragEnd);
    window.removeEventListener("touchmove", onDrag);
    window.removeEventListener("touchend", onDragEnd);
    document.body.style.userSelect = "";
    isDragged.current = false;
    coors.current = dragItemRef.current.getBoundingClientRect();
  };

  const onDragStart = (ev: React.MouseEvent | React.TouchEvent) => {
    dragItemRef.current = ev.currentTarget as HTMLElement;
    if (dragItemRef.current) {
      coors.current = dragItemRef.current.getBoundingClientRect();
    }
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", onDragEnd);
    window.addEventListener("touchmove", onDrag);
    window.addEventListener("touchend", onDragEnd);
  };

  useEffect(() => {
    if (dragItemRef.current) {
      coors.current = dragItemRef.current.getBoundingClientRect();
    }
  }, []);

  return {
    onDragStart,
    dragItemRef: dragItemRef.current,
  };
};

export default useDragAndDrop;
