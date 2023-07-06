import { action, makeAutoObservable } from "mobx";
import { NotificationItemType } from "shared/ui/Notifications";

class Notification {
  constructor() {
    makeAutoObservable(this);
  }

  notificationsList: NotificationItemType[] = [];

  @action pushToNotificationsList = (
    notification: NotificationItemType
  ): void => {
    this.notificationsList = [...this.notificationsList, notification];
  };

  @action removeOldFromNotificationsList = (): void => {
    this.notificationsList.shift();
  };
}

export default new Notification();
