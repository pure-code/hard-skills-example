import { makeAutoObservable } from 'mobx';

class Auth {
  constructor() {
    makeAutoObservable(this);
  }

  isAuthorized = true;
}

export default new Auth();
