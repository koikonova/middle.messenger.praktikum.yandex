import './style.scss';
import {Block} from "../../../utils/Block";
import {Back} from "../../../components/Back";
import {Button} from "../../../components/Button";
import {LabelInput} from "../../../components/LabelInput";
import {formSubmit} from "../../../utils/InputEvents";

const profileInfoTpl = `
    {{{buttonBack}}}
    <main class="profile-box">
      <div class="avatar"></div>
      <h3 class="chat-name">Иван</h3>
      <form action="" class="profile">
        {{{email}}}
        <hr class="separatory-line">
        {{{login}}}
        <hr class="separatory-line">
        {{{first_name}}}
        <hr class="separatory-line">
        {{{second_name}}}
        <hr class="separatory-line">
        {{{display_name}}}
        <hr class="separatory-line">
        {{{phone}}}
      </form>
      <div class="profile-box--buttons">
        {{{changeDate}}}
        <hr class="separatory-line">
        {{{changePassword}}}
        <hr class="separatory-line">
        {{{signout}}}
      </div>
    </main>`;

export class ProfileInfo extends Block{
    constructor(props) {
        super('div', props);
    }

    _init() {
        this.children.buttonBack = new Back({});
        this.children.email = new LabelInput({
            name: 'email',
            labelInputClassName: 'profileInput',
            type: 'email',
            labelTitle: 'Почта',
            value: 'pochta@yandex.ru',
            bottomError: 'bottomErrorProfile',
        });
        this.children.login = new LabelInput({
            name: 'login',
            labelInputClassName: 'profileInput',
            type: 'text',
            labelTitle: 'Логин',
            value: 'ivanivanov',
            bottomError: 'bottomErrorProfile',
        });
        this.children.first_name = new LabelInput({
            name: 'first_name',
            labelInputClassName: 'profileInput',
            type: 'text',
            labelTitle: 'Имя',
            value: 'Иван',
            bottomError: 'bottomErrorProfile',
        });
        this.children.second_name = new LabelInput({
            name: 'second_name',
            labelInputClassName: 'profileInput',
            type: 'text',
            labelTitle: 'Фамилия',
            value: 'Иванов',
            bottomError: 'bottomErrorProfile',
        });
        this.children.display_name = new LabelInput({
            name: 'display_name',
            labelInputClassName: 'profileInput',
            type: 'text',
            labelTitle: 'Имя в чате',
            value: 'Иван',
            bottomError: 'bottomErrorProfile',
        });
        this.children.phone = new LabelInput({
            name: 'phone',
            labelInputClassName: 'profileInput',
            type: 'tel',
            labelTitle: 'Телефон',
            value: '+7 (909) 967 30 30',
            bottomError: 'bottomErrorProfile',
        });
        this.children.changeDate = new Button({
            buttonTitle: 'Изменить данные',
            buttonClassName: 'link',
            buttonClassNameSpecial: 'change-date',
            events: {
                click: formSubmit
            },
        });
        this.children.changePassword = new Button({
            buttonTitle: 'Изменить пароль',
            buttonClassName: 'link',
            buttonClassNameSpecial: 'change-password',
            events: {
                click: () => {
                    console.log('/changePassword');
                }
            },
            buttonHref: '/changePassword',
        });
        this.children.signout = new Button({
            buttonTitle: 'Выйти',
            buttonClassName: 'link',
            buttonClassNameSpecial: 'signout',
            events: {
                click: () => {
                    console.log('/');
                }
            },
            buttonHref: '/',
        });
    }

    render(): string {
        return this.compile(profileInfoTpl, this.props);
    }
}
