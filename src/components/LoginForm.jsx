import "./Required.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const BASE_URL = "http://localhost:5003";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const validateForm = (email, password) => {
    const newErrors = { email: "", password: "" };
    let hasErrors = true;

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

    const hasValidationError = validateForm(email, password);

    if (hasValidationError) {
      await login(email, password);
    }
  };

  async function login(email, password) {
    const url = `${BASE_URL}/users/login`;
    const data = {
      email,
      password,
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
        throw new Error(errorMessage || "ログインに失敗しました");
      }
      const resData = await res.json();

      document.cookie = `user_id=${resData.data.id}`;

      alert("ログインに成功しました");
      navigate("/todo");
    } catch (error) {
      alert("ログイン情報が間違っています。");
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>ログイン</h1>
          <div>
            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "input-error" : ""}
            />
            <span className="error-message">{errors.email}</span>
          </div>
          <div>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "input-error" : ""}
            />
            <span className="error-message">{errors.password}</span>
          </div>

          <button type="submit">ログイン</button>

          <div>
            <p>
              アカウントをお持ちでない場合は <Link to="/signup">新規登録</Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
