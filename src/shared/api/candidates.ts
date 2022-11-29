import { Candidate } from "shared/types";
import {
  DELETERequest,
  GETRequest,
  PATCHRequest,
  POSTRequest,
} from "./createRequest";

const CANDIDATES_ROUTE = "/candidates";

export const getCandidate = (id: string) =>
  GETRequest<Candidate>(`${CANDIDATES_ROUTE}/${id}`);

export const createCandidate = ({
  vacancyId,
  name,
  grade,
  comment,
  tags,
  contact,
  link,
}: Candidate) =>
  POSTRequest<Candidate>(CANDIDATES_ROUTE, {
    vacancyId,
    name,
    grade,
    comment,
    tags,
    contact,
    link,
  });

export const deleteCandidateById = (id: string) =>
  DELETERequest(`${CANDIDATES_ROUTE}/${id}`);

export const updateCandidate = ({
  _id: candidateId,
  grade,
  comment,
  tags,
  contact,
  link,
  name,
}: Omit<Candidate, "userId" | "vacancyId" | "createdAt">) =>
  PATCHRequest(`${CANDIDATES_ROUTE}/${candidateId}`, {
    grade,
    comment,
    tags,
    contact,
    link,
    name,
  });
