import { useNavigate } from "react-router";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../hooks/useStore";
import Tags from "../../../../components/Tags";
import { initialCandidate } from "../../../../stores/initialData";
import { ReactComponent as DeleteIcon } from "../../../../assets/delete.svg";

import {
  CandidatePreviewContainer,
  Info,
  Name,
  Title,
  Delete,
  ControlsWrap,
  Edit,
  Comment,
} from "./styled";

export interface CandidatePreviewProps {
  onEdit: () => void;
}

const CandidatePreview = ({ onEdit }: CandidatePreviewProps) => {
  const {
    candidates: { deleteCandidate, selectedCandidate },
  } = useStore();
  const { _id, name, grade, link, contact, comment, tags } =
    selectedCandidate || initialCandidate("");
  const navigate = useNavigate();

  const handleDeleteCandidate = () => {
    deleteCandidate(_id);
    navigate(-1);
  };

  return (
    <CandidatePreviewContainer>
      <Info>
        <Name>{name}</Name>
        <Title>{grade}</Title>
        <Title>{link}</Title>
        <Title>{contact}</Title>
        <Comment>{comment}</Comment>
        <Tags tags={tags} />
        <ControlsWrap>
          <Edit onClick={onEdit} type="button">
            редактировать
          </Edit>
          <Delete onClick={handleDeleteCandidate}>
            <DeleteIcon />
            Удалить
          </Delete>
        </ControlsWrap>
      </Info>
    </CandidatePreviewContainer>
  );
};

export default observer(CandidatePreview);
