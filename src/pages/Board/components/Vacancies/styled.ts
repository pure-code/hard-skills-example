import styled from "styled-components";
import { Link } from "react-router-dom";
import { HEADER_HEIGHT } from "shared/constants/globalStyles";

export const VacanciesContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 13vw;
  max-width: 240px;
  height: 100vh;
  border-right: 1px solid ${({ theme }) => theme.mainBorder};

  @media (max-width: 1200px) {
    width: 100%;
    max-width: 100%;
    height: auto;
  }
`;

export const VacanciesHeader = styled.div`
  display: flex;
  align-items: center;
  height: ${HEADER_HEIGHT}px;
  padding: 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.mainBorder};
`;

export const AddVacancyWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 58px;
  padding: 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.mainBorder};

  span {
    font-size: 16px;
    font-weight: 600;
  }
`;

export const AddVacancyBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  background: ${({ theme }) => theme.mainBlue};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: #fff;
  font-weight: 600;
  font-size: 22px;
  padding: 0 1px 0 0;
`;

export const VacancyList = styled.div`
  @media (max-width: 1200px) {
    display: flex;
    border-bottom: 1px solid ${({ theme }) => theme.mainBorder};
    overflow-x: auto;
  }
`;

export const VacancyItem = styled(Link)<{ selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 11px 20px;
  text-decoration: none;
  color: inherit;
  height: 54px;
  font-weight: ${({ selected }) => (selected ? "600" : "400")};
  background: ${({ selected, theme }) => {
    if (selected) {
      return theme.dark ? theme.cardBg : theme.listBg;
    }
    return "none";
  }};
  border-right: ${({ selected, theme }) =>
    selected ? `3px solid ${theme.mainBlue}` : "none"};
  border-bottom: 1px solid ${({ theme }) => theme.mainBorder};

  &:hover {
    font-weight: 600;
  }

  @media (max-width: 1200px) {
    width: 200px;
    height: 44px;
    display: flex;
    align-items: center;
    border-right: none;
    border-left: ${({ selected, theme }) =>
      selected ? `3px solid ${theme.mainBlue}` : "none"};
  }
`;

export const VacancyTitle = styled.span`
  display: block;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 180px;

  @media (max-width: 1300px) {
    font-size: 13px;
  }
`;

export const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: none;
  margin: auto auto 40px;
  background: ${({ theme }) => theme.mainBlue};
  border-radius: 50%;
  cursor: pointer;
  padding: 0;

  @media (max-width: 1200px) {
    position: absolute;
    top: 16px;
    right: 20px;
    width: 36px;
    height: 36px;
  }

  svg {
    width: 34px;
    height: 34px;
    fill: #fff;

    @media (max-width: 1200px) {
      width: 22px;
      height: 22px;
    }
  }
`;
