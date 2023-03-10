import styles from "./change-password.scss";

const changePassword = `
    <div class="back">
      <a href="main" class="button-back"></a>
    </div>
    <div class="profile-box">
      <div class="avatar"></div>
      <h3 class="chat-name">Иван</h3>
      <form action="">
        <div class="oldPassword">
          <label for="oldPassword">Старый пароль</label>
          <input id="oldPassword" type="password" name="oldPassword" value="11111111">
        </div>
        <hr class="separatory-line">
        <div class="newPassword">
          <label for="newPassword">Новый пароль</label>
          <input id="newPassword" type="password" name="newPassword">
        </div>
        <hr class="separatory-line">
        <div class="newPassword">
          <label for="newPassword">Повторите новый пароль</label>
          <input id="newPassword" type="password" name="newPassword">
        </div>
      </form>
      <div class="change-password-box--buttons">
        <a href="profile" class="button">Сохранить</a>
      </div>
    </div>`;

export default changePassword;