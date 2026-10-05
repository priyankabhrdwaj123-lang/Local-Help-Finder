import logo from "../assets/localhelp-logo.png";


function Navbar({ onLogin, onRegister, onDashboard }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Local Help" className="navbar-logo" />
        
      </div>

      <div className="nav-links">
        <a href="#services">Services</a>
        <a href="#how-it-works">How It Works</a>
        <a href="#providers">For Providers</a>

        <button className="nav-dashboard" onClick={onDashboard}>
          Dashboard
        </button>

        <button className="login-btn" onClick={onLogin}>
          Login
        </button>

        <button className="nav-register" onClick={onRegister}>
          Register
        </button>
      </div>
    </nav>
  );
}

export default Navbar;