import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
  border-radius: 6px;
  background: ${({ theme }) => theme.mainBg};
  padding: 30px 20px;
  margin: 30px 0;

  @media (max-width: 1000px) {
    width: calc(100% - 30px);
    margin: 30px 15px;
  }
`;

export const Heading = styled.span`
  display: block;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 30px 0;

  @media (max-width: 1000px) {
    font-size: 18px;
  }
`;

export const AddBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  color: #fff;
  font-weight: 600;
  border-radius: 6px;
  background: ${({ theme }) => theme.mainBlue};
  border: none;
  outline: none;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;
