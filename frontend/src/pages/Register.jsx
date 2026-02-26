import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Please verify captcha");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/api/auth/register", {
        name,
        email,
        password,
        role: "STUDENT",
        captchaToken
      });

      alert("Registration successful!");
      navigate("/");   // 👈 go to login
    } catch (err) {
      alert("Registration failed");
      setCaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div style={{ marginBottom: "15px" }}>
          <ReCAPTCHA
            sitekey="6LdODngsAAAAACog2TiYD4KBpnb-IZfySgo1r3v4"
            onChange={(token) => setCaptchaToken(token)}
          />
        </div>

        <button type="submit" disabled={loading} className="auth-btn">
          {loading ? <span className="spinner"></span> : "Register"}
        </button>

        {/* NEW LOGIN BUTTON */}
        <p className="auth-switch">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;