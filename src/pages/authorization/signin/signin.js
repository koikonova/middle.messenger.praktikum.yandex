import styles from "./signin.scss";
import Handlebars from 'handlebars';

const authorization =`
    <main class="signin-box">
      <div class="signin-box--content">
        <h2 class="title">Регистрация</h2>
        <form action="/main" class="authorization">
            {{#each characters}}
                <div class="{{name}}">
                  <label for="{{name}}">{{title}}</label>
                  <input id="{{name}}" type="{{type}}" name="{{name}}">
                </div>
            {{/each}}
            <button class="button" type="submit">Зарегистрироваться</button>
        </form>
        <button class="link" onClick="location.href='/'">Войти</button>
      </div>
    </main>`;

const date = {
'characters': [
    {
        name: 'email',
        type: 'email',
        title: 'Почта'
    },
    {
        name: 'login',
        type: 'text',
        title: 'Логин'
    },
    {
        name: 'first_name',
        type: 'text',
        title: 'Имя'
    },
    {
        name: 'second_name',
        type: 'text',
        title: 'Фамилия'
    },
    {
        name: 'phone',
        type: 'tel',
        title: 'Телефон'
    },
    {
        name: 'password',
        type: 'password',
        title: 'Пароль'
    },
    {
        name: 'password',
        type: 'password',
        title: 'Пароль (ещё раз)'
    }
]};

const signin = () => {
    return Handlebars.compile(authorization)(date);
};

export default signin;
