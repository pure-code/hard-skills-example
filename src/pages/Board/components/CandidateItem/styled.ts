import styled from "styled-components";
import { Link } from "react-router-dom";

export const CandidateItemContainer = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  min-height: 110px;
  margin: 0 0 14px 0;
  background: ${({ theme }) => theme.cardBg};
  cursor: pointer;
  user-select: none;
  padding: 14px 0 4px 15px;
  border-radius: 6px;
  color: inherit;
  text-decoration: none;

  @media (max-width: 1300px) {
    min-height: 90px;
    padding: 10px 0 4px 10px;
  }

  &.moved {
    cursor: grabbing;
  }

  &:active {
    border: 1px solid;
  }

  &:focus {
    border: 1px solid;
  }
`;

export const MoreBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 50px;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  i {
    display: block;
    width: 4px;
    height: 4px;
    background: ${({ theme }) => theme.mainFont};
    border-radius: 50%;
    margin: 0 0 2px 0;
  }
`;

export const Name = styled.span`
  display: block;
  font-size: 16px;

  @media (max-width: 1300px) {
    font-size: 14px;
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
`;

export const Grade = styled.span`
  display: flex;
  font-size: 14px;
  font-weight: 600;
  opacity: 0.7;
  margin: 6px 0 0 0;

  @media (max-width: 1300px) {
    font-size: 12px;
    margin: 2px 0 0 0;
  }
`;
