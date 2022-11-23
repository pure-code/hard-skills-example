import { memo } from 'react';
import useDragAndDrop from '../../../../hooks/useDragAndDrop';
import { useCandidateItemManager } from './hooks/useCandidateItemManager';
import { Candidate } from '../../../../types';
import { ROUTES } from '../../../../constants/routes';
import Tags from '../../../../components/Tags';
import { CandidateItemProps } from './interfaces';

import {
  Avatar, CandidateItemContainer, Grade, Info, Name,
} from './styled';

const CandidateItem = ({ item, onDrop, onItemMove }: CandidateItemProps) => {
  const {
    dragItemRef, handleOnItemMove, handleOnDrop, isDragging,
  } = useCandidateItemManager({ onDrop, onItemMove });
  const {
    id, jobId, name, grade, tags, avatar,
  } = item;
  const { onDragStart } = useDragAndDrop(
    { onDrop: handleOnDrop, dragItemRef, handleOnItemMove },
  );

  return (
    <CandidateItemContainer
      to={`${ROUTES.BOARD}/${jobId}/${id}`}
      ref={dragItemRef}
      onMouseDown={onDragStart}
      onTouchStart={onDragStart}
      onContextMenu={(ev) => ev.preventDefault()}
      draggable={false}
      onClick={(ev) => {
        if (isDragging.current) {
          ev.preventDefault();
        }
      }}
      tabIndex={0}
    >
      <Info>
        <Avatar>
          <img src={avatar} alt="" />
        </Avatar>
        <div>
          <Name>{name}</Name>
          <Grade>{grade}</Grade>
        </div>
      </Info>
      <Tags tags={tags} />
    </CandidateItemContainer>
  );
};

export default memo(
  CandidateItem,
  (prevProps, nextProps) => Object.keys(prevProps.item)
    .every((key) =>
      prevProps.item[key as keyof Candidate] === nextProps.item[key as keyof Candidate]),
);
