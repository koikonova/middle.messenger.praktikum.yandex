import './style.scss';
import {Block} from "../../../utils/Block";
import {Back} from "../../../components/Back";
import {Button} from "../../../components/Button";
import {LabelInput} from "../../../components/LabelInput";

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
            type: 'email',
            labelTitle: 'Почта',
            placeholder: 'pochta@yandex.ru',
        });
        this.children.login = new LabelInput({
            name: 'login',
            type: 'text',
            labelTitle: 'Логин',
            placeholder: 'ivanivanov',
        });
        this.children.first_name = new LabelInput({
            name: 'first_name',
            type: 'text',
            labelTitle: 'Имя',
            placeholder: 'Иван',
        });
        this.children.second_name = new LabelInput({
            name: 'second_name',
            type: 'text',
            labelTitle: 'Фамилия',
            placeholder: 'Иванов',
        });
        this.children.display_name = new LabelInput({
            name: 'display_name',
            type: 'text',
            labelTitle: 'Имя в чате',
            placeholder: 'Иван',
        });
        this.children.phone = new LabelInput({
            name: 'phone',
            type: 'tel',
            labelTitle: 'Телефон',
            placeholder: '+7 (909) 967 30 30',
        });
        this.children.changeDate = new Button({
            buttonTitle: 'Изменить данные',
            buttonClassName: 'link',
            buttonClassNameSpecial: 'change-date',
            buttonEvents: {
                click: () => {
                    console.log('change-date');
                }
            },
        });
        this.children.changePassword = new Button({
            buttonTitle: 'Изменить пароль',
            buttonClassName: 'link',
            buttonClassNameSpecial: 'change-password',
            buttonEvents: {
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
            buttonEvents: {
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
