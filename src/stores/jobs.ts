import {
  action, computed, makeAutoObservable,
} from 'mobx';
import { demoJobs } from './initialData';
import {
  Candidate, Job, Stages,
} from '../types';

class Jobs {
  constructor() {
    makeAutoObservable(this);
  }

  jobsList: Job[] = demoJobs;

  isFetchingCandidates = true;

  selectedJobId = '';

  searchQuery = '';

  @action addJob = (newJob: Job) => {
    this.jobsList.push(newJob);
  };

  @action setSearchQuery = (query: string) => {
    this.searchQuery = query;
  };

  @computed get job() {
    return this.jobsList.find((job) => job.id === this.selectedJobId);
  }

  @computed get candidates() {
    return this.jobsList.find((job) => job.id === this.selectedJobId)?.candidates || [];
  }

  @action getJobById = (jobId: string) => this.jobsList.find((job) => job.id === jobId);

  @action setSelectedJob = (jobId: string) => {
    this.setIsFetchingJobs(true);
    this.selectedJobId = jobId;
    setTimeout(() => {
      this.setIsFetchingJobs(false);
    }, 500);
  };

  @action setIsFetchingJobs = (value: boolean) => {
    this.isFetchingCandidates = value;
  };

  @action getCandidateById = (candidateId: string) => {
    let candidate = null;
    this.candidates.forEach((item) => {
      item.list.forEach((el) => {
        if (el.id === candidateId) {
          candidate = el;
        }
      });
    });

    return candidate;
  };

  @action addCandidate = (newCandidate: Candidate) => {
    this.candidates.find((el) => el.type === Stages.new)?.list.unshift(newCandidate);
  };

  @action deleteCandidate = (id: string) => {
    if (this.job) {
      this.job.candidates.forEach((item) => {
        item.list = item.list.filter((el) => el.id !== id);
      });
    }
  };

  @action moveCandidate = (id: string, targetColumn: number, currentColumn: number, position: number) => {
    const targetCandidate = this.candidates[currentColumn].list.find((el) => el.id === id);
    if (targetCandidate) {
      this.candidates[currentColumn].list = this.candidates[currentColumn].list.filter((el) => el.id !== id);
      this.candidates[targetColumn].list.splice(position, 0, { ...targetCandidate });
    }
  };
}

export default new Jobs();
