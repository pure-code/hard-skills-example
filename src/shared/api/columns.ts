import { MoveCandidate } from "shared/types";
import { PATCHRequest } from "./createRequest";

const COLUMNS_ROUTE = "/columns";

export const moveCandidate = ({
  candidateId,
  newPosition,
  newColumnId,
  currentColumnId,
}: MoveCandidate) =>
  PATCHRequest(`${COLUMNS_ROUTE}/${currentColumnId}`, {
    candidateId,
    newColumnId,
    newPosition,
  });
