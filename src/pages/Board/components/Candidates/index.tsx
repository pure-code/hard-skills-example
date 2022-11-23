import { useRef } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router";
import { CSSTransition } from "react-transition-group";
import { useStore } from "../../../../hooks/useStore";
import CandidateItem from "../CandidateItem";
import ScrollContainer from "../../../../components/ScrollContainer";
import Header from "../Header";
import { useCandidateManager } from "./hooks/useCandidateManager";
import { Candidate } from "../../../../types";
import CandidatePreview from "../CandidatePreview";
import Popup from "../../../../components/Popup";
import ColumnHeading from "../ColumnHeading";
import { GROUP_COLORS } from "../../../../constants/colors";
import Spinner from "../../../../components/Spinner";

import {
  ColumnContainer,
  CandidatesList,
  CandidatesContainer,
  ColumnList,
} from "./styled";

type RouteParams = {
  candidateId?: string;
};
const Candidates = () => {
  const {
    jobs: { job, candidates, searchQuery, isFetchingCandidates },
  } = useStore();
  const { candidateId = "" } = useParams<RouteParams>();
  const allColumns = useRef<HTMLDivElement[] | null[]>([]);
  const { handleMoveCandidate, handleOnItemMove } = useCandidateManager(
    allColumns.current
  );
  const navigate = useNavigate();
  const closePreview = () => navigate(-1);

  const getFilteredList = (list: Candidate[]) =>
    list.filter(({ name, tags, grade }) =>
      `${name} ${tags} ${grade}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

  return (
    <CandidatesContainer>
      <Header title={job?.name || ""} />
      <ColumnList>
        {isFetchingCandidates && <Spinner />}
        {candidates.map(({ title: groupTitle, type, list }, columnIndex) => (
          <ColumnContainer color={GROUP_COLORS[type]} key={type}>
            <ColumnHeading title={groupTitle} type={type} count={list.length} />
            <ScrollContainer>
              <CandidatesList
                ref={(r) => {
                  allColumns.current[columnIndex] = r;
                }}
              >
                {!isFetchingCandidates &&
                  getFilteredList(list).map((candidate) => (
                    <CandidateItem
                      key={candidate.id}
                      item={candidate}
                      onItemMove={handleOnItemMove}
                      onDrop={handleMoveCandidate(columnIndex, candidate.id)}
                    />
                  ))}
              </CandidatesList>
            </ScrollContainer>
          </ColumnContainer>
        ))}
      </ColumnList>
      <CSSTransition
        in={!!candidateId}
        timeout={200}
        classNames="popup"
        unmountOnExit
      >
        <Popup onClose={closePreview}>
          <CandidatePreview candidateId={candidateId} />
        </Popup>
      </CSSTransition>
    </CandidatesContainer>
  );
};

export default observer(Candidates);
