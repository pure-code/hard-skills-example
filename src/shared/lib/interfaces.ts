import { MutableRefObject } from "react";

export type DOMRectProps = Pick<DOMRect, "top" | "left">;

export interface UseDragDropPropsReturn {
  mouseX: number;
  mouseY: number;
  translateX: number;
  translateY: number;
  dragItemCoors: DOMRectProps;
  shiftX: number;
  shiftY: number;
  hoveredElement: HTMLElement;
  dragItem: HTMLElement;
}

export interface UseDragDropProps {
  onDrop?: (dropZone: Element | null) => void;
  handleOnItemMove: (props: UseDragDropPropsReturn) => void;
  dragItemRef: MutableRefObject<HTMLElement | null>;
}
