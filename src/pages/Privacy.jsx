function Privacy() {
  return (
    <main className="policy-page">
      <div className="container">
        <section className="policy">
          <h1 className="policy__title">Положение о конфиденциальности</h1>

          <p className="policy__text">
            EloTracker уважает конфиденциальность пользователей и стремится
            защищать персональные данные, которые используются при работе сервиса.
          </p>

          <h2 className="policy__subtitle">Какие данные мы собираем</h2>
          <p className="policy__text">
            Мы можем собирать имя пользователя, email, Dota ID, данные профиля,
            статистику матчей и информацию, необходимую для авторизации.
          </p>

          <h2 className="policy__subtitle">Как используются данные</h2>
          <p className="policy__text">
            Данные используются для отображения личного кабинета, анализа матчей,
            расчёта статистики, сохранения пользовательских настроек и улучшения
            качества сервиса.
          </p>

          <h2 className="policy__subtitle">Хранение данных</h2>
          <p className="policy__text">
            Информация хранится в базе данных проекта и используется только в
            рамках функциональности EloTracker.
          </p>

          <h2 className="policy__subtitle">Безопасность</h2>
          <p className="policy__text">
            Пароли пользователей хранятся в зашифрованном виде. Мы не передаём
            персональные данные третьим лицам без необходимости.
          </p>
        </section>
      </div>
    </main>
  );
}

export default Privacy;