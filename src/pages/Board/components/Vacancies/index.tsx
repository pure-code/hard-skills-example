import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CSSTransition } from "react-transition-group";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../hooks/useStore";
import { ROUTES } from "../../../../constants/routes";
import Popup from "../../../../components/Popup";
import Logo from "../../../../components/Logo";
import AddVacancyForm from "../AddVacancyForm";
import { RouteParams } from "../../../../types";
import { ReactComponent as DayIcon } from "../../../../assets/day.svg";
import { ReactComponent as NightIcon } from "../../../../assets/night.svg";

import {
  AddVacancyBtn,
  VacanciesHeader,
  VacancyItem,
  VacancyList,
  VacanciesContainer,
  VacancyTitle,
  ThemeToggle,
  AddVacancyWrap,
} from "./styled";

const Vacancies = () => {
  const {
    vacancies: { vacanciesList, fetchVacanciesList },
    theme: { toggleTheme, isDarkTheme },
  } = useStore();
  const [showAddVacancyPopup, setShowAddVacancyPopup] = useState(false);
  const { vacancyId } = useParams<RouteParams>();

  const handleSetShowAddVacancyPopup = () =>
    setShowAddVacancyPopup((prevState) => !prevState);

  useEffect(() => {
    fetchVacanciesList();
  }, []);

  return (
    <VacanciesContainer>
      <VacanciesHeader>
        <Logo />
      </VacanciesHeader>
      <AddVacancyWrap>
        <span>Вакансии</span>
        <AddVacancyBtn onClick={handleSetShowAddVacancyPopup}>+</AddVacancyBtn>
      </AddVacancyWrap>
      <VacancyList>
        {vacanciesList.map(({ _id, name }) => (
          <VacancyItem
            key={_id}
            selected={vacancyId === _id}
            to={`${ROUTES.BOARD}/${_id}`}
          >
            <VacancyTitle>{name}</VacancyTitle>
          </VacancyItem>
        ))}
      </VacancyList>
      <ThemeToggle onClick={toggleTheme}>
        {isDarkTheme ? <DayIcon /> : <NightIcon />}
      </ThemeToggle>
      <CSSTransition
        in={showAddVacancyPopup}
        timeout={200}
        classNames="popup"
        unmountOnExit
      >
        <Popup onClose={handleSetShowAddVacancyPopup}>
          <AddVacancyForm
            isEdit={false}
            onSubmit={handleSetShowAddVacancyPopup}
            heading="Добавить новую вакансию"
          />
        </Popup>
      </CSSTransition>
    </VacanciesContainer>
  );
};

export default observer(Vacancies);
