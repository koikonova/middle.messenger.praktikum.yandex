import './style.scss';
import {Block} from "../../../utils/Block";
import {Back} from "../../../components/Back";
import {Button} from "../../../components/Button";
import {LabelInput} from "../../../components/LabelInput";
import {Avatar} from "../../../components/Avatar";
import {ChangeAvatar} from "../changeAvatar";
import {authController} from "../../../controllers/AuthController";
import {store, withStore} from "../../../utils/Store";
import {profileController} from "../../../controllers/ProfileController";
import {router} from "../../../utils/Router";
import {User} from "../../../utils/Types";

const profileInfoTpl = `
    {{{buttonBack}}}
    {{{changeAvatar}}}
    <main class="profile-box">
      {{{avatar}}}
      {{{chat_name}}}
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
        {{{logout}}}
      </div>
    </main>`;

const chatNameTpl = `{{name}}`;

interface ChatNameProps{
    name: string;
}

class ChatName extends Block{
    constructor(props: ChatNameProps) {
        super('h3', props);
    }

    _init() {
        this.element!.classList.add('chat-name');
    }

    render() {
        return this.compile(chatNameTpl, this.props);
    }
}

export class ProfileInfo extends Block{
    constructor(props: any) {
        super('div', props);
    }

    _init() {
        this.element!.classList.add('ProfileInfo');
        this.children.buttonBack = new Back({});
        this.children.changeAvatar = new ChangeAvatar({});
        this.children.avatar = new Avatar({
            src: `https://ya-praktikum.tech/api/v2/resources${store.getState().user.avatar}`,
            events: {
                click: (e) => this.changeAvatar(e),
            }
        })
        this.children.chat_name = new ChatName({name: this.props.first_name});
        this.children.email = new LabelInput({
            ...this.props,
            name: 'email',
            labelInputClassName: 'profileInput',
            type: 'email',
            labelTitle: 'Почта',
            value: this.props.email,
            bottomError: 'bottomErrorProfile',
        });
        this.children.login = new LabelInput({
            ...this.props,
            name: 'login',
            labelInputClassName: 'profileInput',
            type: 'text',
            labelTitle: 'Логин',
            value: this.props.login,
            bottomError: 'bottomErrorProfile',
        });
        this.children.first_name = new LabelInput({
            ...this.props,
            name: 'first_name',
            labelInputClassName: 'profileInput',
            type: 'text',
            labelTitle: 'Имя',
            value: this.props.first_name,
            bottomError: 'bottomErrorProfile',
        });
        this.children.second_name = new LabelInput({
            ...this.props,
            name: 'second_name',
            labelInputClassName: 'profileInput',
            type: 'text',
            labelTitle: 'Фамилия',
            value: this.props.second_name,
            bottomError: 'bottomErrorProfile',
        });
        this.children.display_name = new LabelInput({
            ...this.props,
            name: 'display_name',
            labelInputClassName: 'profileInput',
            type: 'text',
            labelTitle: 'Имя в чате',
            value: this.props.display_name,
            bottomError: 'bottomErrorProfile',
        });
        this.children.phone = new LabelInput({
            ...this.props,
            name: 'phone',
            labelInputClassName: 'profileInput',
            type: 'tel',
            labelTitle: 'Телефон',
            value: this.props.phone,
            bottomError: 'bottomErrorProfile',
        });
        this.children.changeDate = new Button({
            buttonTitle: 'Изменить данные',
            buttonClassName: 'link',
            buttonClassNameSpecial: 'change-date',
            events: {
                click: (e) => this.onClick(e),
            }
        });
        this.children.changePassword = new Button({
            buttonTitle: 'Изменить пароль',
            buttonClassName: 'link',
            buttonClassNameSpecial: 'change-password',
            events: {
                click: () => router.go('/settings/password'),
            }
        });
        this.children.logout = new Button({
            buttonTitle: 'Выйти',
            buttonClassName: 'link',
            buttonClassNameSpecial: 'logout',
            events: {
                click: () => {
                    authController.logout();
                }
            }
        });
    }

    changeAvatar(event: Event){
        event.preventDefault();
        const changeAvatarBox: HTMLDivElement | null = document.querySelector('.changeAvatarBoxBackground');
        if (changeAvatarBox !== null){
            changeAvatarBox.classList.remove('displayNone');
        }
    }

    sanitizeInput(input: any) {
        const scriptRegex = /<\s*[sS][^>]*>/;
        const linkRegex = /<a\b[^>]*>/gi;

        if (scriptRegex.test(input) || linkRegex.test(input)) {
            return false;
        } else {
            return true;
        }
    }

    onClick(event: Event) {
        event.preventDefault();
        const inputs = document.querySelectorAll('input');
        const data: Record<string, string> = {};
        Array.from(inputs).forEach((input) => {
            if (this.sanitizeInput(input.value)){
                data[input.name] = input.value;
            }
        });

        profileController.updateProfile(data);
    }

    componentDidUpdate(_oldProps: User, newProps: User): any {
        if (newProps){
            this.props = newProps;
        }
    }

    render() {
        return this.compile(profileInfoTpl, this.props);
    }
}

const withUser = withStore((state) => ({ ...state.user }));

export const ProfileInfoPage = withUser(ProfileInfo);
