import Jobs from './components/Jobs';
import Candidates from './components/Candidates';
import { BoardContainer } from './styled';
import ErrorBoundary from '../../components/ErrorBoundary';

const Board = () => (
  <BoardContainer>
    <ErrorBoundary>
      <Jobs />
    </ErrorBoundary>
    <ErrorBoundary>
      <Candidates />
    </ErrorBoundary>
  </BoardContainer>
);

export default Board;
