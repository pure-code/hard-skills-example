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
  onDrop?: (dropZone: Element | null, dragItem: HTMLElement) => void;
  handleOnItemMove: (props: UseDragDropPropsReturn) => void;
}
