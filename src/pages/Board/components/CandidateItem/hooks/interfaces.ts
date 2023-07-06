import { UseDragDropPropsReturn } from "../../../../../shared/lib/interfaces";

export interface UseCandidateItemManagerProps {
  onDrop: (dropZone: Element | null) => void;
  onItemMove: (
    props: Pick<
      UseDragDropPropsReturn,
      "mouseY" | "hoveredElement" | "dragItem"
    >
  ) => void;
}
