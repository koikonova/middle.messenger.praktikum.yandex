import { AuthAPI } from "../api/AuthAPI";
import router from "../utils/Router";
import {store} from "../utils/Store";
import {ControllerSignUp, SignupData, SigninData} from "../utils/Types";

class AuthController {
    private api: AuthAPI;

    constructor() {
        this.api = new AuthAPI();
    }

    async signUp(data: SignupData) {
      // if (data.confirm_password !== data.password){
      //   store.set('user.error', 'Пароли не совпадают');
      //
      //   return;
      // }
      // eslint-disable-next-line no-unused-vars
      // const {confirm_password, ...signupData}  = data;
      //
      // store.set('user.isLoading', true);

      this.api.signUp(data)
        .then(() => {
            this.fetchUser();
            router.go('/profile');
        })
        .catch(() => {
            store.set('user.error', 'error');
            console.log('signup error')
            // store.set('user.isLoading', false);
        });

        // this.fetchUser();
      // try {
      //   await this.api.signUp(data);
      //
      //   await this.fetchUser();
      //   store.set('user.error', null);
      //   router.go('/profile');
      // } catch (e){
      //   store.set('user.error', e);
      //   console.log(e);
      // }
    }

    signIn(data: SigninData) {
        this.api.singIn(data)
          .then(() => {
            this.fetchUser();
            router.go('/profile');
          })
          .catch(() => {
            store.set('user.error', 'error');
            console.log('signin error')
            // store.set('user.isLoading', false);
          });
    }

    logout() {
        this.api.logout()
          .then(() => {
              router.go('/signin');
          })
          .catch(() => {
            store.set('user.error', 'error');
            console.log('logout error')
            // store.set('user.isLoading', false);
          });
    }

   fetchUser() {
     return this.api.read()
       .then ((user) => {
         store.set('user', user)
       })
    }
}

export default new AuthController();