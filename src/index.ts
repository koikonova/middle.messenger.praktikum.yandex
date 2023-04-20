// import { authController } from './controllers/auth-controller'
// import { LoginPage } from './pages/signin-page/signin'
// import { RegisterPage } from './pages/register-page/register'
// import { MessengerPage } from './pages/messenger-page/messenger'
// import { ProfilePage } from './pages/profile-page/profile'
// import { chatsController } from './controllers/chats-controller'
// import { Routes } from './types/routes'
// import { router } from './utils/router'

import {authController} from "./controllers/AuthController";
import {SignupPage} from "./pages/authorization/signup";
import {SigninPage} from "./pages/authorization/signin";
import {ProfileInfoPage} from "./pages/profile/profileInfo";
import {ChangePasswordPage} from "./pages/profile/changePassword";
import {MainPage} from "./pages/main";
import {router} from "./utils/Router";

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use('/', SigninPage)
    .use('/sign-up', SignupPage)
    .use('/settings', ProfileInfoPage)
    .use('/settings/password', ChangePasswordPage)
    .use('/messenger', MainPage)

  let isProtectedRoute = true

  switch (window.location.pathname) {
    case '/':
    case '/sign-up':
      isProtectedRoute = false
      break
    default: break
  }

  try {
    await authController.fetchUser()
    router.start()
    // await chatsController.fetchChats()
    if (!isProtectedRoute) {
      router.go('/messenger')
    }
  } catch (e) {
    router.start()
    if (isProtectedRoute) {
      router.go('/')
    }
  }
})
