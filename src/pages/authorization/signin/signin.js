import styles from "./signin.scss";

const signin =`
    <div class="signin-box">
      <div class="signin-box--content">
        <h2 class="title">Регистрация</h2>
        <form action="" class="authorization">
          <div class="email">
            <label for="email">Почта</label>
            <input id="email" type="email" name="email">
          </div>
          <div class="login">
            <label for="login">Логин</label>
            <input id="login" type="text" name="login">
          </div>
          <div class="first_name">
            <label for="first_name">Имя</label>
            <input id="first_name" type="text" name="first_name">
          </div>
          <div class="second_name">
            <label for="second_name">Фамилия</label>
            <input id="second_name" type="text" name="second_name">
          </div>
          <div class="phone">
            <label for="phone">Телефон</label>
            <input id="phone" type="tel" name="phone">
          </div>
          <div class="password">
            <label for="password">Пароль</label>
            <input id="password" type="password" name="password">
          </div>
          <div class="password">
            <label for="password">Пароль (ещё раз)</label>
            <input id="password" type="password" name="password">
          </div>
        </form>
        <div class="box--buttons">
          <a href="main" class="button">Зарегистрироваться</a>
          <a href="login.html/" class="link">Войти</a>
        </div>
      </div>
    </div>`;

export default signin;