import { action, makeAutoObservable } from "mobx";

class Theme {
  constructor() {
    makeAutoObservable(this);
  }

  isDarkTheme = true;

  @action toggleTheme = () => {
    document.body.classList.add("switchTheme");
    this.isDarkTheme = !this.isDarkTheme;
    setTimeout(() => {
      document.body.classList.remove("switchTheme");
    }, 200);
  };
}

export default new Theme();
