import { useCallback, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../hooks/useStore";
import AddCandidate from "../AddCandidate";
import Popup from "../../../../components/Popup";
import Search from "../../../../components/Search";
import { debounce } from "../../../../utils/debounce";
import { ReactComponent as AddCandidateIcon } from "../../../../assets/addCandidate.svg";

import { AddCandidateBtn, HeaderContainer, Heading } from "./styled";

export interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const {
    jobs: { setSearchQuery },
  } = useStore();
  const [isOpenCreateCandidateForm, setIsOpenCreateCandidateForm] =
    useState(false);
  const handleSetIsOpenCreateCandidateForm = () =>
    setIsOpenCreateCandidateForm((prevState) => !prevState);

  const debouncedSetSearchQuery = useCallback(
    debounce(setSearchQuery, 500),
    []
  );

  return (
    <HeaderContainer>
      <Heading>{title}</Heading>
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
          <AddCandidate onCreate={handleSetIsOpenCreateCandidateForm} />
        </Popup>
      </CSSTransition>
    </HeaderContainer>
  );
};

export default observer(Header);
