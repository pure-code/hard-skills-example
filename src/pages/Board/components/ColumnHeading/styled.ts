import styled from "styled-components";

export const ColumnHeadingContainer = styled.span<{ color: string }>`
  display: flex;
  align-items: center;
  height: 34px;
  padding: 0 15px;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  background: ${({ color }) => color};
  border-radius: 6px;
  margin: 0 0 16px 0;

  @media (max-width: 1000px) {
    font-size: 13px;
    padding: 0 6px;
  }

  span {
    margin: 0 0 0 6px;
  }

  svg {
    height: 16px;
    margin: 0 8px 0 0;

    @media (max-width: 1000px) {
      height: 14px;
      margin: 0 4px 0 0;
    }
  }
`;
