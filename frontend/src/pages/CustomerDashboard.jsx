
import { useState } from "react";

function CustomerDashboard({
  user,
  onLogout,
  onFindService,
  onBack,
}) {
  const customerName = user?.name || "Customer";

  const [activeMenu, setActiveMenu] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const menuItems = [
    {
      id: "overview",
      icon: "⌂",
      label: "Overview",
    },
    {
      id: "bookings",
      icon: "📅",
      label: "My Bookings",
      count: 2,
    },
    {
      id: "services",
      icon: "🔍",
      label: "Find Services",
    },
    {
      id: "favorites",
      icon: "♡",
      label: "Favorites",
    },
    {
      id: "messages",
      icon: "💬",
      label: "Messages",
      count: 3,
    },
    {
      id: "notifications",
      icon: "🔔",
      label: "Notifications",
    },
    {
      id: "reviews",
      icon: "⭐",
      label: "My Reviews",
    },
    {
      id: "profile",
      icon: "👤",
      label: "My Profile",
    },
  ];

  const currentMenu =
    menuItems.find(
      (item) => item.id === activeMenu
    ) || menuItems[0];

  const changeMenu = (id) => {
    if (id === "services") {
      onFindService("");
      return;
    }

    setActiveMenu(id);
    setMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      onFindService(search.trim());
    }
  };

  const renderPage = () => {
    switch (activeMenu) {
      case "bookings":
        return <MyBookings />;

      case "favorites":
        return <Favorites onFindService={onFindService} />;

      case "messages":
        return <Messages />;

      case "notifications":
        return <Notifications />;

      case "reviews":
        return <MyReviews />;

      case "profile":
        return (
          <MyProfile
            customerName={customerName}
          />
        );

      case "overview":
      default:
        return (
          <Overview
            customerName={customerName}
            onChangeMenu={changeMenu}
            onFindService={onFindService}
          />
        );
    }
  };

  return (
    <div className="dashboard-page">

      {/* MOBILE OVERLAY */}

      {mobileMenuOpen && (
        <div
          className="dashboard-mobile-overlay"
          onClick={() =>
            setMobileMenuOpen(false)
          }
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`dashboard-sidebar ${
          mobileMenuOpen ? "mobile-open" : ""
        }`}
      >

        <div className="dashboard-brand">
          Local<span>Help</span>
        </div>

        <div className="dashboard-user">

          <div className="dashboard-avatar">
            {customerName
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <strong>{customerName}</strong>
            <span>Customer</span>
          </div>

        </div>

        <div className="dashboard-menu">

          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`dashboard-menu-item ${
                activeMenu === item.id
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                changeMenu(item.id)
              }
            >

              <span>{item.icon}</span>

              {item.label}

              {item.count && (
                <small>{item.count}</small>
              )}

            </button>
          ))}

        </div>

        <div className="dashboard-sidebar-bottom">

          <button
            className={`dashboard-menu-item ${
              activeMenu === "settings"
                ? "active"
                : ""
            }`}
            onClick={() => {
              setActiveMenu("settings");
              setMobileMenuOpen(false);
            }}
          >
            <span>⚙</span>
            Settings
          </button>

          <button
            className="dashboard-menu-item logout-item"
            onClick={onLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>


      {/* MAIN */}

      <main className="dashboard-main">

        {/* TOPBAR */}

        <div className="dashboard-topbar">

          <button
            className="dashboard-mobile-menu"
            onClick={() =>
              setMobileMenuOpen(
                !mobileMenuOpen
              )
            }
          >
            ☰
          </button>

          <div className="dashboard-mobile-brand">
            Local<span>Help</span>
          </div>

          <form
            className="dashboard-search"
            onSubmit={handleSearch}
          >

            <span>🔍</span>

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search services..."
            />

          </form>

          <div className="dashboard-top-actions">

            <button
              className="dashboard-notification-btn"
              onClick={() =>
                setActiveMenu("notifications")
              }
              title="Notifications"
            >
              🔔
              <span />
            </button>

            <button
              className="top-avatar"
              onClick={() =>
                setActiveMenu("profile")
              }
            >
              {customerName
                .charAt(0)
                .toUpperCase()}
            </button>

          </div>

        </div>


        {/* PAGE HEADER */}

        {activeMenu !== "overview" &&
          activeMenu !== "settings" && (
            <div className="dashboard-page-header">

              <div>

                <button
                  className="dashboard-back-btn"
                  onClick={() =>
                    setActiveMenu("overview")
                  }
                >
                  ← Overview
                </button>

                <p className="welcome-label">
                  CUSTOMER AREA
                </p>

                <h1>
                  {currentMenu.label}
                </h1>

                <p>
                  Manage your{" "}
                  {currentMenu.label.toLowerCase()}.
                </p>

              </div>

              {activeMenu === "bookings" && (
                <button
                  className="primary-dashboard-btn"
                  onClick={() =>
                    onFindService("")
                  }
                >
                  + Book a Service
                </button>
              )}

            </div>
          )}


        {/* CONTENT */}

        {activeMenu === "settings" ? (
          <Settings />
        ) : (
          renderPage()
        )}

      </main>

    </div>
  );
}


/* =========================================================
   OVERVIEW
========================================================= */

function Overview({
  customerName,
  onChangeMenu,
  onFindService,
}) {
  return (
    <>
      {/* WELCOME */}

      <section className="dashboard-welcome">

        <div>

          <p className="welcome-label">
            CUSTOMER DASHBOARD
          </p>

          <h1>
            Good morning,{" "}
            {customerName.split(" ")[0]} 👋
          </h1>

          <p>
            Here's what's happening with your
            services.
          </p>

        </div>

        <button
          className="primary-dashboard-btn"
          onClick={() =>
            onFindService("")
          }
        >
          + Find a Service
        </button>

      </section>


      {/* STATS */}

      <section className="dashboard-stats">

        <StatCard
          icon="📅"
          label="Total Bookings"
          value="12"
          type="purple"
        />

        <StatCard
          icon="⏱"
          label="Active Bookings"
          value="1"
          type="blue"
        />

        <StatCard
          icon="✓"
          label="Completed"
          value="11"
          type="green"
        />

        <StatCard
          icon="♡"
          label="Favorites"
          value="6"
          type="orange"
        />

      </section>


      {/* MAIN GRID */}

      <div className="dashboard-content-grid">

        {/* UPCOMING */}

        <section className="dashboard-panel upcoming-panel">

          <div className="panel-heading">

            <div>
              <span className="panel-label">
                UPCOMING
              </span>

              <h2>
                Next Service
              </h2>
            </div>

            <span className="status-badge confirmed">
              Confirmed
            </span>

          </div>

          <div className="upcoming-service">

            <div className="large-service-icon">
              ⚡
            </div>

            <div className="service-info">

              <h3>
                Electrical Repair
              </h3>

              <p>
                Rahul Sharma
              </p>

              <div className="service-meta">

                <span>
                  📅 Today, 4:30 PM
                </span>

                <span>
                  📍 Faridabad
                </span>

              </div>

            </div>

            <div className="service-price">
              ₹300
            </div>

          </div>

          <div className="panel-actions">

            <button
              className="secondary-dashboard-btn"
              onClick={() =>
                onChangeMenu("bookings")
              }
            >
              View Details
            </button>

            <button
              className="primary-dashboard-btn-small"
              onClick={() =>
                onChangeMenu("messages")
              }
            >
              Message
            </button>

          </div>

        </section>


        {/* QUICK ACTIONS */}

        <section className="dashboard-panel">

          <div className="panel-heading">

            <div>
              <span className="panel-label">
                SHORTCUTS
              </span>

              <h2>
                Quick Actions
              </h2>
            </div>

          </div>

          <div className="quick-action-grid">

            <button
              onClick={() =>
                onFindService("")
              }
            >
              <span>🔍</span>

              <strong>
                Find Service
              </strong>

              <small>
                Search professionals
              </small>
            </button>

            <button
              onClick={() =>
                onChangeMenu("favorites")
              }
            >
              <span>♡</span>

              <strong>
                Favorites
              </strong>

              <small>
                Saved professionals
              </small>

            </button>

            <button
              onClick={() =>
                onChangeMenu("messages")
              }
            >
              <span>💬</span>

              <strong>
                Messages
              </strong>

              <small>
                Chat with providers
              </small>

            </button>

            <button
              onClick={() =>
                onChangeMenu("profile")
              }
            >
              <span>👤</span>

              <strong>
                My Profile
              </strong>

              <small>
                Update your details
              </small>

            </button>

          </div>

        </section>

      </div>


      {/* RECENT BOOKINGS */}

      <section className="dashboard-panel recent-bookings">

        <div className="panel-heading">

          <div>

            <span className="panel-label">
              ACTIVITY
            </span>

            <h2>
              Recent Bookings
            </h2>

          </div>

          <button
            className="view-all-btn"
            onClick={() =>
              onChangeMenu("bookings")
            }
          >
            View All →
          </button>

        </div>

        <div className="booking-table">

          <div className="booking-table-head">

            <span>SERVICE</span>
            <span>PROFESSIONAL</span>
            <span>DATE</span>
            <span>AMOUNT</span>
            <span>STATUS</span>

          </div>

          <BookingRow
            icon="⚡"
            service="Electrical Repair"
            professional="Rahul Sharma"
            date="Today, 4:30 PM"
            amount="₹300"
            status="Confirmed"
          />

          <BookingRow
            icon="🔧"
            service="Plumbing"
            professional="Amit Kumar"
            date="18 Sep, 11:00 AM"
            amount="₹250"
            status="Completed"
          />

          <BookingRow
            icon="🧹"
            service="Home Cleaning"
            professional="Neha Verma"
            date="15 Sep, 2:00 PM"
            amount="₹400"
            status="Completed"
          />

        </div>

      </section>


      {/* POPULAR SERVICES */}

      <section className="dashboard-panel">

        <div className="panel-heading">

          <div>

            <span className="panel-label">
              DISCOVER
            </span>

            <h2>
              Popular Services
            </h2>

          </div>

        </div>

        <div className="dashboard-service-grid">

          <button
            onClick={() =>
              onFindService("Electrician")
            }
          >
            ⚡
            <span>Electrician</span>
          </button>

          <button
            onClick={() =>
              onFindService("Plumber")
            }
          >
            🔧
            <span>Plumber</span>
          </button>

          <button
            onClick={() =>
              onFindService("AC Repair")
            }
          >
            ❄️
            <span>AC Repair</span>
          </button>

          <button
            onClick={() =>
              onFindService("Cleaning")
            }
          >
            🧹
            <span>Cleaning</span>
          </button>

        </div>

      </section>
    </>
  );
}


/* =========================================================
   MY BOOKINGS
========================================================= */

function MyBookings() {
  const bookings = [
    {
      icon: "⚡",
      service: "Electrical Repair",
      professional: "Rahul Sharma",
      date: "Today, 4:30 PM",
      amount: "₹300",
      status: "Confirmed",
    },
    {
      icon: "🔧",
      service: "Plumbing",
      professional: "Amit Kumar",
      date: "18 Sep, 11:00 AM",
      amount: "₹250",
      status: "Completed",
    },
    {
      icon: "🧹",
      service: "Home Cleaning",
      professional: "Neha Verma",
      date: "15 Sep, 2:00 PM",
      amount: "₹400",
      status: "Completed",
    },
    {
      icon: "❄️",
      service: "AC Repair",
      professional: "Vikas Singh",
      date: "12 Sep, 3:00 PM",
      amount: "₹500",
      status: "Completed",
    },
  ];

  return (
    <section className="dashboard-panel full-panel">

      <div className="panel-heading">

        <div>
          <span className="panel-label">
            BOOKING HISTORY
          </span>

          <h2>
            My Bookings
          </h2>
        </div>

        <span className="dashboard-count-badge">
          12 Total
        </span>

      </div>

      <div className="booking-table">

        <div className="booking-table-head">

          <span>SERVICE</span>
          <span>PROFESSIONAL</span>
          <span>DATE</span>
          <span>AMOUNT</span>
          <span>STATUS</span>

        </div>

        {bookings.map((booking, index) => (
          <BookingRow
            key={index}
            {...booking}
          />
        ))}

      </div>

    </section>
  );
}


/* =========================================================
   FAVORITES
========================================================= */

function Favorites({ onFindService }) {
  const favorites = [
    {
      icon: "⚡",
      name: "Rahul Sharma",
      service: "Electrician",
      rating: "4.8",
      price: "₹300",
      location: "Faridabad",
    },
    {
      icon: "❄️",
      name: "Vikas Singh",
      service: "AC Repair",
      rating: "4.9",
      price: "₹500",
      location: "Delhi",
    },
    {
      icon: "🧹",
      name: "Neha Verma",
      service: "Cleaning",
      rating: "4.6",
      price: "₹400",
      location: "Faridabad",
    },
  ];

  return (
    <section className="dashboard-panel full-panel">

      <div className="panel-heading">

        <div>
          <span className="panel-label">
            SAVED PROFESSIONALS
          </span>

          <h2>
            My Favorites
          </h2>
        </div>

        <span className="dashboard-count-badge">
          6 Saved
        </span>

      </div>

      <div className="favorite-grid">

        {favorites.map((favorite) => (
          <div
            className="favorite-card"
            key={favorite.name}
          >

            <div className="favorite-icon">
              {favorite.icon}
            </div>

            <div className="favorite-info">

              <strong>
                {favorite.name}
              </strong>

              <span>
                {favorite.service}
              </span>

              <small>
                ⭐ {favorite.rating} ·{" "}
                {favorite.location}
              </small>

            </div>

            <div className="favorite-right">

              <strong>
                {favorite.price}
              </strong>

              <button
                className="assign-btn"
                onClick={() =>
                  onFindService(
                    favorite.service
                  )
                }
              >
                Book
              </button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}


/* =========================================================
   MESSAGES
========================================================= */

function Messages() {
  const messages = [
    {
      name: "Rahul Sharma",
      service: "Electrical Repair",
      message:
        "I will reach by 4:30 PM today.",
      time: "10 min ago",
    },
    {
      name: "Amit Kumar",
      service: "Plumbing",
      message:
        "The plumbing work has been completed.",
      time: "1 hour ago",
    },
    {
      name: "Neha Verma",
      service: "Home Cleaning",
      message:
        "Thank you for choosing our service.",
      time: "Yesterday",
    },
  ];

  return (
    <section className="dashboard-panel full-panel">

      <div className="panel-heading">

        <div>
          <span className="panel-label">
            COMMUNICATION
          </span>

          <h2>
            Messages
          </h2>
        </div>

        <span className="dashboard-count-badge">
          3 Unread
        </span>

      </div>

      <div className="message-list">

        {messages.map((message) => (
          <button
            className="message-item"
            key={message.name}
          >

            <div className="message-avatar">
              {message.name.charAt(0)}
            </div>

            <div className="message-content">

              <strong>
                {message.name}
              </strong>

              <small>
                {message.service}
              </small>

              <span>
                {message.message}
              </span>

            </div>

            <small>
              {message.time}
            </small>

          </button>
        ))}

      </div>

    </section>
  );
}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function Notifications() {
  const notifications = [
    {
      icon: "📅",
      title: "Booking Confirmed",
      text:
        "Your electrical repair booking is confirmed for today at 4:30 PM.",
      time: "10 min ago",
    },
    {
      icon: "⭐",
      title: "Review Reminder",
      text:
        "You can now review your recent plumbing service.",
      time: "2 hours ago",
    },
    {
      icon: "🎉",
      title: "Service Offer",
      text:
        "Get special offers on home cleaning services.",
      time: "Yesterday",
    },
  ];

  return (
    <section className="dashboard-panel full-panel">

      <div className="panel-heading">

        <div>
          <span className="panel-label">
            UPDATES
          </span>

          <h2>
            Notifications
          </h2>
        </div>

      </div>

      <div className="notification-list">

        {notifications.map(
          (notification, index) => (
            <div
              className="notification-item"
              key={index}
            >

              <div className="notification-icon">
                {notification.icon}
              </div>

              <div>

                <strong>
                  {notification.title}
                </strong>

                <p>
                  {notification.text}
                </p>

                <small>
                  {notification.time}
                </small>

              </div>

            </div>
          )
        )}

      </div>

    </section>
  );
}


/* =========================================================
   REVIEWS
========================================================= */

function MyReviews() {
  const reviews = [
    {
      service: "Electrical Repair",
      professional: "Rahul Sharma",
      rating: "5.0",
      date: "10 Sep 2026",
      text:
        "Excellent service. Professional and arrived on time.",
    },
    {
      service: "Home Cleaning",
      professional: "Neha Verma",
      rating: "4.5",
      date: "15 Sep 2026",
      text:
        "Good service and very polite staff.",
    },
  ];

  return (
    <section className="dashboard-panel full-panel">

      <div className="panel-heading">

        <div>
          <span className="panel-label">
            YOUR FEEDBACK
          </span>

          <h2>
            My Reviews
          </h2>
        </div>

      </div>

      <div className="review-list">

        {reviews.map((review) => (
          <div
            className="review-card"
            key={review.professional}
          >

            <div className="review-avatar">
              {review.professional.charAt(0)}
            </div>

            <div>

              <strong>
                {review.service}
              </strong>

              <span>
                {review.professional}
              </span>

              <div>
                ⭐ {review.rating}
              </div>

              <p>
                {review.text}
              </p>

              <small>
                {review.date}
              </small>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}


/* =========================================================
   PROFILE
========================================================= */

function MyProfile({
  customerName,
}) {
  return (
    <section className="dashboard-panel full-panel">

      <div className="company-profile-header">

        <div className="company-profile-avatar">
          {customerName.charAt(0).toUpperCase()}
        </div>

        <div>

          <span className="panel-label">
            ACCOUNT PROFILE
          </span>

          <h2>
            {customerName}
          </h2>

          <p>
            Local Help customer
          </p>

        </div>

      </div>

      <div className="profile-form-grid">

        <label>
          Full Name

          <input
            defaultValue={customerName}
          />
        </label>

        <label>
          Email

          <input
            defaultValue="customer@example.com"
          />
        </label>

        <label>
          Phone Number

          <input
            defaultValue="+91 98765 43210"
          />
        </label>

        <label>
          City

          <input
            defaultValue="Faridabad"
          />
        </label>

        <label className="profile-full-field">
          Address

          <textarea
            defaultValue="Faridabad, Haryana"
          />
        </label>

      </div>

      <button className="primary-dashboard-btn">
        Save Changes
      </button>

    </section>
  );
}


/* =========================================================
   SETTINGS
========================================================= */

function Settings() {
  return (
    <section className="dashboard-panel full-panel">

      <div className="panel-heading">

        <div>
          <span className="panel-label">
            ACCOUNT
          </span>

          <h2>
            Settings
          </h2>

        </div>

      </div>

      <div className="settings-list">

        <div className="settings-row">

          <div>

            <strong>
              Booking Notifications
            </strong>

            <span>
              Receive updates about your bookings.
            </span>

          </div>

          <input
            type="checkbox"
            defaultChecked
          />

        </div>


        <div className="settings-row">

          <div>

            <strong>
              Provider Messages
            </strong>

            <span>
              Receive messages from service providers.
            </span>

          </div>

          <input
            type="checkbox"
            defaultChecked
          />

        </div>


        <div className="settings-row">

          <div>

            <strong>
              Offers & Promotions
            </strong>

            <span>
              Receive useful service offers.
            </span>

          </div>

          <input
            type="checkbox"
          />

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   SMALL COMPONENTS
========================================================= */

function StatCard({
  icon,
  label,
  value,
  type,
}) {
  return (
    <div className="stat-card">

      <div className={`stat-icon ${type}`}>
        {icon}
      </div>

      <div>

        <span>
          {label}
        </span>

        <strong>
          {value}
        </strong>

      </div>

    </div>
  );
}


function BookingRow({
  icon,
  service,
  professional,
  date,
  amount,
  status,
}) {
  return (
    <div className="booking-table-row">

      <div className="table-service">

        <span className="table-icon">
          {icon}
        </span>

        <strong>
          {service}
        </strong>

      </div>

      <span>
        {professional}
      </span>

      <span>
        {date}
      </span>

      <strong>
        {amount}
      </strong>

      <span
        className={
          status === "Confirmed"
            ? "table-status confirmed"
            : "table-status completed"
        }
      >
        {status}
      </span>

    </div>
  );
}


export default CustomerDashboard;

