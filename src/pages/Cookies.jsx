function Cookies() {
  return (
    <main className="policy-page">
      <div className="container">
        <section className="policy">
          <h1 className="policy__title">Политика использования cookies</h1>

          <p className="policy__text">
            EloTracker может использовать cookies и локальное хранилище браузера
            для корректной работы сайта и сохранения пользовательской сессии.
          </p>

          <h2 className="policy__subtitle">Для чего используются cookies</h2>
          <p className="policy__text">
            Cookies и localStorage используются для авторизации, хранения токена
            доступа, сохранения данных пользователя и улучшения удобства работы
            с сайтом.
          </p>

          <h2 className="policy__subtitle">Авторизация</h2>
          <p className="policy__text">
            После входа в аккаунт сайт может сохранять токен авторизации в
            браузере, чтобы пользователь оставался в системе после обновления
            страницы.
          </p>

          <h2 className="policy__subtitle">Отключение cookies</h2>
          <p className="policy__text">
            Пользователь может очистить cookies и localStorage в настройках
            браузера. После этого может потребоваться повторный вход в аккаунт.
          </p>
        </section>
      </div>
    </main>
  );
}

export default Cookies;