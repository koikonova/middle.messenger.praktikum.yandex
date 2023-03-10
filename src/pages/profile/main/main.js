import styles from "./main.scss";

const profile = `
    <div class="back">
      <a href="main" class="button-back"></a>
    </div>
    <div class="profile-box">
      <div class="avatar"></div>
      <h3 class="chat-name">Иван</h3>
      <form action="">
        <div class="email">
          <label for="email">Почта</label>
          <input id="email" type="email" name="email" value="pochta@yandex.ru" disabled="disabled">
        </div>
        <hr class="separatory-line">
        <div class="login">
          <label for="login">Логин</label>
          <input id="login" type="text" name="login" value="ivanivanov" disabled="disabled">
        </div>
        <hr class="separatory-line">
        <div class="first_name">
          <label for="first_name">Имя</label>
          <input id="first_name" type="text" name="first_name" value="Иван" disabled="disabled">
        </div>
        <hr class="separatory-line">
        <div class="second_name">
          <label for="second_name">Фамилия</label>
          <input id="second_name" type="text" name="second_name" value="Иванов" disabled="disabled">
        </div>
        <hr class="separatory-line">
        <div class="display_name">
          <label for="display_name">Имя в чате</label>
          <input id="display_name" type="text" name="display_name" value="Иван" disabled="disabled">
        </div>
        <hr class="separatory-line">
        <div class="phone">
          <label for="phone">Телефон</label>
          <input id="phone" type="tel" name="phone" value="+7 (909) 967 30 30" disabled="disabled">
        </div>
      </form>
      <div class="profile-box--buttons">
        <a href="" class="link change-date">Изменить данные</a>
        <hr class="separatory-line">
        <a href="changePassword" class="link change-password">Изменить пароль</a>
        <hr class="separatory-line">
        <a href="login/" class="link">Выйти</a>
      </div>
    </div>`;

export default profile;