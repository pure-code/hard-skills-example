import { action, makeAutoObservable, runInAction } from "mobx";
import {
  createVacancy,
  deleteVacancyById,
  getVacanciesList,
  getVacancyById,
  updateVacancy,
} from "shared/api";
import { Vacancy, VacancyInfoList, VacancyInfo } from "shared/types";
import { initialVacancy } from "./initialData";

class Vacancies {
  constructor() {
    makeAutoObservable(this);
  }

  vacanciesList: VacancyInfoList = [];

  cachedVacancies: Record<string, Vacancy> = {};

  isFetchingVacancies = true;

  selectedVacancy = initialVacancy();

  @action addVacancy = (newVacancy: VacancyInfo) => {
    return createVacancy(newVacancy).then((vacancy) => {
      runInAction(() => {
        this.vacanciesList.push(vacancy);
      });
      return vacancy;
    });
  };

  @action setSelectedVacancy = (vacancy: Vacancy) => {
    this.selectedVacancy = vacancy;
    this.cachedVacancies[vacancy._id] = vacancy;
  };

  @action fetchVacancyById = (vacancyId: string) => {
    if (this.cachedVacancies[vacancyId]) {
      this.setSelectedVacancy(this.cachedVacancies[vacancyId]);
      return;
    }
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

  @action setVacanciesList = (list: VacancyInfoList) => {
    this.vacanciesList = list;
  };

  @action setIsFetchingVacancies = (value: boolean) => {
    this.isFetchingVacancies = value;
  };

  @action deleteVacancy = (id: string) =>
    deleteVacancyById(id).then(() => {
      this.setSelectedVacancy(initialVacancy());
      this.setVacanciesList(this.vacanciesList.filter((el) => el._id !== id));
      delete this.cachedVacancies[id];
    });

  @action updateVacancy = (vacancy: VacancyInfo) =>
    updateVacancy(vacancy).then(() => {
      runInAction(() => {
        this.vacanciesList.forEach((el) => {
          if (el._id === vacancy._id) {
            this.selectedVacancy.name = vacancy.name;
            this.selectedVacancy.link = vacancy.link;
            el.name = vacancy.name;
            el.link = vacancy.link;
          }
        });
      });
    });
}

export default new Vacancies();
