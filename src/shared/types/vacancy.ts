export enum Stages {
  inProgress = "inProgress",
  interviewed = "interviewed",
  new = "new",
  offer = "offer",
}

export interface Candidate {
  _id: string;
  comment: string;
  contact: string;
  createdAt: number;
  grade: string;
  link: string;
  name: string;
  tags: string;
  userId: string;
  vacancyId: string;
}

export interface CandidateColumn {
  _id: string;
  list: Candidate[];
  title: string;
  type: Stages;
  userId: string;
  vacancyId: string;
}

export interface Vacancy {
  _id: string;
  columns: CandidateColumn[];
  createdAt: number;
  link: string;
  name: string;
  userId: string;
}

export interface VacancyInfo extends Omit<Vacancy, "columns"> {
  columns: string[];
}

export type VacancyInfoList = VacancyInfo[];

export type RouteParams = {
  candidateId?: string;
  vacancyId?: string;
};

export interface MoveCandidate {
  candidateId: string;
  currentColumnId: string;
  newColumnId: string;
  newPosition: number;
}
