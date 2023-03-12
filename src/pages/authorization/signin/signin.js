import styles from "./signin.scss";
import Handlebars from 'handlebars';

const authorization =`
    <div class="signin-box">
      <div class="signin-box--content">
        <h2 class="title">Регистрация</h2>
        <form action="" class="authorization">
        {{#each characters}}
            <div class="{{name}}">
              <label for="{{name}}">{{title}}</label>
              <input id="{{name}}" type="{{type}}" name="{{name}}">
            </div>
        {{/each}}
        </form>
        <div class="box--buttons">
          <a href="main" class="button">Зарегистрироваться</a>
          <a href="login.html/" class="link">Войти</a>
        </div>
      </div>
    </div>`;

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