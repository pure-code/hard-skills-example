import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useStore } from "../../../../hooks/useStore";
import { Candidate, RouteParams } from "../../../../types";
import Tags from "../../../../components/Tags";
import { initialCandidate } from "../../../../stores/initialData";
import { ReactComponent as DeleteIcon } from "../../../../assets/delete.svg";

import {
  CandidatePreviewContainer,
  Avatar,
  Info,
  Name,
  Title,
  Delete,
} from "./styled";

const CandidatePreview = () => {
  const {
    vacancies: { getCandidateById, deleteCandidate },
  } = useStore();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const { _id, name, grade, link, contact, comment, tags, avatar } =
    candidate || initialCandidate("");
  const { candidateId } = useParams<RouteParams>();
  const navigate = useNavigate();

  const handleDeleteCandidate = () => {
    deleteCandidate(_id);
    navigate(-1);
  };

  useEffect(() => {
    if (candidateId) {
      setCandidate(getCandidateById(candidateId));
    }
  }, []);

  return (
    <CandidatePreviewContainer>
      <Avatar>
        <img src={avatar} alt="" />
      </Avatar>
      <Info>
        <Name>{name}</Name>
        <Title>{grade}</Title>
        <Title>{link}</Title>
        <Title>{contact}</Title>
        <Title>{comment}</Title>
        <Tags tags={tags} />
        <Delete onClick={handleDeleteCandidate}>
          <DeleteIcon />
          Удалить
        </Delete>
      </Info>
    </CandidatePreviewContainer>
  );
};

export default CandidatePreview;
