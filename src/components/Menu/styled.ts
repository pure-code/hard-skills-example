import styled from "styled-components";
import { Link } from "react-router-dom";

export const MenuContainer = styled.aside`
  display: flex;
  padding: 0 20px;
`;

export const MenuLink = styled(Link)<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ selected }) =>
    selected ? "lightgreen" : "rgba(255,255,255,.8)"};
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
  margin: 0 0 0 20px;
  padding: 0 15px;
  text-decoration: none;
`;
