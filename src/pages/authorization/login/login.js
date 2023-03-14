import styles from "./login.scss";
import Handlebars from 'handlebars';

const authorization =
    `<main class="login-box">
      <div class="login-box--content">
        <h2 class="title">Вход</h2>
        <form action="/main" class="authorization">
            {{#each characters}}
                <div class="{{name}}">
                  <label for="{{name}}">{{title}}</label>
                  <input id="{{name}}" type="{{type}}" name="{{name}}">
                </div>
            {{/each}}
            <button class="button" type="submit">Войти</button>
        </form>
        <button class="link" onClick="location.href='/signin'">Нет аккаунта?</button>
      </div>
    </main>`;

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
