import { useParams } from "react-router";
import Vacancies from "./components/Vacancies";
import Columns from "./components/Columns";
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
          <Columns />
        </ErrorBoundary>
      )}
    </BoardContainer>
  );
};

export default Board;
