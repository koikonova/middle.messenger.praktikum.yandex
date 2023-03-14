import styles from "./main.scss";
import Handlebars from 'handlebars';

const content = `
    <main>
        <div class="chats">
          <div class="chats--content">
            <button class="link link-profile" onClick="location.href='/profile'">Профиль &#62;</button>
            <input class="search" type="text" type="search" placeholder="Поиск">
            <hr class="separatory-line">
           {{#each characters}}
            <div class="correspondence-info">
              <div class="correspondence-avatar"></div>
              <div class="user-info">
                <h4 class="user-login">{{name}}</h4>
                <h5 class="message">{{message}}</h5>
              </div>
              <div class="date-info">
                <p class="date">{{date}}</p>
                <div class="unread-messages">{{unread}}</div>
              </div>
            </div>
            <hr class="separatory-line">
           {{/each}}
          </div>
        </div>
    </main>`;

const date = {
'characters': [
    {
        name: 'Илья',
        message: 'Друзья, у меня для вас особенный выпуск новостей!...',
        date: '15:12',
        unread: '2'
    },
    {
        name: 'тет-а-теты',
        message: 'И Human Interface Guidelines и Material Design рекомендуют...',
        date: 'Ср',
        unread: '4'
    }
]};

const main = () => {
    return Handlebars.compile(content)(date);
};

export default main;
