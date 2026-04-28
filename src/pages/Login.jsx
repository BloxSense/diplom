import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Ошибка входа");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (error) {
      setError("Сервер не отвечает");
    }
  };

  return (
    <main className="login-page">
      <section className="login">
        <form className="login__form" onSubmit={handleLogin}>
          <div className="login__row">
            <label htmlFor="username" className="login__label">
              Пользователь:
            </label>
            <input
              id="username"
              type="text"
              className="login__input"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {error && <p className="login__error">{error}</p>}

          <button type="submit" className="login__button">
            Войти
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;