import styles from "./login.scss";
import Handlebars from 'handlebars';

const authorization =
    `<div class="login-box">
      <div class="login-box--content">
        <h2 class="title">Вход</h2>
        <form action="" class="authorization">
        {{#each characters}}
            <div class="{{name}}">
              <label for="{{name}}">{{title}}</label>
              <input id="{{name}}" type="{{type}}" name="{{name}}">
            </div>
        {{/each}}
        </form>
        <div class="box--buttons">
          <a href="main" class="button">Войти</a>
          <a href="signin" class="link">Нет аккаунта?</a>
        </div>
      </div>
    </div>`;

const date = {
'characters': [
    {
        name: 'login',
        type: 'text',
        title: 'Логин'
    },
    {
        name: 'password',
        type: 'password',
        title: 'Пароль'
    }
]};

const login = () => {
    return Handlebars.compile(authorization)(date);
};

export default login;