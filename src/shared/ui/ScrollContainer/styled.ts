import styled from "styled-components";

export const StyledScrollContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

export const ScrollWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  scrollbar-width: none;
  border-radius: 6px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CustomScrollBtn = styled.div`
  position: absolute;
  top: 0;
  right: 4px;
  width: 6px;
  background: ${({ theme }) => theme.scrollBtn};
  border-radius: 10px;
  cursor: pointer;
`;
