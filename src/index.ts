import '../static/style.scss';
import {Login} from "./pages/authorization/login";
import {SignupPage} from "./pages/authorization/signup";
import {ProfileInfoPage} from "./pages/profile/profileInfo";
import Router from "./utils/Router";
import authController from "./controllers/AuthController";

document.addEventListener('DOMContentLoaded', async () => {
 Router
    .use('/signup', SignupPage)
    .use('/profile', ProfileInfoPage);

  let isProtectedRoute = true;

  switch (window.location.pathname) {

    case '/':
    case '/signup':
      isProtectedRoute = false;
      break;
  }

  try {
    await authController.fetchUser();
    Router.start();
    if (!isProtectedRoute) {
      Router.go(Router.go('/profile'));
    }
  } catch (e) {
    Router.start();
    if (isProtectedRoute) {
      Router.go( Router.go('/signup'));
    }
    console.log(e);
    console.log('router error')
  }
});
