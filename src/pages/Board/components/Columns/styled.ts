import styled from "styled-components";
import { HEADER_HEIGHT } from "shared/constants/globalStyles";
import { CandidateItemContainer } from "pages/Board/components/CandidateItem/styled";

export const ColumnsContainer = styled.div`
  flex-basis: 100%;
`;

export const ColumnList = styled.div.attrs({
  className: "overflowHiddenOnDrag",
})`
  position: relative;
  display: flex;
  flex-basis: 100%;
  height: calc(100vh - ${HEADER_HEIGHT}px);
  align-items: flex-start;
  padding: 30px 20px 10px 20px;
  overflow: hidden;
  background: url("/pattern.png") ${({ theme }) => theme.darkBg} repeat;

  @media (max-width: 1000px) {
    overflow-x: scroll;
    padding: 20px 6px;
  }
`;

export const CandidatesList = styled.div`
  min-height: 160px;
  padding: 20px 15px;
  border-radius: 6px;
  background: ${({ theme }) => theme.listBg};

  & .hoveredCandidate {
    transition: transform 0.15s;
    transform: translateY(120px);

    & ~ ${CandidateItemContainer} {
      transition: transform 0.15s;
      transform: translateY(120px);
    }
  }
`;

export const ColumnContainer = styled.div<{ color: string }>`
  flex-basis: 90%;
  min-width: 200px;
  margin: 0 12px;
  height: 98%;
  border-radius: 6px;
  padding-bottom: 30px;
  overflow: hidden;

  @media(max-width: 1400px){
    margin: 0 6px;
  }

  @media(max-width: 1000px){
    margin: 0 12px;
  }

  ${CandidateItemContainer}{
      border-left: 2px solid  ${({ color }) => color};
      border-color: ${({ color }) => color};
    }
  }
`;
