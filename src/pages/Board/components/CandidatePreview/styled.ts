import styled from 'styled-components';

export const CandidatePreviewContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 30px;
  background: ${({ theme }) => theme.mainBg};
  border-radius: 6px;

  @media(max-width: 1000px){
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
    margin: 0 15px;
  }
`;

export const Avatar = styled.div`
  width: 260px;
  height: 260px;
  border-radius: 6px;
  overflow: hidden;

  @media(max-width: 1000px){
    width: 100%;
    height: 240px;
  }

  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Info = styled.div`
  margin: 0 0 0 30px;

  @media(max-width: 1000px){
    margin: 20px 0 0 0;
  }
`;

export const Name = styled.span`
  display: block;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 10px 0;

  @media(max-width: 1000px){
    font-size: 18px;
    margin: 0 0 4px 0;
  }
`;

export const Title = styled.span`
  display: block;
  font-size: 16px;
  margin: 0 0 10px 0;
  opacity: .8;

  @media(max-width: 1000px){
    font-size: 14px;
    margin: 0 0 4px 0;
  }
`;

export const Delete = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  height: 40px;
  background: ${({ theme }) => theme.mainRed};
  color: #fff;
  font-weight: 600;
  border: none;
  outline: none;
  border-radius: 6px;
  margin: 20px 0 0 0;
  cursor: pointer;
  
  svg{
    fill: #fff;
    margin: 0 10px 0 0;
  }
`;
