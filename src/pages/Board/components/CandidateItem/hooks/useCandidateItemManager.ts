import { useCallback, useRef } from 'react';
import { throttle } from '../../../../../utils/throttle';
import { UseDragDropPropsReturn } from '../../../../../hooks/interfaces';

export interface UseCandidateItemManagerProps{
  onDrop: (dropZone: Element | null) => void;
  onItemMove: (props: Pick<UseDragDropPropsReturn, 'mouseY' | 'hoveredElement' | 'dragItem'>) => void;
}

export const useCandidateItemManager = ({ onDrop, onItemMove }: UseCandidateItemManagerProps) => {
  const dragItemRef = useRef<HTMLAnchorElement | null>(null);
  const isDragging = useRef(false);
  const startedDragItemPosition = useRef({ x: 0, y: 0, width: 0 });

  const onItemMoveThrottled = useCallback(throttle(onItemMove, 100), []);

  const handleOnItemMove = useCallback(({
    mouseY, translateY, translateX, hoveredElement, dragItem,
  }: UseDragDropPropsReturn) => {
    if (dragItemRef.current) {
      if (!startedDragItemPosition.current.x) {
        const { x, y, width } = dragItemRef.current.getBoundingClientRect();
        startedDragItemPosition.current = { x, y, width };
      }

      document.body.classList.add('dragging');
      dragItemRef.current?.classList.add('moved');
      dragItemRef.current.style.transform = `translate(${translateX}px, ${translateY}px) rotate(-4deg)`;
      dragItemRef.current.style.position = 'fixed';
      dragItemRef.current.style.top = `${startedDragItemPosition.current.y}px`;
      dragItemRef.current.style.left = `${startedDragItemPosition.current.x}px`;
      dragItemRef.current.style.zIndex = '999999';
      dragItemRef.current.style.width = `${startedDragItemPosition.current.width}px`;
    }

    isDragging.current = true;
    onItemMoveThrottled({ mouseY, hoveredElement, dragItem });
  }, []);

  const handleOnDrop = (dropZone: Element | null) => {
    onDrop(dropZone);
    if (dragItemRef.current) {
      document.body.classList.remove('dragging');
      dragItemRef.current?.classList.remove('moved');
      dragItemRef.current.style.transform = '';
      dragItemRef.current.style.position = '';
      dragItemRef.current.style.top = '';
      dragItemRef.current.style.left = '';
      dragItemRef.current.style.zIndex = '';
      dragItemRef.current.style.width = '';
    }
    startedDragItemPosition.current = { x: 0, y: 0, width: 0 };
    setTimeout(() => {
      isDragging.current = false;
    }, 100);
  };
  return {
    dragItemRef,
    handleOnItemMove,
    handleOnDrop,
    isDragging,
  };
};
