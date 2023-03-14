const errorTpl = `
    <main class="error-content">
      <h1 class="error">{{error}}</h1>
      <h2 class="error-title">{{title}}</h2>
      <button class="link error-link" onClick="location.href='/main'">Назад к чатам</button>
    </main>`;

export default errorTpl;
