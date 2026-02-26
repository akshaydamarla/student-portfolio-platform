import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import "../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async () => {

    if (!captchaToken) {
      alert("Please verify captcha");
      return;
    }

    try {
      const res = await axios.post(
        "https://student-portfolio-platform-0fsw.onrender.com/api/auth/login",
        {
          email,
          password,
          captchaToken   // 🔥 send to backend
        }
      );

      const token = res.data;
      localStorage.setItem("token", token);

      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload.role;

      window.location.href =
        role === "ADMIN" ? "/admin" : "/student";

    } catch (err) {
      alert("Invalid Credentials or Captcha Failed");
      setCaptchaToken(null);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Student Portfolio System</h2>
        <p className="subtitle">Login to continue</p>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* GOOGLE RECAPTCHA */}
        <div style={{ marginBottom: "15px" }}>
          <ReCAPTCHA
            sitekey="6LdODngsAAAAACog2TiYD4KBpnb-IZfySgo1r3v4"
            onChange={(token) => setCaptchaToken(token)}
          />
        </div>

        <button onClick={handleLogin}>Login</button>

        <p>
          Don't have an account?{" "}
          <a href="/register">Create Account</a>
        </p>
      </div>
    </div>
  );
}