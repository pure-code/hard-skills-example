import { Candidate } from "shared/types";
import { UseDragDropPropsReturn } from "shared/lib/interfaces";

export interface CandidateItemProps {
  item: Candidate;
  onDrop: (dropZone: Element | null) => void;
  onItemMove: (
    props: Pick<
      UseDragDropPropsReturn,
      "mouseY" | "hoveredElement" | "dragItem"
    >
  ) => void;
}
