import { useCallback, useRef } from "react";
import { useStore } from "shared/lib/useStore";
import { UseDragDropPropsReturn } from "shared/lib/interfaces";

export const useColumnsManager = (allColumns: HTMLDivElement[] | null[]) => {
  const {
    candidates: { moveCandidate },
  } = useStore();

  const moveElIndex = useRef(-1);
  const lastHoveredEl = useRef<Element | null>(null);

  const handleOnItemMove = useCallback(
    ({
      mouseY,
      hoveredElement,
      dragItem,
    }: Pick<
      UseDragDropPropsReturn,
      "mouseY" | "hoveredElement" | "dragItem"
    >) => {
      allColumns.forEach((column) => {
        if (column && column.contains(hoveredElement)) {
          const { top } = column.getBoundingClientRect();
          const selectedElPosition = mouseY - top;
          const candidateHeight = dragItem.offsetHeight;
          const selectedElIndex = Math.floor(
            selectedElPosition / candidateHeight
          );
          const selectedEl = [...column.children].filter(
            (el) => el !== dragItem
          )[selectedElIndex];
          lastHoveredEl.current?.classList.remove("hoveredCandidate");
          if (selectedEl && !selectedEl.classList.contains("moved")) {
            selectedEl.classList.add("hoveredCandidate");
            lastHoveredEl.current = selectedEl;
          }

          moveElIndex.current = selectedEl === dragItem ? -1 : selectedElIndex;
        }
      });
    },
    []
  );

  const handleMoveCandidate = useCallback(
    (currentColumnIndex: number, candidateId: string) =>
      (dropZone: Element | null) => {
        allColumns.forEach((el, targetColumnIndex) => {
          lastHoveredEl.current?.classList.remove("hoveredCandidate");
          if (
            el &&
            (el === dropZone || el.contains(dropZone)) &&
            moveElIndex.current !== -1
          ) {
            moveCandidate({
              candidateId,
              targetColumnIndex,
              currentColumnIndex,
              newPosition: moveElIndex.current,
            });
          }
        });
      },
    []
  );

  return {
    handleOnItemMove,
    handleMoveCandidate,
  };
};
