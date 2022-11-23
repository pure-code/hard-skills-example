import styled from "styled-components";

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 16px 0 0 0;
`;

export const TagItem = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  min-width: 30px;
  margin: 0 10px 10px 0;
  padding: 0 6px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.mainFont};
  opacity: 0.6;

  @media (max-width: 1300px) {
    font-size: 10px;
    margin: 0 6px 6px 0;
    padding: 0 4px;
  }
`;
