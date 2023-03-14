import error404 from '../error/error404';
import error500 from '../error/error500';
import main from '../pages/main/main';
import changePassword from '../pages/profile/change-password/change-password';
import profile from '../pages/profile/main/main';
import login from '../pages/authorization/login/login';
import signin from '../pages/authorization/signin/signin';

const Content = () => {
    switch (window.location.pathname){
        case '/signin':
            return signin();
        case '/profile':
            return profile();
        case '/changePassword':
            return changePassword();
        case '/main':
            return main();
        case '/error404':
            return error404();
        case '/error500':
            return error500();
        default:
            return login();
    }
};

export default Content;
