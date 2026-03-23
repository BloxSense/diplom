function Login() {
  return (
    <main className="login-page">
      <section className="login">
        <form className="login__form">
          <div className="login__row">
            <label htmlFor="username" className="login__label">
              Пользователь:
            </label>
            <input
              id="username"
              type="text"
              className="login__input"
            />
          </div>

          <div className="login__row">
            <label htmlFor="password" className="login__label">
              Пароль:
            </label>
            <input
              id="password"
              type="password"
              className="login__input"
            />
          </div>

          <button type="submit" className="login__button">
            Войти
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;