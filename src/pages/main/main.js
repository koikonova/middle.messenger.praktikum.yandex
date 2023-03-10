import styles from "./main.scss";

const main = `
    <div class="chats">
      <div class="chats--content">
        <a href="profile" class="link-profile">Профиль &#62;</a>
        <input class="search" type="text" type="search" placeholder="Поиск">
        <hr class="separatory-line">
        <div class="correspondence-info">
          <div class="correspondence-avatar"></div>
          <div class="user-info">
            <h4 class="user-login">Илья</h4>
            <h5 class="message">Друзья, у меня для вас особенный выпуск новостей!...</h5>
          </div>
          <div class="date-info">
            <p class="date">15:12</p>
            <div class="unread-messages">2</div>
          </div>
        </div>
        <hr class="separatory-line">
        <div class="correspondence-info">
          <div class="correspondence-avatar"></div>
          <div class="user-info">
            <h4 class="user-login">тет-а-теты</h4>
            <h5 class="message">И Human Interface Guidelines и Material Design рекомендуют...</h5>
          </div>
          <div class="date-info">
            <p class="date">Ср</p>
            <div class="unread-messages">4</div>
          </div>
        </div>
        <hr class="separatory-line">
      </div>
    </div>`;

export default main;