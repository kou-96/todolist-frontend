import "./Required.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const BASE_URL = "http://localhost:5003";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = { username: "", email: "", password: "" };
    let hasErrors = true;

    if (!username) {
      newErrors.username = "ユーザー名を入力してください。";
      hasErrors = false;
    }

    if (!email) {
      newErrors.email = "メールアドレスを入力してください。";
      hasErrors = false;
    }

    if (!password) {
      newErrors.password = "パスワードを入力してください。";
      hasErrors = false;
    }

    setErrors(newErrors);
    return hasErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasValidationError = validateForm(username, email, password);

    if (hasValidationError) {
      await signup(username, email, password);
    }
  };

  async function signup(username, email, password) {
    const url = `${BASE_URL}/users/signup`;
    const data = {
      username: username,
      email: email,
      password: password,
    };
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(errorMessage || "アカウント作成に失敗しました");
      }
      const resData = await res.json();

      document.cookie = `user_id=${resData.data.id}`;

      alert(resData.message);
      navigate("/todo");
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>新規登録</h1>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={errors.username ? "input-error" : ""}
            />
            <span className="error-message">{errors.username}</span>
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "input-error" : ""}
            />
            <span className="error-message">{errors.email}</span>
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "input-error" : ""}
            />
            <span className="error-message">{errors.password}</span>
          </div>

          <button type="submit">登録</button>
          <div>
            <p>
              アカウントをお持ちの場合は <Link to="/">ログイン</Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignupForm;
