export enum Stages {
  new = "new",
  inProgress = "inProgress",
  interviewed = "interviewed",
  offer = "offer",
}

export interface Candidate {
  id: string;
  jobId: string;
  name: string;
  avatar: string;
  grade: string;
  comment: string;
  tags: string;
  contact: string;
  link: string;
}

export interface CandidateGroup {
  type: Stages;
  title: string;
  list: Candidate[];
}

export interface Job {
  id: string;
  name: string;
  company: string;
  candidates: CandidateGroup[];
}
