import styled from 'styled-components';
import { HEADER_HEIGHT } from '../../../../constants/globalStyles';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  border-bottom: 1px solid ${({ theme }) => theme.mainBorder};
  padding: 0 30px;
  
  @media(max-width: 767px){
    padding: 10px 15px;
  }
`;

export const Heading = styled.span`
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: 600;

  @media(max-width: 1300px){
    font-size: 18px;
  }

  @media(max-width: 767px){
    display: none;
  }
`;

export const AddCandidateBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  font-family: inherit;
  font-weight: 600;
  line-height: 13px;
  font-size: 13px;
  color: #fff;
  background: ${({ theme }) => theme.mainBlue};
  box-shadow: ${({ theme }) => `${theme.mainBlue}80`} 0 4px 12px 0;
  padding: 0 20px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  
  @media(max-width: 1000px){
    font-size: 0;
  }

  svg {
    margin: 0 6px 0 0;
    height: 19px;
    width: 19px;
    @media(max-width: 1000px){
      margin: 0;
    }
  }
`;
