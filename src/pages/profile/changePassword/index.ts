import './style.scss';
import {Block} from "../../../utils/Block";
import {Back} from "../../../components/Back";
import {Button} from "../../../components/Button";
import {LabelInput} from "../../../components/LabelInput";

const changePasswordTpl = `
    {{{buttonBack}}}
    <main class="profile-box">
      <div class="avatar"></div>
      <h3 class="chat-name">Иван</h3>
      <form action="/profile">
        {{{oldPassword}}}
        <hr class="separatory-line">
        {{{newPassword}}}
        <hr class="separatory-line">
        {{{repeatPassword}}}
        {{{formButton}}}
      </form>
    </main>`;

export class ChangePassword extends Block{
    constructor(props) {
        super('div', props);
    }

    _init() {
        this.children.buttonBack = new Back({});
        this.children.oldPassword = new LabelInput({
            name: 'oldPassword',
            labelInputClassName: 'profileInput',
            type: 'password',
            labelTitle: 'Старый пароль',
            value: '1111',
        });
        this.children.newPassword = new LabelInput({
            name: 'newPassword',
            labelInputClassName: 'profileInput',
            type: 'password',
            labelTitle: 'Новый пароль',
        });
        this.children.repeatPassword = new LabelInput({
            name: 'repeatNewPassword',
            labelInputClassName: 'profileInput',
            type: 'password',
            labelTitle: 'Повторите новый пароль',
        });
        this.children.formButton = new Button({
            buttonTitle: 'Сохранить',
            buttonClassName: 'button',
            buttonType: 'button',
            events: {
                click: () => {
                    console.log('/profile');
                }
            },
            buttonHref: '/profile'
        });
    }

    render(): string {
        return this.compile(changePasswordTpl, this.props);
    }
}
