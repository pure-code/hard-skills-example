import { action, computed, makeAutoObservable, runInAction } from "mobx";
import {
  createCandidate,
  deleteCandidateById,
  updateCandidate,
  moveCandidate,
} from "shared/api";
import { Candidate, Stages } from "shared/types";
import VacanciesStore from "./vacancies";

class Candidates {
  private vacanciesStore: typeof VacanciesStore;

  constructor() {
    makeAutoObservable(this);
    this.vacanciesStore = VacanciesStore;
  }

  selectedCandidateId = "";

  searchQuery = "";

  @action setSearchQuery = (query: string) => {
    this.searchQuery = query;
  };

  @computed get columns() {
    return this.vacanciesStore.selectedVacancy.columns || [];
  }

  @computed get selectedCandidate() {
    let candidate = null;
    this.columns.forEach((item) => {
      item.list.forEach((el) => {
        if (el._id === this.selectedCandidateId) {
          candidate = el;
        }
      });
    });
    return candidate;
  }

  @action setSelectedCandidateId = (id: string) => {
    this.selectedCandidateId = id;
  };

  @action getCandidateById = (candidateId: string) => {
    let candidate = null;
    this.columns.forEach((item) => {
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
      runInAction(() => {
        this.columns
          .find((el) => el.type === Stages.new)
          ?.list.unshift(candidate);
      });
    });
  };

  @action deleteCandidate = (id: string) => {
    deleteCandidateById(id).then(() => {
      runInAction(() => {
        this.vacanciesStore.selectedVacancy.columns.forEach((item) => {
          item.list = item.list.filter((el) => el._id !== id);
        });
      });
    });
  };

  @action moveCandidate = ({
    candidateId,
    currentColumnIndex,
    targetColumnIndex,
    newPosition,
  }: {
    candidateId: string;
    currentColumnIndex: number;
    newPosition: number;
    targetColumnIndex: number;
  }) => {
    const targetCandidate = this.columns[currentColumnIndex].list.find(
      (el) => el._id === candidateId
    );
    if (targetCandidate) {
      this.columns[currentColumnIndex].list = this.columns[
        currentColumnIndex
      ].list.filter((el) => el._id !== candidateId);

      this.columns[targetColumnIndex].list.splice(newPosition, 0, {
        ...targetCandidate,
      });
      moveCandidate({
        candidateId,
        currentColumnId: this.columns[currentColumnIndex]._id,
        newColumnId: this.columns[targetColumnIndex]._id,
        newPosition,
      }).catch(() => {
        this.vacanciesStore.fetchVacancyById(
          this.vacanciesStore.selectedVacancy._id
        );
      });
    }
  };

  @action updateCandidate = (newCandidateInfo: Candidate) => {
    updateCandidate(newCandidateInfo).then(() => {
      runInAction(() => {
        this.columns.forEach((item) => {
          item.list.forEach((el, index) => {
            if (el._id === newCandidateInfo._id) {
              item.list[index] = newCandidateInfo;
            }
          });
        });
      });
    });
  };
}

export default new Candidates();
