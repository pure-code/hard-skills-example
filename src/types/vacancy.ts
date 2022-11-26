export enum Stages {
  new = "new",
  inProgress = "inProgress",
  interviewed = "interviewed",
  offer = "offer",
}

export interface Candidate {
  _id: string;
  userId: string;
  vacancyId: string;
  name: string;
  grade: string;
  comment: string;
  tags: string;
  contact: string;
  link: string;
  createdAt: number;
}

export interface CandidateColumn {
  _id: string;
  userId: string;
  vacancyId: string;
  type: Stages;
  title: string;
  list: Candidate[];
}

export interface Vacancy {
  _id: string;
  userId: string;
  name: string;
  link: string;
  columns: CandidateColumn[];
  createdAt: number;
}

export interface VacancyInfo extends Omit<Vacancy, "columns"> {
  columns: string[];
}

export type VacancyInfoList = VacancyInfo[];

export type RouteParams = {
  vacancyId?: string;
  candidateId?: string;
};

export interface MoveCandidate {
  currentColumnId: string;
  candidateId: string;
  newColumnId: string;
  newPosition: number;
}
