import { Candidate } from "../types";
import { GETRequest } from "./createRequest";

export const getCandidates = () => GETRequest<Candidate[]>("/character");
