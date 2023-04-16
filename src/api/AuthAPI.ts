import BaseAPI from "./BaseAPI";
import {SigninData, SignupData, User} from "../utils/Types";

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signUp(data: SignupData): Promise<unknown> {
    return this.http.post('/signup', data);
  }

  singIn(data: SigninData): Promise<unknown> {
    return this.http.post('/signup', data);
  }

  logout(): Promise<unknown> {
    return this.http.post('/logout');
  }

  read(): Promise<User> {
    return this.http.get('/user');
  }

  create = undefined;
  update = undefined;
  delete = undefined;
}