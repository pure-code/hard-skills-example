import styled from "styled-components";

export const SearchContainer = styled.input`
  width: 320px;
  height: 34px;
  background: ${({ theme }) => (theme.dark ? "#35353a" : theme.listBg)};
  border-radius: 20px;
  padding: 0 20px;
  margin: 0 auto 0 30px;
  color: inherit;
  outline: none;
  transition: 0.1s;
  border: 2px solid transparent;

  @media (max-width: 1000px) {
    width: 160px;
    margin: 0 auto 0 10px;
  }

  &::placeholder {
    font-size: 14px;
  }

  &:focus {
    border-color: ${({ theme }) => theme.mainBlue};
    box-shadow: rgba(116, 135, 235, 0.5) 0 4px 12px 0;
  }
`;
