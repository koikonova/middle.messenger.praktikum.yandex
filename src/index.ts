import {authController} from "./controllers/AuthController";
import {SignupPage} from "./pages/authorization/signup";
import {SigninPage} from "./pages/authorization/signin";
import {ProfileInfoPage} from "./pages/profile/profileInfo";
import {ChangePasswordPage} from "./pages/profile/changePassword";
import {Main} from "./pages/main";
import {router} from "./utils/Router";

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use('/', SigninPage)
    .use('/sign-up', SignupPage)
    .use('/settings', ProfileInfoPage)
    .use('/settings/password', ChangePasswordPage)
    .use('/messenger', Main)

  let isProtectedRoute = true

  switch (window.location.pathname) {
    case '/':
    case '/sign-up':
      isProtectedRoute = false;
      break;
  }

  try {
    await authController.fetchUser()
    router.start()
    if (isProtectedRoute) {
      router.go('/messenger')
    }
  } catch (e) {
    router.start()
    if (!isProtectedRoute) {
      router.go('/')
    }
  }
})
