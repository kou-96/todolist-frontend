import { useNavigate } from "react-router-dom";

function SignupSuccess() {
  const navigate = useNavigate();
  const goback = () => {
    navigate("/");
  };

  return (
    <div>
      <h1 style={{ color: "black" }}>アカウント作成に成功しました</h1>
      <button onClick={goback}>ログインフォームに戻る</button>
    </div>
  );
}

export default SignupSuccess;
