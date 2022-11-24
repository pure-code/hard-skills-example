import { action, computed, makeAutoObservable } from "mobx";
import { Candidate, Vacancy, Stages } from "../types";
import {
  createVacancy,
  getVacanciesList,
  getVacancyById,
} from "../api/vacancies";
import { initialVacancy } from "./initialData";
import { createCandidate } from "../api";

class Vacancies {
  constructor() {
    makeAutoObservable(this);
  }

  vacanciesList: Vacancy[] = [];

  isFetchingCandidates = true;

  selectedVacancy: Vacancy = initialVacancy();

  searchQuery = "";

  @action addVacancy = (newVacancy: Vacancy) => {
    this.vacanciesList.push(newVacancy);

    return createVacancy(newVacancy).then((vacancy) => {
      return vacancy;
    });
  };

  @action setSearchQuery = (query: string) => {
    this.searchQuery = query;
  };

  @computed get candidates() {
    return this.selectedVacancy?.columns || [];
  }

  @action setSelectedVacancy = (vacancy: Vacancy) => {
    this.selectedVacancy = vacancy;
  };

  @action fetchVacancyById = (vacancyId: string) => {
    getVacancyById(vacancyId).then((vacancy) => {
      this.setSelectedVacancy(vacancy);
    });
  };

  @action fetchVacanciesList = () => {
    this.setIsFetchingVacancies(true);
    getVacanciesList()
      .then((list) => {
        this.setVacanciesList(list);
      })
      .finally(() => this.setIsFetchingVacancies(false));
  };

  @action setVacanciesList = (list: Vacancy[]) => {
    this.vacanciesList = list;
  };

  @action setIsFetchingVacancies = (value: boolean) => {
    this.isFetchingCandidates = value;
  };

  @action getCandidateById = (candidateId: string) => {
    let candidate = null;
    this.candidates.forEach((item) => {
      item.list.forEach((el) => {
        if (el._id === candidateId) {
          candidate = el;
        }
      });
    });
    return candidate;
  };

  @action addCandidate = (newCandidate: Candidate) => {
    createCandidate(newCandidate).then((candidate) => {
      this.candidates
        .find((el) => el.type === Stages.new)
        ?.list.unshift(candidate);
    });
  };

  @action deleteCandidate = (id: string) => {
    this.selectedVacancy.columns.forEach((item) => {
      item.list = item.list.filter((el) => el._id !== id);
    });
  };

  @action moveCandidate = (
    id: string,
    targetColumn: number,
    currentColumn: number,
    position: number
  ) => {
    const targetCandidate = this.candidates[currentColumn].list.find(
      (el) => el._id === id
    );
    if (targetCandidate) {
      this.candidates[currentColumn].list = this.candidates[
        currentColumn
      ].list.filter((el) => el._id !== id);
      this.candidates[targetColumn].list.splice(position, 0, {
        ...targetCandidate,
      });
    }
  };
}

export default new Vacancies();
