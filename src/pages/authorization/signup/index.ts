import './style.scss';
import {Block} from "../../../utils/Block";
import {Button} from "../../../components/Button";
import {LabelInput} from "../../../components/LabelInput";
import {withStore} from "../../../utils/Store";
import {SignupData} from "../../../utils/Types";
import {authController} from "../../../controllers/AuthController";
import {router} from "../../../utils/Router";

const signupTpl =
  ` <div class="signup-box--content">
        <h2 class="title">Регистрация</h2>
        <form class="authorization">
            {{{email}}}
            {{{login}}}
            {{{first_name}}}
            {{{second_name}}}
            {{{phone}}}
            {{{password}}}
            {{{repeatPassword}}}
            {{{formButton}}}
        </form>
        {{{link}}}
      </div>`;

export class Signup extends Block{
    constructor(props) {
        super('main', props);
    }

    _init() {
        this.element!.classList.add('signup-box');
        this.children.email = new LabelInput({
            name: 'email',
            type: 'email',
            labelTitle: 'Почта',
            labelInputClassName: 'labelInputSignup',
            bottomError: 'bottomErrorAuthorization',
        });
        this.children.login = new LabelInput({
            name: 'login',
            type: 'text',
            labelTitle: 'Логин',
            labelInputClassName: 'labelInputSignup',
            bottomError: 'bottomErrorAuthorization',
        });
        this.children.first_name = new LabelInput({
            name: 'first_name',
            type: 'text',
            labelTitle: 'Имя',
            labelInputClassName: 'labelInputSignup',
            bottomError: 'bottomErrorAuthorization',
        });
        this.children.second_name = new LabelInput({
            name: 'second_name',
            type: 'text',
            labelTitle: 'Фамилия',
            labelInputClassName: 'labelInputSignup',
            bottomError: 'bottomErrorAuthorization',
        });
        this.children.phone = new LabelInput({
            name: 'phone',
            type: 'tel',
            labelTitle: 'Телефон',
            labelInputClassName: 'labelInputSignup',
            bottomError: 'bottomErrorAuthorization',
        });
        this.children.password = new LabelInput({
            name: 'password',
            type: 'password',
            labelTitle: 'Пароль',
            labelInputClassName: 'labelInputSignup',
            bottomError: 'bottomErrorAuthorization',
        });
        this.children.repeatPassword = new LabelInput({
            name: 'repeatPassword',
            type: 'password',
            labelTitle: 'Пароль (ещё раз)',
            labelInputClassName: 'labelInputSignup',
            bottomError: 'bottomErrorAuthorization',
        });
        this.children.formButton = new Button({
            buttonTitle: 'Зарегистрироваться',
            buttonClassName: 'button',
            buttonType: 'button',
            events: {
                click: () => this.onSubmit(),
            },
        });
        this.children.link = new Button({
            buttonTitle: 'Войти',
            buttonClassName: 'link',
            events: {
                click: () => {
                    router.go('/');
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

    getValue(selector) {
        return document.querySelector(selector).value;
    }

    onSubmit() {
        const inputs = document.querySelectorAll('input');
        const data: Record<string, unknown> = {};
        Array.from(inputs).forEach((input) => {
            if (this.sanitizeInput(input.value)){
                data[input.name] = input.value;
            }
        });

        const password = this.getValue('#password');
        const repeatPassword = this.getValue('#repeatPassword');
        if (password === repeatPassword){
            authController.signup(data as SignupData);
        }
    }

    render(): string {
        return this.compile(signupTpl, this.props);
    }
}

const withUser = withStore((state) => ({ ...state.user }));

export const SignupPage = withUser(Signup);
