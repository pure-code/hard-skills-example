import styled from "styled-components";

export const BoardContainer = styled.div`
  display: flex;
  background: ${({ theme }) => theme.mainBg};
  color: ${({ theme }) => theme.mainFont};

  @media (max-width: 1200px) {
    display: block;
  }
`;
