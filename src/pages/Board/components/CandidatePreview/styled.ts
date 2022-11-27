import styled from "styled-components";

export const CandidatePreviewContainer = styled.div`
  display: flex;
  min-height: 300px;
  padding: 30px;
  background: ${({ theme }) => theme.mainBg};
  border-radius: 6px;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
    margin: 0 15px;
  }
`;

export const Info = styled.div`
  @media (max-width: 1000px) {
    margin: 20px 0 0 0;
  }
`;

export const Name = styled.span`
  display: block;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 10px 0;
  min-height: 32px;

  @media (max-width: 1000px) {
    font-size: 18px;
    margin: 0 0 4px 0;
  }
`;

export const Title = styled.span`
  display: block;
  min-height: 22px;
  max-width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  margin: 0 0 10px 0;

  @media (max-width: 1000px) {
    font-size: 14px;
    margin: 0 0 4px 0;
  }
`;

export const Comment = styled.span``;

export const ControlsWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 0 0;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.mainBorder};
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

export const Delete = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 40px;
  background: ${({ theme }) => theme.mainRed};
  color: #fff;
  font-weight: 600;
  border: none;
  outline: none;
  border-radius: 6px;
  margin: 0;
  cursor: pointer;
  padding: 0;

  svg {
    height: 20px;
    fill: #fff;
    margin: 0 10px 0 0;
  }
`;

export const Edit = styled(Delete)`
  width: 300px;
  background: ${({ theme }) => (theme.dark ? theme.cardBg : theme.listBg)};
  margin: 0 20px 0 0;
  color: inherit;
  @media (max-width: 767px) {
    margin: 0 0 30px 0;
  }
`;
