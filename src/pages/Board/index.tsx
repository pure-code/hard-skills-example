import Jobs from './components/Jobs';
import Candidates from './components/Candidates';
import { BoardContainer } from './styled';

const Board = () => (
  <BoardContainer>
    <Jobs />
    <Candidates />
  </BoardContainer>
);

export default Board;
