
import { useEffect, useState } from "react";
import "./App.css";

import CustomerDashboard from "./pages/CustomerDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import Services from "./pages/Services";
import ProviderProfile from "./pages/ProviderProfile";
import Booking from "./pages/Booking";
import BookingConfirmation from "./pages/BookingConfirmation";



function App() {
  // ==========================================
  // PAGE
  // ==========================================

  const [page, setPage] = useState("home");
  const [selectedService, setSelectedService] = useState("");
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [bookingProvider, setBookingProvider] = useState(null);



  // ==========================================
  // LIGHT / DARK THEME
  // ==========================================

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem(
      "localHelpFinderTheme"
    );

    return savedTheme === "dark";
  });

  useEffect(() => {
    localStorage.setItem(
      "localHelpFinderTheme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  // ==========================================
  // LOGIN / REGISTER
  // ==========================================

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // ==========================================
  // LOGIN DATA
  // ==========================================

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // ==========================================
  // REGISTER DATA
  // ==========================================

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });

  // ==========================================
  // FORM STATES
  // ==========================================

  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");

  const [showLoginPassword, setShowLoginPassword] =
    useState(false);

  const [showRegisterPassword, setShowRegisterPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // ==========================================
  // CURRENT USER
  // ==========================================

  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = localStorage.getItem(
      "localHelpFinderUser"
    );

    const isLoggedIn = localStorage.getItem(
      "localHelpFinderLoggedIn"
    );

    if (savedUser && isLoggedIn === "true") {
      try {
        return JSON.parse(savedUser);
      } catch {
        return null;
      }
    }

    return null;
  });

  // ==========================================
  // LOGIN INPUT
  // ==========================================

  const handleLoginChange = (event) => {
    const { name, value } = event.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });

    setLoginError("");
  };

  // ==========================================
  // REGISTER INPUT
  // ==========================================

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;

    setRegisterData({
      ...registerData,
      [name]: value,
    });

    setRegisterError("");
    setRegisterSuccess("");
  };

  // ==========================================
  // REGISTER
  // ==========================================

  const handleRegister = (event) => {
    event.preventDefault();

    setRegisterError("");
    setRegisterSuccess("");

    const {
      name,
      email,
      password,
      confirmPassword,
      role,
    } = registerData;

    if (!name.trim()) {
      setRegisterError(
        "Please enter your full name."
      );
      return;
    }

    if (!email.trim()) {
      setRegisterError(
        "Please enter your email."
      );
      return;
    }

    if (!email.includes("@")) {
      setRegisterError(
        "Please enter a valid email address."
      );
      return;
    }

    if (password.length < 6) {
      setRegisterError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setRegisterError(
        "Password and confirm password do not match."
      );
      return;
    }

    const user = {
      name,
      email,
      password,
      role,
    };

    localStorage.setItem(
      "localHelpFinderUser",
      JSON.stringify(user)
    );

    setRegisterSuccess(
      "Account created successfully! You can now login."
    );

    setRegisterData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "customer",
    });
  };

  // ==========================================
  // LOGIN
  // ==========================================

  const handleLogin = (event) => {
    event.preventDefault();

    setLoginError("");

    const {
      email,
      password,
    } = loginData;

    if (!email.trim()) {
      setLoginError(
        "Please enter your email."
      );
      return;
    }

    if (!email.includes("@")) {
      setLoginError(
        "Please enter a valid email address."
      );
      return;
    }

    if (!password) {
      setLoginError(
        "Please enter your password."
      );
      return;
    }

    const savedUser = localStorage.getItem(
      "localHelpFinderUser"
    );

    if (!savedUser) {
      setLoginError(
        "No account found. Please create an account first."
      );
      return;
    }

    let user;

    try {
      user = JSON.parse(savedUser);
    } catch {
      setLoginError(
        "Unable to load account."
      );
      return;
    }

    if (
      email !== user.email ||
      password !== user.password
    ) {
      setLoginError(
        "Incorrect email or password."
      );
      return;
    }

    localStorage.setItem(
      "localHelpFinderLoggedIn",
      "true"
    );

    setLoggedInUser(user);

    setShowLogin(false);

    setLoginData({
      email: "",
      password: "",
    });

    // Open correct dashboard
    openCorrectDashboard(user);
  };

  // ==========================================
  // OPEN CORRECT DASHBOARD
  // ==========================================

  const openCorrectDashboard = (user) => {
    if (!user) {
      return;
    }

    if (user.role === "customer") {
      setPage("customer-dashboard");
    } else if (user.role === "provider") {
      setPage("provider-dashboard");
    } else if (user.role === "company") {
      setPage("company-dashboard");
    } else {
      setPage("customer-dashboard");
    }
  };

  // ==========================================
  // OPEN LOGIN
  // ==========================================

  const openLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
    setLoginError("");
  };

  // ==========================================
  // OPEN REGISTER
  // ==========================================

  const openRegister = () => {
    setShowRegister(true);
    setShowLogin(false);

    setRegisterError("");
    setRegisterSuccess("");
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem(
      "localHelpFinderLoggedIn"
    );

    setLoggedInUser(null);
    setPage("home");
  };

  // ==========================================
  // DASHBOARD
  // ==========================================

  const openDashboard = () => {
    if (!loggedInUser) {
      openLogin();
      return;
    }

    openCorrectDashboard(loggedInUser);
  };

  // ==========================================
  // HOME SERVICE
  // ==========================================

  const findService = (service) => {
    setSelectedService(service || ""); setPage("services");
  };

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <div
      className={`app ${darkMode ? "dark-theme" : ""
        }`}
    >

      {/* ======================================
          MAIN WEBSITE NAVBAR
      ====================================== */}

      {!page.includes("dashboard") && (
        <nav className="navbar">

          <div
            className="logo"
            onClick={() => setPage("home")}
          >
            Local<span>Help</span>
          </div>

          <div className="nav-links">

            <a href="#services">
              Services
            </a>

            <a href="#how-it-works">
              How It Works
            </a>

            <a href="#providers">
              For Providers
            </a>

            {loggedInUser && (
              <button
                className="dashboard-nav-btn"
                onClick={openDashboard}
              >
                Dashboard
              </button>
            )}

            <button
              className="login-btn"
              onClick={openLogin}
            >
              Login
            </button>

            <button
              className="register-btn"
              onClick={openRegister}
            >
              Register
            </button>

            {/* ==================================
                LIGHT / DARK THEME BUTTON
            ================================== */}

            {/* <button
              className="theme-toggle"
              onClick={() =>
                setDarkMode((previous) => !previous)
              }
              title={
                darkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              aria-label={
                darkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {darkMode ? "☀️" : "🌙"}
            </button> */}

          </div>

        </nav>
      )}

      {/* ======================================
          HOME
      ====================================== */}

      {page === "home" && (
        <>

          <section className="hero">

            <div className="hero-content">

              <div className="hero-badge">
                <span>●</span>
                Trusted Local Professionals
              </div>

              <h1>
                Find Trusted Help
                <br />
                <span>Near You</span>
              </h1>

              <p>
                Find reliable local professionals for
                your everyday needs. Compare providers,
                check ratings and book services easily.
              </p>

              <div className="search-box">

                <input
                  type="text"
                  placeholder="What service do you need?"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      findService(
                        event.target.value
                      );
                    }
                  }}
                />

                <button
                  className="search-btn"
                  onClick={() =>
                    findService()
                  }
                >
                  Search
                </button>

              </div>

              <div className="popular-searches">

                <span>
                  Popular:
                </span>

                <button
                  onClick={() =>
                    findService("Electrician")
                  }
                >
                  Electrician
                </button>

                <button
                  onClick={() =>
                    findService("Plumber")
                  }
                >
                  Plumber
                </button>

                <button
                  onClick={() =>
                    findService("AC Repair")
                  }
                >
                  AC Repair
                </button>

              </div>

            </div>

          </section>



          {/* ==================================
              SERVICES
          ================================== */}

          <section
            className="services"
            id="services"
          >

            <div className="section-header">

              <span className="section-label">
                SERVICES
              </span>

              <h2>
                Popular Services
              </h2>

              <p>
                Find professionals for your everyday needs
              </p>

            </div>

            <div className="service-grid">

              <ServiceCard
                icon="⚡"
                title="Electrician"
                description="Electrical installation, repair and maintenance."
                onClick={findService}
              />

              <ServiceCard
                icon="🔧"
                title="Plumber"
                description="Pipes, leaks, fittings and plumbing repairs."
                onClick={findService}
              />

              <ServiceCard
                icon="❄️"
                title="AC Repair"
                description="AC servicing, installation and repair."
                onClick={findService}
              />

              <ServiceCard
                icon="🧹"
                title="Cleaning"
                description="Home, office and deep cleaning services."
                onClick={findService}
              />

              <ServiceCard
                icon="📚"
                title="Tutor"
                description="School subjects, programming and more."
                onClick={findService}
              />

              <ServiceCard
                icon="🚗"
                title="Mechanic"
                description="Vehicle servicing, repair and maintenance."
                onClick={findService}
              />

            </div>

          </section>

          {/* ==================================
              HOW IT WORKS
          ================================== */}

          <section
            className="how-it-works"
            id="how-it-works"
          >

            <div className="section-header">

              <span className="section-label">
                SIMPLE PROCESS
              </span>

              <h2>
                How It Works
              </h2>

              <p>
                Get your service done in three simple steps
              </p>

            </div>

            <div className="steps">

              <div className="step">

                <div className="step-number">
                  01
                </div>

                <h3>
                  Choose a Service
                </h3>

                <p>
                  Search for the service you need
                  from available categories.
                </p>

              </div>

              <div className="step">

                <div className="step-number">
                  02
                </div>

                <h3>
                  Choose a Professional
                </h3>

                <p>
                  Compare professionals,
                  ratings and pricing.
                </p>

              </div>

              <div className="step">

                <div className="step-number">
                  03
                </div>

                <h3>
                  Book Your Service
                </h3>

                <p>
                  Send a request and get
                  your work completed.
                </p>

              </div>

            </div>

          </section>

          {/* ==================================
              PROVIDER CTA
          ================================== */}

          <section
            className="cta"
            id="providers"
          >

            <div>

              <span className="section-label">
                FOR PROFESSIONALS
              </span>

              <h2>
                Grow Your Local Service Business
              </h2>

              <p>
                Join Local Help Finder and connect
                with customers looking for your services.
              </p>

            </div>

            <button
              className="cta-btn"
              onClick={openRegister}
            >
              Join as Professional
            </button>

          </section>

        </>
      )}



      {/* ======================================
    SERVICES PAGE
====================================== */}

      {page === "services" && (
        <Services
          searchQuery={selectedService}
          onBack={() => setPage("home")}
          onViewProfile={(provider) => {
            setSelectedProvider(provider);
            setPage("provider-profile");
          }}
        />
      )}


      {page === "provider-profile" && (
        <ProviderProfile
          provider={selectedProvider}
          onBack={() => setPage("services")}
          onRequest={() => {
            setBookingProvider(selectedProvider);
            setPage("booking");
          }}
        />
      )}

      {page === "booking" && (
        <Booking
          provider={bookingProvider}
          onBack={() => setPage("provider-profile")}
          onConfirm={() => {
            setPage("booking-confirmation");
          }}
        />
      )}

      {page === "booking-confirmation" && (
        <BookingConfirmation
          provider={bookingProvider}
          onViewBookings={() => {
            setPage("customer-dashboard");
          }}
          onBackHome={() => {
            setPage("home");
          }}
        />
      )}


      {/* ======================================
          CUSTOMER DASHBOARD
      ====================================== */}

      {page === "customer-dashboard" && (
        <CustomerDashboard
          user={loggedInUser}
          onLogout={handleLogout}
          onFindService={findService}
          onBack={() => setPage("home")}
        />
      )}

      {/* ======================================
          PROVIDER DASHBOARD
      ====================================== */}

      {page === "provider-dashboard" && (
        <ProviderDashboard
          user={loggedInUser}
          onLogout={handleLogout}
          onBack={() => setPage("home")}
        />
      )}

      {/* ======================================
          COMPANY DASHBOARD
      ====================================== */}

      {page === "company-dashboard" && (
        <CompanyDashboard
          user={loggedInUser}
          onLogout={handleLogout}
          onBack={() => setPage("home")}
        />
      )}

      {/* ======================================
          FOOTER
      ====================================== */}

      {!page.includes("dashboard") && (
        <footer className="footer">

          <div className="footer-logo">
            Local<span>Help</span>
          </div>

          <p>
            Connecting people with trusted local
            professionals.
          </p>

          <small>
            © 2026 Local Help Finder.
            All rights reserved.
          </small>

        </footer>
      )}

      {/* ======================================
          LOGIN MODAL
      ====================================== */}

      {showLogin && (

        <div
          className="login-overlay"
          onClick={() =>
            setShowLogin(false)
          }
        >

          <div
            className="login-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="close-login"
              onClick={() =>
                setShowLogin(false)
              }
            >
              ×
            </button>

            <div className="modal-icon">
              🔐
            </div>

            <h2>
              Welcome Back
            </h2>

            <p className="login-subtitle">
              Login to your Local Help Finder account
            </p>

            {loginError && (
              <div className="form-error">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin}>

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                placeholder="Enter your email"
              />

              <label>
                Password
              </label>

              <div className="password-wrapper">

                <input
                  type={
                    showLoginPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Enter your password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowLoginPassword(
                      !showLoginPassword
                    )
                  }
                >
                  {showLoginPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

              <button
                type="submit"
                className="login-submit"
              >
                Login
              </button>

            </form>

            <p className="signup-text">
              Don't have an account?

              <button
                type="button"
                onClick={openRegister}
              >
                Create Account
              </button>
            </p>

          </div>

        </div>
      )}

      {/* ======================================
          REGISTER MODAL
      ====================================== */}

      {showRegister && (

        <div
          className="login-overlay"
          onClick={() =>
            setShowRegister(false)
          }
        >

          <div
            className="login-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="close-login"
              onClick={() =>
                setShowRegister(false)
              }
            >
              ×
            </button>

            <div className="modal-icon">
              ✨
            </div>

            <h2>
              Create Account
            </h2>

            <p className="login-subtitle">
              Join Local Help Finder today
            </p>

            {registerError && (
              <div className="form-error">
                {registerError}
              </div>
            )}

            {registerSuccess && (
              <div className="form-success">
                {registerSuccess}
              </div>
            )}

            <form onSubmit={handleRegister}>

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={registerData.name}
                onChange={handleRegisterChange}
                placeholder="Enter your full name"
              />

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                placeholder="Enter your email"
              />

              <label>
                Password
              </label>

              <div className="password-wrapper">

                <input
                  type={
                    showRegisterPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  placeholder="Create a password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowRegisterPassword(
                      !showRegisterPassword
                    )
                  }
                >
                  {showRegisterPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

              <label>
                Confirm Password
              </label>

              <div className="password-wrapper">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={
                    registerData.confirmPassword
                  }
                  onChange={
                    handleRegisterChange
                  }
                  placeholder="Confirm your password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

              <label>
                Account Type
              </label>

              <select
                className="account-select"
                name="role"
                value={registerData.role}
                onChange={handleRegisterChange}
              >

                <option value="customer">
                  Customer — I need services
                </option>

                <option value="provider">
                  Professional — I provide services
                </option>

                <option value="company">
                  Company — I manage a service business
                </option>

              </select>

              <button
                type="submit"
                className="login-submit"
              >
                Create Account
              </button>

            </form>

            <p className="signup-text">

              Already have an account?

              <button
                type="button"
                onClick={openLogin}
              >
                Login
              </button>

            </p>

          </div>

        </div>
      )}

    </div>
  );
}

// ==========================================
// SERVICE CARD
// ==========================================

function ServiceCard({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <div className="service-card">

      <div className="service-icon">
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {description}
      </p>

      <button
        className="service-link"
        onClick={() => onClick(title)}
      >
        Find {title} →
      </button>

    </div>
  );
}

export default App;

prih xn @jkfhdxk
kmcmnhdnmdjnndmdmd mmdm