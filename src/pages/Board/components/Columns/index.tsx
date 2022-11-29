import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router";
import { CSSTransition } from "react-transition-group";
import { useStore } from "shared/lib/useStore";
import ScrollContainer from "shared/ui/ScrollContainer";
import { Candidate, RouteParams } from "shared/types";
import Popup from "shared/ui/Popup";
import { GROUP_COLORS } from "shared/constants/colors";
import CandidateItem from "pages/Board/components/CandidateItem";
import Header from "pages/Board/components/Header";
import CandidatePreview from "pages/Board/components/CandidatePreview";
import ColumnHeading from "pages/Board/components/ColumnHeading";
import AddCandidateForm from "pages/Board/components/AddCandidateForm";
import { useColumnsManager } from "./hooks/useColumnsManager";

import {
  ColumnContainer,
  CandidatesList,
  ColumnsContainer,
  ColumnList,
} from "./styled";

const Columns = () => {
  const {
    vacancies: {
      selectedVacancy: { name: vacancyName, columns },
      fetchVacancyById,
    },
    candidates: { searchQuery, setSelectedCandidateId },
  } = useStore();
  const { vacancyId, candidateId } = useParams<RouteParams>();
  const [isEdit, setIsEdit] = useState(false);
  const allColumns = useRef<HTMLDivElement[] | null[]>([]);
  const { handleMoveCandidate, handleOnItemMove } = useColumnsManager(
    allColumns.current
  );
  const navigate = useNavigate();
  const closePreview = () => {
    if (isEdit) {
      setIsEdit(false);
      return;
    }
    navigate(-1);
  };

  const handleSetIsEdit = () => setIsEdit((prevState) => !prevState);

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

  useEffect(() => {
    setSelectedCandidateId(candidateId || "");
    return () => setSelectedCandidateId("");
  }, [candidateId]);

  return (
    <ColumnsContainer>
      <Header title={vacancyName} />
      <ColumnList>
        {columns.map(({ title: groupTitle, type, list }, columnIndex) => (
          <ColumnContainer color={GROUP_COLORS[type]} key={type}>
            <ColumnHeading title={groupTitle} type={type} count={list.length} />
            <ScrollContainer>
              <CandidatesList
                ref={(r) => {
                  allColumns.current[columnIndex] = r;
                }}
              >
                {getFilteredList(list).map((candidate) => (
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
          {isEdit ? (
            <AddCandidateForm
              heading="Редактировать кандидата"
              isEdit={isEdit}
              onSubmit={handleSetIsEdit}
            />
          ) : (
            <CandidatePreview onEdit={handleSetIsEdit} />
          )}
        </Popup>
      </CSSTransition>
    </ColumnsContainer>
  );
};

export default observer(Columns);
