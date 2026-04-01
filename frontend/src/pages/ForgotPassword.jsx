import { useState } from "react";
import axios from "../api/axios";
import "../styles/auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // 🔹 Send OTP
  const handleSendOtp = async () => {
    try {
      setLoading(true);
      await axios.post("/api/auth/forgot-password", null, {
        params: { email },
      });
      toast.success("OTP sent to your email");
      setStep(2);
    } catch (err) {
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Reset Password
  const handleResetPassword = async () => {
    try {
      setLoading(true);
      await axios.post("/api/auth/reset-password", null, {
        params: { email, otp, newPassword },
      });
      toast.success("Password reset successful. Please login.");
      window.location.href = "/";
    } catch (err) {
      toast.error("Invalid OTP or failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form>
        <h2>Forgot Password</h2>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="auth-btn"
            >
              {loading ? <span className="spinner"></span> : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={handleResetPassword}
              disabled={loading}
              className="auth-btn"
            >
              {loading ? <span className="spinner"></span> : "Reset Password"}
            </button>
          </>
        )}

        <p className="auth-switch">
          Remembered your password?{" "}
          <span onClick={() => (window.location.href = "/")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}