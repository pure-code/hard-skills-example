import styled, { css } from "styled-components";

const fieldStyles = css<{ error: boolean }>`
  background: ${({ theme }) => (theme.dark ? "#35353a" : theme.listBg)};
  border-radius: 6px;
  padding: 0 20px;
  color: inherit;
  outline: none;
  transition: 0.1s;
  border: ${({ theme, error }) =>
    `2px solid ${error ? theme.mainRed : "transparent"}`};

  &::placeholder {
    font-size: 14px;
  }

  &:focus {
    border-color: ${({ theme, error }) =>
      error ? theme.mainRed : theme.mainBlue};
    box-shadow: ${({ error }) =>
        error ? "transparent" : "rgba(116, 135, 235, 0.5)"}
      0 4px 12px 0;
  }
`;

export const FieldContainer = styled.input<{ error: boolean }>`
  ${fieldStyles};
  width: 100%;
  height: 40px;
  margin: 0 0 20px 0;
`;

export const CommentField = styled.textarea<{ error: boolean }>`
  ${fieldStyles};
  height: 100px;
  resize: none;
  margin: 0 0 30px 0;
  padding: 15px 20px;
`;
