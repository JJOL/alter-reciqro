import { AuthService } from './auth.service';
import { LoginSession } from '../models/login-session';

const fakeUsers = [
  {
    username: 'jjol',
    password: 'Machango12',
    name: 'Juan Jo',
    userId: 'u1',
    role: 'Ciud'
  },
  {
    username: 'et4n',
    password: 'F0rnite',
    name: 'Etan',
    userId: 'u2',
    role: 'Admin'
  },
];
/*
function findUser(userSet: any[], username: string, password: string) {
  return userSet.find(user => {
    return user.username == username && user.password == password;
  });
}*/

export class AuthMemoryService  {
/*
    private loggedUser: LoginSession;

    constructor() {
      this.loggedUser = this.makeClearLoginSesion();
    }

    login(username: string, password: string) {
      const userFound = findUser(fakeUsers, username, password);
      if (userFound) {
        this.loggedUser = {
          isUserLogged: true,
          userLoggedId:  userFound.userId,
          userLoggedRole: userFound.role,
          userLoggedTime: new Date(),
          userLoggedToken: 'token-' + userFound.userId
        };

        return true;
      }

      return false;
    }
    logout() {
      this.loggedUser = this.makeClearLoginSesion();
    }

    getLoggedSession(): LoginSession {
      return {...this.loggedUser};
    }

    private makeClearLoginSesion(): LoginSession {
      return {
        isUserLogged: false,
        userLoggedId: '',
        userLoggedRole: '',
        userLoggedTime: new Date(),
        userLoggedToken: ''
      };
    }*/

}
