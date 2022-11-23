import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CSSTransition } from 'react-transition-group';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../hooks/useStore';
import { ROUTES } from '../../../../constants/routes';
import Popup from '../../../../components/Popup';
import AddJob from '../AddJob';
import { ReactComponent as DayIcon } from '../../../../assets/day.svg';
import { ReactComponent as NightIcon } from '../../../../assets/night.svg';

import {
  AddJobBtn, JobHeader, JobItem, JobList, JobsContainer, JobTitle, ThemeToggle,
} from './styled';

type RouteParams = {
  jobId?: string;
  candidateId?: string;
}

const Jobs = () => {
  const { jobs: { setSelectedJob, jobsList }, theme: { toggleTheme, isDarkTheme } } = useStore();
  const [showAddJobPopup, setShowAddJobPopup] = useState(false);
  const { jobId = '' } = useParams<RouteParams>();

  const handleSetShowAddJobPopup = () => setShowAddJobPopup((prevState) => !prevState);

  useEffect(() => {
    setSelectedJob(jobId);
  }, [jobId]);

  return (
    <JobsContainer>
      <JobHeader>
        <span>Вакансии</span>
        <AddJobBtn onClick={handleSetShowAddJobPopup}>+</AddJobBtn>
      </JobHeader>
      <JobList>
        {jobsList.map(({ id, name, company }) => (
          <JobItem key={id} selected={jobId === id} to={`${ROUTES.BOARD}/${id}`}>
            <JobTitle>{name}</JobTitle>
            <JobTitle><i>{company}</i></JobTitle>
          </JobItem>
        ))}
      </JobList>
      <ThemeToggle onClick={toggleTheme}>
        {isDarkTheme ? <DayIcon /> : <NightIcon /> }
      </ThemeToggle>
      <CSSTransition
        in={showAddJobPopup}
        timeout={200}
        classNames="popup"
        unmountOnExit
      >
        <Popup onClose={handleSetShowAddJobPopup}>
          <AddJob
            onCreate={handleSetShowAddJobPopup}
          />
        </Popup>
      </CSSTransition>
    </JobsContainer>
  );
};

export default observer(Jobs);
