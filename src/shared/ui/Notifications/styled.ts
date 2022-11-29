import styled from "styled-components";
import { NOTIFICATION_TRANSITION_TIME_MS } from "shared/constants/globalStyles";

export const NotificationContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 99999;
`;

export const NotificationItem = styled.div<{ error?: boolean }>`
  display: flex;
  align-items: center;
  min-width: 300px;
  max-width: 360px;
  min-height: 70px;
  border-radius: 6px;
  color: #fff;
  padding: 12px 15px;
  background: ${({ theme, error }) =>
    error ? theme.mainRed : theme.notificationGreen};
  box-shadow: 0 4px 22px 0
    ${({ theme }) => (theme.dark ? "#1c1c20" : "#4c4c4c")};
  margin: 0 0 20px 0;

  svg {
    width: auto;
    height: 20px;
  }

  &.notification-enter {
    transform: translateX(calc(100% + 20px));
  }

  &.notification-enter-active {
    transform: translateX(0);
    transition: ${`${NOTIFICATION_TRANSITION_TIME_MS}ms`};
  }

  &.notification-exit {
    margin-top: 0;
    opacity: 1;
    transition: ${`${NOTIFICATION_TRANSITION_TIME_MS}ms`};
  }

  &.notification-exit-active {
    opacity: 0;
    margin-top: -70px;
    transition: ${`${NOTIFICATION_TRANSITION_TIME_MS}ms`};
  }
`;

export const Description = styled.span`
  display: block;
  font-size: 15px;
  margin: 0 0 0 14px;
`;
