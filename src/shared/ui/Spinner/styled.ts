import styled, { keyframes } from "styled-components";

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Spin = styled.div`
  animation: ${rotate} 2s linear infinite backwards;
  width: 40px;
  height: 40px;

  svg {
    width: 100%;
    height: 100%;
  }
`;
