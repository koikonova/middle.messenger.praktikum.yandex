import './style.scss';
import {Login} from "../src/pages/authorization/login";
import {Signin} from "../src/pages/authorization/signin";
import {ProfileInfoPage} from "../src/pages/profile/profileInfo";
import Router from "../src/utils/Router";
import authController from "../src/controllers/AuthController";

document.addEventListener('DOMContentLoaded', async () => {
  // const router = new Router();
  // const signin = new Signin();
  // const login = new Login();
  // const profileInfoPage = new ProfileInfoPage();

  Router
    .use('/signin', Signin)
    .use('/signup', Login)
    .use('/profile', ProfileInfoPage);


  try {
    await authController.fetchUser();
    Router.go('/profile');
  } catch (e) {
    console.log('Error', e);
    Router.go('/signin');
  }

  Router.start();
});