import './style.scss';
import {Login} from "../src/pages/authorization/login";
import {Signin} from "../src/pages/authorization/signin";
import {Main} from "../src/pages/main";
import {ProfileInfo} from "../src/pages/profile/profileInfo";
import {ChangePassword} from "../src/pages/profile/changePassword";
import {Error404} from "../src/error/error404";
import {Error500} from "../src/error/error500";

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('.root');
  const login = new Login( {});
  const signin = new Signin( {});
  const main = new Main( {});
  const profileInfo = new ProfileInfo( {});
  const changePassword = new ChangePassword( {});
  const error404 = new Error404( {});
  const error500 = new Error500( {});

  switch (window.location.pathname){
    case '/signin':
      root.appendChild(signin.element);
      signin.dispatchComponentDidMoun();
      return;
    case '/profile':
      root.appendChild(profileInfo.element);
      profileInfo.dispatchComponentDidMoun();
      return;
    case '/changePassword':
      root.appendChild(changePassword.element);
      changePassword.dispatchComponentDidMoun();
      return;
    case '/main':
      root.appendChild(main.element);
      main.dispatchComponentDidMoun();
      return;
    case '/error404':
      root.appendChild(error404.element);
      error404.dispatchComponentDidMoun();
      return;
    case '/error500':
      root.appendChild(error500.element);
      error500.dispatchComponentDidMoun();
      return;
    default:
      root.appendChild(login.element);
      login.dispatchComponentDidMoun();
      return;
  }
})
