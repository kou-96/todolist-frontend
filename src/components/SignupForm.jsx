import "./Required.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors = { username: "", email: "", password: "" };
    let hasErrors = false;

    if (!username) {
      newErrors.username = "ユーザー名を入力してください。";
      hasErrors = true;
    }

    if (!email) {
      newErrors.email = "メールアドレスを入力してください。";
      hasErrors = true;
    }

    if (!password) {
      newErrors.password = "パスワードを入力してください。";
      hasErrors = true;
    }

    setErrors(newErrors);
    return !hasErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await signup(username, email, password);
    }
  };

  const navigate = useNavigate();

  async function signup(username, email, password) {
    const url = "http://localhost:5003/users/signup";
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
      const resData = await res.text();
      alert(resData);
      navigate("/signup/success");
    } catch (error) {
      alert("このユーザー名またはメールアドレスは既に使用されています。");
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
