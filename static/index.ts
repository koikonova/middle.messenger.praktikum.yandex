import './style.scss';
import {Login} from "../src/pages/authorization/login";
import {Signin} from "../src/pages/authorization/signin";
import {ProfileInfoPage} from "../src/pages/profile/profileInfo";
import {Router} from "../src/utils/Router";
import authController from "../src/controllers/AuthController";

document.addEventListener('DOMContentLoaded', async () => {
  const router = new Router();
  // const signin = new Signin();
  // const login = new Login();
  // const profileInfoPage = new ProfileInfoPage();

  router
    .use('/signin', Signin)
    .use('/signup', Login)
    .use('/profile', ProfileInfoPage);


  try {
    await authController.fetchUser();
    router.go('/profile');
  } catch (e) {
    console.log('Error', e);
    router.go('/signin');
  }

  router.start();
});