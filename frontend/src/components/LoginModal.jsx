import { useState } from "react";

function LoginModal({ onClose, onRegister, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    const savedUser = localStorage.getItem("localHelpFinderUser");

    if (!savedUser) {
      setError("No account found. Please register first.");
      return;
    }

    const user = JSON.parse(savedUser);

    if (user.email !== email || user.password !== password) {
      setError("Invalid email or password.");
      return;
    }

    localStorage.setItem("localHelpFinderLoggedIn", "true");

    onLoginSuccess(user);
    onClose();
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div
        className="login-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-login" onClick={onClose}>
          ×
        </button>

        <div className="modal-icon">🔐</div>

        <h2>Welcome Back</h2>

        <p className="login-subtitle">
          Login to continue to Local Help Finder
        </p>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-submit">
            Login
          </button>
        </form>

        <p className="signup-text">
          Don't have an account?{" "}
          <button onClick={onRegister}>Create Account</button>
        </p>
      </div>
    </div>
  );
}

export default LoginModal;