import { useCallback, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import { useStore } from "shared/lib/useStore";
import Popup from "shared/ui/Popup";
import Search from "shared/ui/Search";
import ConfirmPopup from "shared/ui/ConfirmPopup";
import { debounce } from "shared/lib/debounce";
import { ROUTES } from "shared/constants/routes";
import { ReactComponent as AddCandidateIcon } from "shared/ui/icons/addCandidate.svg";
import { ReactComponent as EditIcon } from "shared/ui/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "shared/ui/icons/delete.svg";
import AddVacancyForm from "pages/Board/components/AddVacancyForm";
import AddCandidateForm from "pages/Board/components/AddCandidateForm";

import {
  AddCandidateBtn,
  DeleteVacancyBtn,
  EditVacancyBtn,
  HeaderContainer,
  Heading,
} from "./styled";

export interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const {
    vacancies: { deleteVacancy, selectedVacancy },
    candidates: { setSearchQuery },
    notification: { pushToNotificationsList },
  } = useStore();
  const [isOpenCreateCandidateForm, setIsOpenCreateCandidateForm] =
    useState(false);
  const [isEditVacancy, setIsEditVacancy] = useState(false);
  const handleSetIsOpenCreateCandidateForm = () =>
    setIsOpenCreateCandidateForm((prevState) => !prevState);
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);
  const navigate = useNavigate();

  const handleSetShowConfirmDeletePopup = () =>
    setShowConfirmDeletePopup((prevState) => !prevState);

  const handleSetIsEditVacancy = () =>
    setIsEditVacancy((prevState) => !prevState);

  const handleDeleteVacancy = () => {
    deleteVacancy(selectedVacancy._id).then(() => {
      pushToNotificationsList({ description: "Вакансия успешно удалена" });
      navigate(ROUTES.BOARD);
    });
  };

  const debouncedSetSearchQuery = useCallback(
    debounce(setSearchQuery, 500),
    []
  );

  return (
    <HeaderContainer>
      <Heading>{title}</Heading>
      <EditVacancyBtn onClick={handleSetIsEditVacancy}>
        <EditIcon />
      </EditVacancyBtn>
      <DeleteVacancyBtn onClick={handleSetShowConfirmDeletePopup}>
        <DeleteIcon />
      </DeleteVacancyBtn>
      <Search onSearch={debouncedSetSearchQuery} />
      <AddCandidateBtn onClick={handleSetIsOpenCreateCandidateForm}>
        <AddCandidateIcon />
        добавить кандидата
      </AddCandidateBtn>
      <CSSTransition
        in={isOpenCreateCandidateForm}
        timeout={200}
        classNames="popup"
        unmountOnExit
      >
        <Popup onClose={handleSetIsOpenCreateCandidateForm}>
          <AddCandidateForm
            isEdit={false}
            onSubmit={handleSetIsOpenCreateCandidateForm}
            heading="Добавить нового кандидата"
          />
        </Popup>
      </CSSTransition>
      <CSSTransition
        in={isEditVacancy}
        timeout={200}
        classNames="popup"
        unmountOnExit
      >
        <Popup onClose={handleSetIsEditVacancy}>
          <AddVacancyForm
            isEdit={isEditVacancy}
            onSubmit={handleSetIsEditVacancy}
            heading="Редактировать вакансию"
          />
        </Popup>
      </CSSTransition>
      <CSSTransition
        in={showConfirmDeletePopup}
        timeout={200}
        classNames="popup"
        unmountOnExit
      >
        <ConfirmPopup
          onConfirm={handleDeleteVacancy}
          onCancel={handleSetShowConfirmDeletePopup}
          confirmBtnTitle="удалить"
        />
      </CSSTransition>
    </HeaderContainer>
  );
};

export default observer(Header);
