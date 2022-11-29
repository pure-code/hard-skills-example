import { memo } from "react";
import useDragAndDrop from "shared/lib/useDragAndDrop";
import { Candidate } from "shared/types";
import { ROUTES } from "shared/constants/routes";
import Tags from "shared/ui/Tags";
import { useCandidateItemManager } from "./hooks/useCandidateItemManager";
import { CandidateItemProps } from "./interfaces";

import { CandidateItemContainer, Grade, Info, MoreBtn, Name } from "./styled";

const CandidateItem = ({ item, onDrop, onItemMove }: CandidateItemProps) => {
  const { handleOnItemMove, handleOnDrop, isDragging } =
    useCandidateItemManager({ onDrop, onItemMove });
  const { _id, vacancyId, name, grade, tags } = item;
  const { onDragStart } = useDragAndDrop({
    onDrop: handleOnDrop,
    handleOnItemMove,
  });

  return (
    <CandidateItemContainer
      to={`${ROUTES.BOARD}/${vacancyId}/${_id}`}
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
        <div>
          <Name>{name}</Name>
          <Grade>{grade}</Grade>
        </div>
      </Info>
      <Tags tags={tags} />
      <MoreBtn>
        <i />
        <i />
        <i />
      </MoreBtn>
    </CandidateItemContainer>
  );
};

export default memo(CandidateItem, (prevProps, nextProps) =>
  Object.keys(prevProps.item).every(
    (key) =>
      prevProps.item[key as keyof Candidate] ===
      nextProps.item[key as keyof Candidate]
  )
);
