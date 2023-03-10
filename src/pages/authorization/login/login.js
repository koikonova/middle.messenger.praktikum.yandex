import styles from "./login.scss";

const login = `
    <div class="login-box">
      <div class="login-box--content">
        <h2 class="title">Вход</h2>
        <form action="" class="authorization">
          <div class="login">
            <label for="login">Логин</label>
            <input id="login" type="text" name="login">
          </div>
          <div class="password">
            <label for="password">Пароль</label>
            <input id="password" type="password" name="password">
          </div>
        </form>
        <div class="box--buttons">
          <a href="main" class="button">Войти</a>
          <a href="signin" class="link">Нет аккаунта?</a>
        </div>
      </div>
    </div>`;

export default login;