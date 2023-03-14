import styles from "./change-password.scss";
import Handlebars from 'handlebars';

const content = `
    <div class="back">
      <button class="button-back" onClick="location.href='/main'"></button>
    </div>
    <main class="profile-box">
      <div class="avatar"></div>
      <h3 class="chat-name">Иван</h3>
      <form action="/profile">
        {{#each characters}}
            <div class="{{name}}">
              <label for="{{name}}">{{title}}</label>
              <input id="{{name}}" type="password" name="{{name}}" value="{{value}}">
            </div>
            {{{separatory}}}
        {{/each}}
        <button class="button" type="submit">Сохранить</button>
      </form>
    </main>`;

const date = {
'characters': [
    {
        name: 'oldPassword',
        title: 'Старый пароль',
        value: '11111111',
        separatory: `<hr class="separatory-line">`
    },
    {
        name: 'newPassword',
        title: 'Новый пароль',
        value: '',
        separatory: `<hr class="separatory-line">`
    },
    {
        name: 'newPassword',
        title: 'Повторите новый пароль',
        value: '',
        separatory: ''
    }
]};

const changePassword = () => {
    return Handlebars.compile(content)(date);
};

export default changePassword;
