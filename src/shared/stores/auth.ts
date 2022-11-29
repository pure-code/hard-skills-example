import { action, makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { login, registerUser } from "shared/api";
import NotificationStore from "./notification";

class Auth {
  constructor() {
    makeAutoObservable(this);
  }

  isAuthorized = !!localStorage.getItem("api_token");

  @action login = (token: string): void => {
    NotificationStore.pushToNotificationsList({ description: "Успешный вход" });
    localStorage.setItem("api_token", token);
    this.setIsAuthorized(true);
  };

  @action logout = () => {
    this.setIsAuthorized(false);
    localStorage.removeItem("api_token");
  };

  @action setIsAuthorized = (state: boolean) => {
    this.isAuthorized = state;
  };

  @action createGuestAccount = () => {
    const userEmail = `${uuidv4()}@example.com`;
    const firstName = "Anonymous";
    const password = uuidv4();
    registerUser(userEmail, firstName, password).then(() => {
      NotificationStore.pushToNotificationsList({
        description: "Аккаунт создан",
      });
      login(userEmail, password).then(({ access_token: token }) => {
        this.login(token);
      });
    });
  };
}

export default new Auth();
