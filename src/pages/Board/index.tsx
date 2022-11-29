import { useParams } from "react-router";
import ErrorBoundary from "shared/ui/ErrorBoundary";
import { RouteParams } from "shared/types";
import Vacancies from "./components/Vacancies";
import Columns from "./components/Columns";
import { BoardContainer } from "./styled";

const Board = () => {
  const { vacancyId } = useParams<RouteParams>();

  return (
    <BoardContainer>
      <ErrorBoundary>
        <Vacancies />
      </ErrorBoundary>
      {vacancyId && (
        <ErrorBoundary>
          <Columns />
        </ErrorBoundary>
      )}
    </BoardContainer>
  );
};

export default Board;
