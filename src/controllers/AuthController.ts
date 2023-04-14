import { AuthAPI, SigninData, SignupData } from "../api/AuthAPI";
import {Router} from "../utils/Router";
import {store} from "../utils/Store";

class AuthController {
    private api: AuthAPI;

    constructor() {
        this.api = new AuthAPI();
    }

    signUp(data: SignupData) {
        this.api.signUp(data)
          .then(() => {
              const router = new Router();
              router.go('/profile');
          })
          .catch(console.log);

        this.fetchUser();
    }

    signIn(data: SigninData) {
        this.api.singIn(data)
          .then(() => {
              const router = new Router();
              router.go('/profile');
          })
          .catch(console.log);
    }

    logout() {
        this.api.logout()
          .then(() => {
              const router = new Router();
              router.go('/signin');
          })
          .catch(console.log);
    }

    fetchUser() {
       return this.api.getUser()
            .then((user) => {
                store.set('user.data', user)
            })
            // .catch(() => {
            //     store.set('user.hasError', true)
            // });
    }
}

export default new AuthController();