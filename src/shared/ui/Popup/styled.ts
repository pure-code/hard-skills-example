import styled from "styled-components";

export const Content = styled.div`
  position: relative;
  z-index: 9;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 50px 0 0 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.6);
  overflow-y: auto;
  backdrop-filter: blur(4px);

  &.popup-enter {
    opacity: 0;

    ${Content} {
      transform: scale(0.6);
      transition: opacity 0.2s;
    }
  }

  &.popup-enter-active {
    opacity: 1;
    transition: 0.2s;

    ${Content} {
      transform: scale(1);
      transition: 0.2s;
    }
  }

  &.popup-exit {
    opacity: 1;
    transition: opacity 0.2s;

    ${Content} {
      transform: scale(1);
      transition: 0.2s;
    }
  }

  &.popup-exit-active {
    opacity: 0;
    transition: 0.2s;

    ${Content} {
      transform: scale(0.6);
      transition: 0.2s;
    }
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  cursor: default;
`;
