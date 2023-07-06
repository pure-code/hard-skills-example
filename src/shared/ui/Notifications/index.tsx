import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { CSSTransition } from "react-transition-group";
import { useStore } from "shared/lib/useStore";
import { NOTIFICATION_TRANSITION_TIME_MS } from "shared/constants/globalStyles";
import { ReactComponent as SuccessIcon } from "shared/ui/icons/success.svg";
import { ReactComponent as ErrorIcon } from "shared/ui/icons/fail.svg";

import { NotificationContainer, NotificationItem, Description } from "./styled";

export interface NotificationItemType {
  description: string;
  error?: boolean;
}

const Notifications = () => {
  const {
    notification: { notificationsList, removeOldFromNotificationsList },
  } = useStore();
  const [visibleNotificationsCount, setVisibleNotificationsCount] = useState<
    string[]
  >([]);

  useEffect(() => {
    if (notificationsList.length) {
      setVisibleNotificationsCount(
        notificationsList.map((el) => el.description)
      );
      setTimeout(() => {
        setVisibleNotificationsCount((prevState) => prevState.slice(1));
      }, 5000);
      setTimeout(() => {
        removeOldFromNotificationsList();
      }, 5000 + NOTIFICATION_TRANSITION_TIME_MS);
    }
  }, [notificationsList]);

  return (
    <NotificationContainer>
      {notificationsList.map(({ description, error }) => (
        <CSSTransition
          key={description}
          in={visibleNotificationsCount.includes(description)}
          timeout={NOTIFICATION_TRANSITION_TIME_MS}
          classNames="notification"
          unmountOnExit
        >
          <NotificationItem error={error}>
            {error ? <ErrorIcon /> : <SuccessIcon />}
            <Description>{description}</Description>
          </NotificationItem>
        </CSSTransition>
      ))}
    </NotificationContainer>
  );
};

export default observer(Notifications);
