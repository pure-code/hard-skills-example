import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 400px;
  font-size: 22px;
  font-weight: bold;
  min-height: 200px;
  background: ${({ theme }) => theme.mainBg};
  margin: 50px 0 0 0;
  padding: 20px;
  border-radius: 6px;
`;

export const Confirm = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.mainRed};
  color: #fff;
  border: 1px solid transparent;
  border-radius: 6px;
  margin: 0 15px;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  height: 44px;
  padding: 0 40px;
  outline: none;
`;

export const Cancel = styled(Confirm)`
  background: ${({ theme }) => (theme.dark ? theme.cardBg : theme.listBg)};
  color: inherit;
  font-weight: 400;
`;

export const ButtonsWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0 0 0;
`;
