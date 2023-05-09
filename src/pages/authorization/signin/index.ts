import './style.scss';
import {Block} from "../../../utils/Block";
import {Button} from "../../../components/Button";
import {LabelInput} from "../../../components/LabelInput";
import {authController} from "../../../controllers/AuthController";
import {withStore} from "../../../utils/Store";
import {router} from "../../../utils/Router";

const signinTpl =
    ` <div class="signin-box--content">
        <h2 class="title">Вход</h2>
        <form class="authorization">
            {{{login}}}
            {{{password}}}
            {{{formButton}}}
        </form>
        {{{link}}}
      </div>`;

export class Signin extends Block{
    constructor(props) {
        super('main', props);
    }

    _init() {
        this.element!.classList.add('signin-box');
        this.children.login = new LabelInput({
            name: 'login',
            type: 'text',
            labelTitle: 'Логин',
            labelInputClassName: 'labelInputSignin',
            bottomError: 'bottomErrorAuthorization',
        });
        this.children.password = new LabelInput({
            name: 'password',
            type: 'password',
            labelTitle: 'Пароль',
            labelInputClassName: 'labelInputSignin',
            bottomError: 'bottomErrorAuthorization',
        });
        this.children.formButton = new Button({
            buttonTitle: 'Войти',
            buttonClassName: 'button',
            buttonType: 'button',
            events: {
                click: (e) => this.onClick(e),
            },
        });
        this.children.link = new Button({
            buttonTitle: 'Нет аккаунта?',
            buttonClassName: 'link',
            events: {
                click: () => {
                    router.go('/sign-up')
                }
            },
        });
    }

    sanitizeInput(input) {
        const scriptRegex = /<\s*[sS][^>]*>/;
        const linkRegex = /<a\b[^>]*>/gi;

        if (scriptRegex.test(input) || linkRegex.test(input)) {
            return false;
        } else {
            return true;
        }
    }

    onClick(event: Event) {
        event.preventDefault()
        const inputs = document.querySelectorAll('input');
        const data: Record<string, unknown> = {};
        Array.from(inputs).forEach((input) => {
            if (this.sanitizeInput(input.value)){
                data[input.name] = input.value;
            }
        });

        authController.signin(data);
    }

    render(): string {
        return this.compile(signinTpl, this.props);
    }
}

const withUser = withStore((state) => ({ ...state.user }));

export const SigninPage = withUser(Signin);
