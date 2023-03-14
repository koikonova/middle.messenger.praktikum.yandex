import styles from "./main.scss";
import Handlebars from 'handlebars';

const content = `
    <div class="back">
      <button class="button-back" onClick="location.href='/main'"></button>
    </div>
    <main class="profile-box">
      <div class="avatar"></div>
      <h3 class="chat-name">Иван</h3>
      <form action="" class="profile">
        {{#each characters}}
            <div class="{{name}}">
              <label for="{{name}}">{{title}}</label>
              <input id="{{name}}" type="{{type}}" name="{{name}}" value="{{value}}" disabled="disabled">
            </div>
            {{{separatory}}}
        {{/each}}
      </form>
      <div class="profile-box--buttons">
        <button class="link change-date">Изменить данные</button>
        <hr class="separatory-line">
        <button class="link change-password" onClick="location.href='/changePassword'">Изменить пароль</button>
        <hr class="separatory-line">
        <button class="link signout" onClick="location.href='/'">Выйти</button>
      </div>
    </main>`;

const date = {
'characters': [
    {
        name: 'email',
        type: 'email',
        title: 'Почта',
        value: 'pochta@yandex.ru',
        separatory: `<hr class="separatory-line">`
    },
    {
        name: 'login',
        type: 'text',
        title: 'Логин',
        value: 'ivanivanov',
        separatory: `<hr class="separatory-line">`
    },
    {
        name: 'first_name',
        type: 'text',
        title: 'Имя',
        value: 'Иван',
        separatory: `<hr class="separatory-line">`
    },
    {
        name: 'second_name',
        type: 'text',
        title: 'Фамилия',
        value: 'Иванов',
        separatory: `<hr class="separatory-line">`
    },
    {
        name: 'display_name',
        type: 'text',
        title: 'Имя в чате',
        value: 'Иван',
        separatory: `<hr class="separatory-line">`
    },
    {
        name: 'phone',
        type: 'tel',
        title: 'Телефон',
        value: '+7 (909) 967 30 30',
        separatory: ''
    }
]};

const profile = () => {
    return Handlebars.compile(content)(date);
};

export default profile;
