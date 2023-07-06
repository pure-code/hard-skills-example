import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CSSTransition } from "react-transition-group";
import { observer } from "mobx-react-lite";
import { useStore } from "shared/lib/useStore";
import { ROUTES } from "shared/constants/routes";
import Popup from "shared/ui/Popup";
import Logo from "shared/ui/Logo";
import { RouteParams } from "shared/types";
import { ReactComponent as DayIcon } from "shared/ui/icons/day.svg";
import { ReactComponent as NightIcon } from "shared/ui/icons/night.svg";
import AddVacancyForm from "pages/Board/components/AddVacancyForm";

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
  const navigate = useNavigate();

  const handleSetShowAddVacancyPopup = () =>
    setShowAddVacancyPopup((prevState) => !prevState);

  useEffect(() => {
    fetchVacanciesList();
  }, []);

  useEffect(() => {
    if (vacanciesList.length === 1) {
      navigate(`${ROUTES.BOARD}/${vacanciesList[0]._id}`);
    }
  }, [vacanciesList]);

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
