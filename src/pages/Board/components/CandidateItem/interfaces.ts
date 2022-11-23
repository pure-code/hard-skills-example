import { Candidate } from "../../../../types";
import { UseDragDropPropsReturn } from "../../../../hooks/interfaces";

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
