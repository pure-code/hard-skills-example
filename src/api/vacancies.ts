import { Vacancy } from "../types";
import { GETRequest, POSTRequest } from "./createRequest";

export const getVacanciesList = () => GETRequest<Vacancy[]>("/vacancies");

export const getVacancyById = (id: string) =>
  GETRequest<Vacancy>(`/vacancies/${id}`);

export const createVacancy = (newVacancy: Vacancy) =>
  POSTRequest<Vacancy>("/vacancies", {
    name: newVacancy.name,
    link: newVacancy.link,
  });
