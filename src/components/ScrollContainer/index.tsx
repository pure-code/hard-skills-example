import React, {
  useCallback, useEffect, useRef, useState, ReactNode,
} from 'react';
import useDragAndDrop from '../../hooks/useDragAndDrop';
import { UseDragDropPropsReturn } from '../../hooks/interfaces';
import { HEADER_HEIGHT } from '../../constants/globalStyles';

import { StyledScrollContainer, ScrollWrapper, CustomScrollBtn } from './styled';

export interface ScrollContainerProps{
  children: ReactNode;
}

const ScrollContainer = ({ children }: ScrollContainerProps) => {
  const [scrollBtnHeight, setScrollBtnHeight] = useState(0);
  const [scrollBarPosition, setScrollBarPosition] = useState(0);
  const [isVisibleScrollBtn, setIsVisibleScrollBtn] = useState(false);
  const scrollWrapperRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollBtnRef = useRef<HTMLDivElement | null>(null);
  const scrollRatio = useRef<number>(1);

  const handleSetScrollBtnHeight = () => {
    const containerHeight = scrollContainerRef?.current?.offsetHeight || 1;
    const contentWrapperHeight = scrollWrapperRef?.current?.scrollHeight || 1;
    scrollRatio.current = contentWrapperHeight / containerHeight;
    setScrollBtnHeight(containerHeight / scrollRatio.current);
    setIsVisibleScrollBtn(contentWrapperHeight > containerHeight);
  };

  const handleOnScroll = (ev: React.UIEvent) => {
    const { currentTarget } = ev;
    if (scrollBtnRef.current) {
      setScrollBarPosition(currentTarget.scrollTop / scrollRatio.current);
    }
  };

  const handleOnCustomScroll = useCallback((
    { mouseY, shiftY }: UseDragDropPropsReturn,
  ) => {
    const translateTo = mouseY - HEADER_HEIGHT - shiftY;

    if (
      scrollBtnRef.current &&
      scrollContainerRef.current &&
      translateTo <= (scrollContainerRef?.current?.offsetHeight || 0) - (scrollBtnRef?.current?.offsetHeight || 0) &&
      translateTo >= 0
    ) {
      setScrollBarPosition(translateTo);
      handleCustomScroll(translateTo);
    }
  }, []);

  const { onDragStart } = useDragAndDrop({
    dragItemRef: scrollBtnRef,
    handleOnItemMove: handleOnCustomScroll,
  });

  const handleCustomScroll = (num: number) => {
    if (scrollWrapperRef) {
      scrollWrapperRef?.current?.scrollTo(0, num * scrollRatio.current);
    }
  };

  // TODO прикрутить THROTTLER
  useEffect(() => {
    window.addEventListener('resize', handleSetScrollBtnHeight);

    return () => window.removeEventListener('resize', handleSetScrollBtnHeight);
  }, []);

  useEffect(handleSetScrollBtnHeight);

  return (
    <StyledScrollContainer ref={scrollContainerRef}>
      <ScrollWrapper ref={scrollWrapperRef} onScroll={handleOnScroll}>
        {children}
      </ScrollWrapper>
      {isVisibleScrollBtn && (
      <CustomScrollBtn
        ref={scrollBtnRef}
        onMouseDown={onDragStart}
        style={{ top: `${scrollBarPosition}px`, height: scrollBtnHeight }}
      />
      )}
    </StyledScrollContainer>
  );
};

export default ScrollContainer;
