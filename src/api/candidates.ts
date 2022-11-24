import { Candidate } from "../types";
import { GETRequest, POSTRequest } from "./createRequest";

export const getCandidate = (id: string) =>
  GETRequest<Candidate>(`/candidates/${id}`);

export const createCandidate = ({
  vacancyId,
  name,
  avatar,
  grade,
  comment,
  tags,
  contact,
  link,
}: Candidate) =>
  POSTRequest<Candidate>("/candidates", {
    vacancyId,
    name,
    avatar,
    grade,
    comment,
    tags,
    contact,
    link,
  });
