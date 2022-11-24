import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router";
import { CSSTransition } from "react-transition-group";
import { useStore } from "../../../../hooks/useStore";
import CandidateItem from "../CandidateItem";
import ScrollContainer from "../../../../components/ScrollContainer";
import Header from "../Header";
import { useCandidateManager } from "./hooks/useCandidateManager";
import { Candidate, RouteParams } from "../../../../types";
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

const Candidates = () => {
  const {
    vacancies: {
      selectedVacancy: { name: vacancyName, columns },
      searchQuery,
      isFetchingCandidates,
      fetchVacancyById,
    },
  } = useStore();
  const { vacancyId, candidateId } = useParams<RouteParams>();
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

  useEffect(() => {
    if (vacancyId) {
      fetchVacancyById(vacancyId);
    }
  }, [vacancyId]);

  return (
    <CandidatesContainer>
      <Header title={vacancyName || ""} />
      <ColumnList>
        {isFetchingCandidates && <Spinner />}
        {columns.map(({ title: groupTitle, type, list }, columnIndex) => (
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
                      key={candidate._id}
                      item={candidate}
                      onItemMove={handleOnItemMove}
                      onDrop={handleMoveCandidate(columnIndex, candidate._id)}
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
          <CandidatePreview />
        </Popup>
      </CSSTransition>
    </CandidatesContainer>
  );
};

export default observer(Candidates);
