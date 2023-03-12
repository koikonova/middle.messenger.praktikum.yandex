import styles from "./change-password.scss";
import Handlebars from 'handlebars';

const content = `
    <div class="back">
      <a href="main" class="button-back"></a>
    </div>
    <div class="profile-box">
      <div class="avatar"></div>
      <h3 class="chat-name">Иван</h3>
      <form action="">
        {{#each characters}}
            <div class="{{name}}">
              <label for="{{name}}">{{title}}</label>
              <input id="{{name}}" type="password" name="{{name}}" value="{{value}}">
            </div>
            {{{separatory}}}
        {{/each}}
      </form>
      <div class="change-password-box--buttons">
        <a href="profile" class="button">Сохранить</a>
      </div>
    </div>`;

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