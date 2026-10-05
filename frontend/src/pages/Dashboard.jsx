import { useState } from "react";

function Dashboard({ user, onBack, onLogout, onFindService }) {
  const [activeMenu, setActiveMenu] = useState("Overview");

  const bookings = [
    {
      id: "#LH1024",
      provider: "Rahul Sharma",
      service: "Electrician",
      date: "Today, 4:30 PM",
      price: "₹300",
      status: "Confirmed",
      icon: "⚡",
    },
    {
      id: "#LH1021",
      provider: "Amit Kumar",
      service: "Plumbing",
      date: "18 Sep, 11:00 AM",
      price: "₹250",
      status: "Completed",
      icon: "🔧",
    },
    {
      id: "#LH1018",
      provider: "Neha Verma",
      service: "Home Cleaning",
      date: "15 Sep, 2:00 PM",
      price: "₹400",
      status: "Completed",
      icon: "🧹",
    },
  ];

  const menuItems = [
    { name: "Overview", icon: "⌂" },
    { name: "My Bookings", icon: "▣" },
    { name: "Find Services", icon: "⌕" },
    { name: "Favorites", icon: "♡" },
    { name: "Messages", icon: "◌" },
    { name: "Notifications", icon: "♢" },
    { name: "My Profile", icon: "◉" },
  ];

  const handleMenuClick = (item) => {
    setActiveMenu(item);

    if (item === "Find Services") {
      onFindService();
    }
  };

  return (
    <section className="dashboard-layout">

      {/* SIDEBAR */}

      <aside className="dashboard-sidebar">

        <div className="dashboard-brand">
          Local<span>Help</span>
        </div>

        <div className="user-mini-profile">
          <div className="dashboard-avatar">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <strong>{user?.name || "User"}</strong>
            <span>Customer</span>
          </div>
        </div>

        <nav className="dashboard-menu">

          {menuItems.map((item) => (
            <button
              key={item.name}
              className={
                activeMenu === item.name
                  ? "dashboard-menu-item active"
                  : "dashboard-menu-item"
              }
              onClick={() => handleMenuClick(item.name)}
            >
              <span>{item.icon}</span>
              {item.name}
            </button>
          ))}

        </nav>

        <div className="sidebar-bottom">

          <button className="dashboard-menu-item">
            ⚙ Settings
          </button>

          <button
            className="dashboard-menu-item logout-menu"
            onClick={onLogout}
          >
            ↪ Logout
          </button>

        </div>

      </aside>


      {/* MAIN DASHBOARD */}

      <main className="dashboard-main">

        <header className="dashboard-topbar">

          <button
            className="mobile-dashboard-back"
            onClick={onBack}
          >
            ←
          </button>

          <div className="dashboard-search">

            <span>⌕</span>

            <input
              placeholder="Search services, professionals..."
            />

          </div>

          <div className="dashboard-actions">

            <button className="notification-btn">
              ♢
              <span></span>
            </button>

            <div className="top-avatar">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

          </div>

        </header>


        {/* WELCOME */}

        <section className="dashboard-welcome">

          <div>

            <p className="dashboard-eyebrow">
              CUSTOMER DASHBOARD
            </p>

            <h1>
              Welcome back,{" "}
              <span>{user?.name || "there"}</span> 👋
            </h1>

            <p>
              Find trusted professionals and manage your
              services from one place.
            </p>

          </div>

          <button
            className="dashboard-primary-btn"
            onClick={onFindService}
          >
            + Find a Service
          </button>

        </section>


        {/* STATS */}

        <section className="dashboard-stats">

          <div className="dashboard-stat-card">

            <div className="stat-icon purple">
              📅
            </div>

            <div>
              <span>Total Bookings</span>
              <strong>12</strong>
              <small>+2 this month</small>
            </div>

          </div>


          <div className="dashboard-stat-card">

            <div className="stat-icon blue">
              ⏳
            </div>

            <div>
              <span>Active Bookings</span>
              <strong>1</strong>
              <small>Currently active</small>
            </div>

          </div>


          <div className="dashboard-stat-card">

            <div className="stat-icon green">
              ✓
            </div>

            <div>
              <span>Completed</span>
              <strong>11</strong>
              <small>Services completed</small>
            </div>

          </div>


          <div className="dashboard-stat-card">

            <div className="stat-icon pink">
              ♡
            </div>

            <div>
              <span>Favorites</span>
              <strong>6</strong>
              <small>Saved professionals</small>
            </div>

          </div>

        </section>


        {/* DASHBOARD CONTENT */}

        <div className="dashboard-content-grid">

          {/* UPCOMING BOOKING */}

          <section className="dashboard-panel upcoming-panel">

            <div className="panel-header">

              <div>
                <span>UPCOMING</span>
                <h2>Your next service</h2>
              </div>

              <button>
                View all
              </button>

            </div>


            <div className="upcoming-booking">

              <div className="booking-service-icon">
                ⚡
              </div>

              <div className="booking-main">

                <div className="booking-title-row">

                  <div>
                    <h3>Electrical Repair</h3>
                    <p>Rahul Sharma · Electrician</p>
                  </div>

                  <span className="status confirmed">
                    Confirmed
                  </span>

                </div>


                <div className="booking-details">

                  <span>
                    📅 Today
                  </span>

                  <span>
                    ◷ 4:30 PM
                  </span>

                  <span>
                    📍 Faridabad
                  </span>

                </div>


                <div className="booking-actions">

                  <button className="primary-small">
                    View Details
                  </button>

                  <button className="secondary-small">
                    Message
                  </button>

                </div>

              </div>

            </div>

          </section>


          {/* QUICK ACTIONS */}

          <section className="dashboard-panel quick-panel">

            <div className="panel-header">

              <div>
                <span>QUICK ACTIONS</span>
                <h2>What do you need?</h2>
              </div>

            </div>


            <div className="quick-actions">

              <button onClick={onFindService}>
                <span>🔍</span>
                <strong>Find Service</strong>
                <small>Hire a professional</small>
              </button>

              <button>
                <span>♡</span>
                <strong>Favorites</strong>
                <small>View saved providers</small>
              </button>

              <button>
                <span>💬</span>
                <strong>Messages</strong>
                <small>Chat with providers</small>
              </button>

              <button>
                <span>👤</span>
                <strong>My Profile</strong>
                <small>Update your details</small>
              </button>

            </div>

          </section>

        </div>


        {/* RECENT BOOKINGS */}

        <section className="dashboard-panel recent-panel">

          <div className="panel-header">

            <div>
              <span>ACTIVITY</span>
              <h2>Recent Bookings</h2>
            </div>

            <button>
              View all bookings →
            </button>

          </div>


          <div className="booking-table">

            <div className="booking-table-header">
              <span>Service</span>
              <span>Professional</span>
              <span>Date</span>
              <span>Amount</span>
              <span>Status</span>
            </div>


            {bookings.map((booking) => (

              <div
                className="booking-row"
                key={booking.id}
              >

                <div className="table-service">

                  <div>
                    {booking.icon}
                  </div>

                  <span>
                    {booking.service}
                  </span>

                </div>

                <span>
                  {booking.provider}
                </span>

                <span>
                  {booking.date}
                </span>

                <strong>
                  {booking.price}
                </strong>

                <span
                  className={
                    booking.status === "Confirmed"
                      ? "status confirmed"
                      : "status completed"
                  }
                >
                  {booking.status}
                </span>

              </div>

            ))}

          </div>

        </section>


        {/* RECOMMENDED SERVICES */}

        <section className="dashboard-panel">

          <div className="panel-header">

            <div>
              <span>FOR YOU</span>
              <h2>Popular Services</h2>
            </div>

            <button onClick={onFindService}>
              Explore all →
            </button>

          </div>


          <div className="dashboard-service-grid">

            <button onClick={() => onFindService("Electrician")}>
              <span>⚡</span>
              <strong>Electrician</strong>
              <small>From ₹300</small>
            </button>

            <button onClick={() => onFindService("Plumber")}>
              <span>🔧</span>
              <strong>Plumber</strong>
              <small>From ₹250</small>
            </button>

            <button onClick={() => onFindService("AC Repair")}>
              <span>❄️</span>
              <strong>AC Repair</strong>
              <small>From ₹500</small>
            </button>

            <button onClick={() => onFindService("Cleaning")}>
              <span>🧹</span>
              <strong>Cleaning</strong>
              <small>From ₹400</small>
            </button>

          </div>

        </section>

      </main>

    </section>
  );
}

export default Dashboard;