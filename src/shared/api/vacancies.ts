import { Vacancy, VacancyInfo, VacancyInfoList } from "shared/types";
import {
  DELETERequest,
  GETRequest,
  PATCHRequest,
  POSTRequest,
} from "./createRequest";

const VACANCIES_ROUTE = "/vacancies";

export const getVacanciesList = () =>
  GETRequest<VacancyInfoList>(VACANCIES_ROUTE);

export const getVacancyById = (id: string) =>
  GETRequest<Vacancy>(`${VACANCIES_ROUTE}/${id}`);

export const createVacancy = (newVacancy: VacancyInfo) =>
  POSTRequest<VacancyInfo>(VACANCIES_ROUTE, {
    name: newVacancy.name,
    link: newVacancy.link,
  });

export const updateVacancy = ({ _id, name, link }: VacancyInfo) =>
  PATCHRequest<VacancyInfo>(`${VACANCIES_ROUTE}/${_id}`, {
    name,
    link,
  });

export const deleteVacancyById = (id: string) =>
  DELETERequest(`${VACANCIES_ROUTE}/${id}`);
