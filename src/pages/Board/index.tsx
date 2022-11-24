import { useParams } from "react-router";
import Vacancies from "./components/Vacancies";
import Candidates from "./components/Candidates";
import { BoardContainer } from "./styled";
import ErrorBoundary from "../../components/ErrorBoundary";
import { RouteParams } from "../../types";

const Board = () => {
  const { vacancyId } = useParams<RouteParams>();

  return (
    <BoardContainer>
      <ErrorBoundary>
        <Vacancies />
      </ErrorBoundary>
      {vacancyId && (
        <ErrorBoundary>
          <Candidates />
        </ErrorBoundary>
      )}
    </BoardContainer>
  );
};

export default Board;
