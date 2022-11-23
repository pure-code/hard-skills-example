import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useStore } from '../../../../hooks/useStore';
import { Candidate } from '../../../../types';
import Tags from '../../../../components/Tags';
import { initialCandidate } from '../../../../stores/initialData';
import { ReactComponent as DeleteIcon } from '../../../../assets/delete.svg';

import {
  CandidatePreviewContainer, Avatar, Info, Name, Title, Delete,
} from './styled';

export interface CandidatePreviewProps{
  candidateId: string;
}

const CandidatePreview = ({ candidateId }: CandidatePreviewProps) => {
  const { jobs: { getCandidateById, deleteCandidate } } = useStore();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const {
    id, name, grade, link, contact, comment, tags, avatar,
  } = candidate || initialCandidate('');

  const navigate = useNavigate();

  const handleDeleteCandidate = () => {
    deleteCandidate(id);
    navigate(-1);
  };

  useEffect(() => {
    setCandidate(getCandidateById(candidateId));
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
