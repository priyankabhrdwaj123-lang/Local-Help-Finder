
import { useState } from "react";

function ProviderDashboard({
  user,
  onLogout,
  onBack,
}) {
  const providerName = user?.name || "Professional";

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
      id: "requests",
      icon: "📩",
      label: "Service Requests",
      count: 5,
    },
    {
      id: "jobs",
      icon: "📅",
      label: "Upcoming Jobs",
      count: 3,
    },
    {
      id: "services",
      icon: "🛠",
      label: "My Services",
    },
    {
      id: "availability",
      icon: "🗓",
      label: "Availability",
    },
    {
      id: "earnings",
      icon: "💰",
      label: "Earnings",
    },
    {
      id: "customers",
      icon: "👥",
      label: "Customers",
    },
    {
      id: "reviews",
      icon: "⭐",
      label: "Reviews",
    },
    {
      id: "messages",
      icon: "💬",
      label: "Messages",
      count: 3,
    },
    {
      id: "profile",
      icon: "👤",
      label: "My Profile",
    },
  ];

  const bottomMenuItems = [
    {
      id: "settings",
      icon: "⚙",
      label: "Settings",
    },
  ];

  function changeMenu(menu) {
    setActiveMenu(menu);
    setMobileMenuOpen(false);
    setSearch("");
  }

  function handleSearch(event) {
    event.preventDefault();

    if (!search.trim()) return;

    alert(`Searching for: ${search}`);
  }

  function renderPage() {
    switch (activeMenu) {
      case "requests":
        return <ServiceRequests />;

      case "jobs":
        return <UpcomingJobs />;

      case "services":
        return <MyServices />;

      case "availability":
        return <Availability />;

      case "earnings":
        return <Earnings />;

      case "customers":
        return <Customers />;

      case "reviews":
        return <Reviews />;

      case "messages":
        return <Messages />;

      case "profile":
        return <MyProfile providerName={providerName} />;

      case "settings":
        return <Settings />;

      default:
        return (
          <ProviderOverview
            providerName={providerName}
            onChangeMenu={changeMenu}
          />
        );
    }
  }

  return (
    <div className="dashboard-page">

      {/* MOBILE MENU BUTTON */}

      <button
        className="dashboard-mobile-menu"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Open menu"
      >
        ☰
      </button>

      {mobileMenuOpen && (
        <div
          className="dashboard-mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
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

          <div className="dashboard-avatar provider-avatar">
            {providerName.charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>{providerName}</strong>

            <span>
              Service Professional
            </span>
          </div>

        </div>

        <div className="dashboard-menu">

          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`dashboard-menu-item ${
                activeMenu === item.id ? "active" : ""
              }`}
              onClick={() => changeMenu(item.id)}
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

          {bottomMenuItems.map((item) => (
            <button
              key={item.id}
              className={`dashboard-menu-item ${
                activeMenu === item.id ? "active" : ""
              }`}
              onClick={() => changeMenu(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}

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
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search customers, jobs..."
            />
          </form>

          <div className="dashboard-top-actions">

            <button
              className="dashboard-notification-btn"
              onClick={() => changeMenu("messages")}
              title="Notifications"
            >
              🔔
            </button>

            <button
              className="top-avatar provider-avatar"
              onClick={() => changeMenu("profile")}
              title="My Profile"
            >
              {providerName.charAt(0).toUpperCase()}
            </button>

          </div>

        </div>

        {/* PAGE CONTENT */}

        {activeMenu === "overview" ? (
          <section className="dashboard-welcome">

            <div>

              <p className="welcome-label">
                PROFESSIONAL DASHBOARD
              </p>

              <h1>
                Welcome back,{" "}
                {providerName.split(" ")[0]} 👋
              </h1>

              <p>
                Manage your services, customers and
                earnings.
              </p>

            </div>

            <button
              className="primary-dashboard-btn"
              onClick={() => changeMenu("services")}
            >
              + Add Service
            </button>

          </section>
        ) : (
          <section className="dashboard-page-header">

            <div>

              <button
                className="dashboard-back-btn"
                onClick={() => changeMenu("overview")}
              >
                ← Dashboard
              </button>

              <h1>
                {menuItems.find(
                  (item) => item.id === activeMenu
                )?.label || "Settings"}
              </h1>

            </div>

            {activeMenu === "services" && (
              <button
                className="primary-dashboard-btn"
                onClick={() =>
                  alert("Add Service form will open here.")
                }
              >
                + Add Service
              </button>
            )}

          </section>
        )}

        {renderPage()}

      </main>

    </div>
  );
}


/* =====================================================
   PROVIDER OVERVIEW
===================================================== */

function ProviderOverview({
  providerName,
  onChangeMenu,
}) {
  return (
    <>

      {/* STATS */}

      <section className="dashboard-stats">

        <StatCard
          icon="📩"
          type="purple"
          label="New Requests"
          value="5"
          onClick={() => onChangeMenu("requests")}
        />

        <StatCard
          icon="📅"
          type="blue"
          label="Upcoming Jobs"
          value="3"
          onClick={() => onChangeMenu("jobs")}
        />

        <StatCard
          icon="₹"
          type="green"
          label="This Month"
          value="₹18,450"
          onClick={() => onChangeMenu("earnings")}
        />

        <StatCard
          icon="⭐"
          type="orange"
          label="Rating"
          value="4.8"
          onClick={() => onChangeMenu("reviews")}
        />

      </section>


      {/* REQUESTS + EARNINGS */}

      <div className="dashboard-content-grid">

        <section className="dashboard-panel">

          <div className="panel-heading">

            <div>
              <span className="panel-label">
                ACTION REQUIRED
              </span>

              <h2>
                New Service Requests
              </h2>
            </div>

            <button
              className="view-all-btn"
              onClick={() => onChangeMenu("requests")}
            >
              View All →
            </button>

          </div>

          <ProviderRequest
            icon="⚡"
            title="Electrical Repair"
            customer="Aman Verma"
            location="Sector 15, Faridabad"
            amount="₹500"
          />

          <ProviderRequest
            icon="🔌"
            title="Fan Installation"
            customer="Riya Singh"
            location="Sector 21, Faridabad"
            amount="₹350"
          />

          <ProviderRequest
            icon="💡"
            title="Switch Repair"
            customer="Karan Sharma"
            location="NIT, Faridabad"
            amount="₹250"
          />

        </section>


        <section className="dashboard-panel">

          <div className="panel-heading">

            <div>
              <span className="panel-label">
                PERFORMANCE
              </span>

              <h2>
                Earnings
              </h2>
            </div>

            <button
              className="view-all-btn"
              onClick={() => onChangeMenu("earnings")}
            >
              Details →
            </button>

          </div>

          <div className="earnings-total">
            ₹18,450
          </div>

          <p className="earnings-growth">
            ↑ 12.5% from last month
          </p>

          <div className="fake-chart">

            <div style={{ height: "35%" }} />
            <div style={{ height: "50%" }} />
            <div style={{ height: "40%" }} />
            <div style={{ height: "65%" }} />
            <div style={{ height: "55%" }} />
            <div style={{ height: "80%" }} />
            <div style={{ height: "70%" }} />

          </div>

        </section>

      </div>


      {/* UPCOMING JOBS */}

      <section className="dashboard-panel">

        <div className="panel-heading">

          <div>
            <span className="panel-label">
              SCHEDULE
            </span>

            <h2>
              Upcoming Jobs
            </h2>
          </div>

          <button
            className="view-all-btn"
            onClick={() => onChangeMenu("jobs")}
          >
            View Calendar →
          </button>

        </div>

        <div className="provider-jobs-grid">

          <ProviderJob
            date="Today"
            time="4:30 PM"
            title="Electrical Repair"
            customer="Aman Verma"
            location="Faridabad"
          />

          <ProviderJob
            date="Tomorrow"
            time="11:00 AM"
            title="Fan Installation"
            customer="Riya Singh"
            location="Faridabad"
          />

          <ProviderJob
            date="20 Sep"
            time="2:00 PM"
            title="Wiring Work"
            customer="Karan Sharma"
            location="Delhi"
          />

        </div>

      </section>


      {/* PROFILE PERFORMANCE */}

      <section className="dashboard-panel">

        <div className="panel-heading">

          <div>
            <span className="panel-label">
              PROFILE
            </span>

            <h2>
              Your Professional Profile
            </h2>
          </div>

          <button
            className="secondary-dashboard-btn"
            onClick={() => onChangeMenu("profile")}
          >
            Edit Profile
          </button>

        </div>

        <div className="profile-performance">

          <div className="profile-progress">

            <strong>
              85%
            </strong>

            <span>
              Profile Complete
            </span>

          </div>

          <div className="profile-checks">

            <span>
              ✓ Profile photo added
            </span>

            <span>
              ✓ Services added
            </span>

            <span>
              ✓ Pricing added
            </span>

            <span>
              ○ Add more service photos
            </span>

          </div>

        </div>

      </section>

    </>
  );
}


/* =====================================================
   SERVICE REQUESTS
===================================================== */

function ServiceRequests() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      icon: "⚡",
      title: "Electrical Repair",
      customer: "Aman Verma",
      location: "Sector 15, Faridabad",
      date: "Today, 4:30 PM",
      amount: "₹500",
      status: "Pending",
    },
    {
      id: 2,
      icon: "🔌",
      title: "Fan Installation",
      customer: "Riya Singh",
      location: "Sector 21, Faridabad",
      date: "Tomorrow, 11:00 AM",
      amount: "₹350",
      status: "Pending",
    },
    {
      id: 3,
      icon: "💡",
      title: "Switch Repair",
      customer: "Karan Sharma",
      location: "NIT, Faridabad",
      date: "20 Sep, 2:00 PM",
      amount: "₹250",
      status: "Pending",
    },
    {
      id: 4,
      icon: "🛠",
      title: "Wiring Work",
      customer: "Ankit Kumar",
      location: "Sector 10, Faridabad",
      date: "21 Sep, 10:00 AM",
      amount: "₹900",
      status: "Pending",
    },
    {
      id: 5,
      icon: "💡",
      title: "Light Installation",
      customer: "Pooja Sharma",
      location: "Greenfield, Faridabad",
      date: "22 Sep, 5:00 PM",
      amount: "₹450",
      status: "Pending",
    },
  ]);

  function updateRequest(id, status) {
    setRequests((current) =>
      current.map((request) =>
        request.id === id
          ? { ...request, status }
          : request
      )
    );
  }

  return (
    <section className="dashboard-panel full-panel">

      <div className="panel-heading">

        <div>
          <span className="panel-label">
            CUSTOMER REQUESTS
          </span>

          <h2>
            Service Requests
          </h2>
        </div>

        <span className="dashboard-count-badge">
          {requests.filter(
            (request) => request.status === "Pending"
          ).length}{" "}
          Pending
        </span>

      </div>

      <div className="provider-request-list">

        {requests.map((request) => (
          <div
            className="provider-request"
            key={request.id}
          >

            <div className="request-icon">
              {request.icon}
            </div>

            <div className="request-details">

              <strong>
                {request.title}
              </strong>

              <span>
                {request.customer}
              </span>

              <small>
                📍 {request.location}
              </small>

              <small>
                🕐 {request.date}
              </small>

            </div>

            <div className="request-right">

              <strong>
                {request.amount}
              </strong>

              {request.status === "Pending" ? (
                <div>

                  <button
                    className="reject-btn"
                    onClick={() =>
                      updateRequest(
                        request.id,
                        "Rejected"
                      )
                    }
                  >
                    Reject
                  </button>

                  <button
                    className="accept-btn"
                    onClick={() =>
                      updateRequest(
                        request.id,
                        "Accepted"
                      )
                    }
                  >
                    Accept
                  </button>

                </div>
              ) : (
                <span
                  className={`status-badge ${
                    request.status === "Accepted"
                      ? "confirmed"
                      : "cancelled"
                  }`}
                >
                  {request.status}
                </span>
              )}

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}


/* =====================================================
   UPCOMING JOBS
===================================================== */

function UpcomingJobs() {
  const jobs = [
    {
      date: "Today",
      time: "4:30 PM",
      title: "Electrical Repair",
      customer: "Aman Verma",
      location: "Sector 15, Faridabad",
      amount: "₹500",
    },
    {
      date: "Tomorrow",
      time: "11:00 AM",
      title: "Fan Installation",
      customer: "Riya Singh",
      location: "Sector 21, Faridabad",
      amount: "₹350",
    },
    {
      date: "20 Sep",
      time: "2:00 PM",
      title: "Wiring Work",
      customer: "Karan Sharma",
      location: "NIT, Faridabad",
      amount: "₹900",
    },
  ];

  return (
    <section className="dashboard-panel full-panel">

      <div className="panel-heading">

        <div>
          <span className="panel-label">
            YOUR SCHEDULE
          </span>

          <h2>
            Upcoming Jobs
          </h2>
        </div>

        <button
          className="secondary-dashboard-btn"
          onClick={() =>
            alert("Calendar view coming soon.")
          }
        >
          Calendar
        </button>

      </div>

      <div className="provider-jobs-grid">

        {jobs.map((job, index) => (
          <ProviderJob
            key={index}
            {...job}
          />
        ))}

      </div>

    </section>
  );
}


/* =====================================================
   MY SERVICES
===================================================== */

function MyServices() {
  const [services, setServices] = useState([
    {
      id: 1,
      icon: "⚡",
      name: "Electrical Repair",
      price: "₹500",
      bookings: 42,
      status: "Active",
    },
    {
      id: 2,
      icon: "🔌",
      name: "Fan Installation",
      price: "₹350",
      bookings: 28,
      status: "Active",
    },
    {
      id: 3,
      icon: "💡",
      name: "Switch Repair",
      price: "₹250",
      bookings: 35,
      status: "Active",
    },
  ]);

  function toggleStatus(id) {
    setServices((current) =>
      current.map((service) =>
        service.id === id
          ? {
              ...service,
              status:
                service.status === "Active"
                  ? "Paused"
                  : "Active",
            }
          : service
      )
    );
  }

  return (
    <section className="dashboard-panel full-panel">

      <div className="panel-heading">

        <div>
          <span className="panel-label">
            SERVICES & PRICING
          </span>

          <h2>
            My Services
          </h2>
        </div>

        <button
          className="primary-dashboard-btn-small"
          onClick={() =>
            alert("Add Service form will open here.")
          }
        >
          + Add Service
        </button>

      </div>

      <div className="dashboard-table-wrapper">

        <table className="dashboard-table">

          <thead>
            <tr>
              <th>Service</th>
              <th>Price</th>
              <th>Bookings</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {services.map((service) => (
              <tr key={service.id}>

                <td>
                  <div className="table-service">

                    <div className="table-icon">
                      {service.icon}
                    </div>

                    <strong>
                      {service.name}
                    </strong>

                  </div>
                </td>

                <td>
                  {service.price}
                </td>

                <td>
                  {service.bookings}
                </td>

                <td>
                  <span className="status-badge confirmed">
                    {service.status}
                  </span>
                </td>

                <td>
                  <button
                    className="table-action-btn"
                    onClick={() =>
                      toggleStatus(service.id)
                    }
                  >
                    {service.status === "Active"
                      ? "Pause"
                      : "Activate"}
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}


/* =====================================================
   AVAILABILITY
===================================================== */

function Availability() {
  const [available, setAvailable] = useState(true);

  const days = [
    ["Monday", "9:00 AM", "7:00 PM"],
    ["Tuesday", "9:00 AM", "7:00 PM"],
    ["Wednesday", "9:00 AM", "7:00 PM"],
    ["Thursday", "9:00 AM", "7:00 PM"],
    ["Friday", "9:00 AM", "7:00 PM"],
    ["Saturday", "10:00 AM", "5:00 PM"],
    ["Sunday", "Closed", "Closed"],
  ];

  return (
    <section className="dashboard-panel full-panel">

      <div className="panel-heading">

        <div>
          <span className="panel-label">
            WORKING HOURS
          </span>

          <h2>
            Availability
          </h2>
        </div>

        <button
          className={`status-toggle ${
            available ? "active" : ""
          }`}
          onClick={() => setAvailable(!available)}
        >
          {available
            ? "● Available for Jobs"
            : "○ Currently Unavailable"}
        </button>

      </div>

      <div className="availability-list">

        {days.map((day) => (
          <div
            className="settings-row"
            key={day[0]}
          >

            <div>
              <strong>{day[0]}</strong>

              <span>
                {day[1]} - {day[2]}
              </span>
            </div>

            <button
              className="table-action-btn"
              onClick={() =>
                alert(`Edit ${day[0]} schedule`)
              }
            >
              Edit
            </button>

          </div>
        ))}

      </div>

    </section>
  );
}


/* =====================================================
   EARNINGS
===================================================== */

function Earnings() {
  return (
    <>

      <section className="dashboard-stats">

        <StatCard
          icon="₹"
          type="green"
          label="This Month"
          value="₹18,450"
        />

        <StatCard
          icon="₹"
          type="blue"
          label="Last Month"
          value="₹16,400"
        />

        <StatCard
          icon="✓"
          type="purple"
          label="Completed Jobs"
          value="42"
        />

        <StatCard
          icon="📈"
          type="orange"
          label="Growth"
          value="+12.5%"
        />

      </section>

      <section className="dashboard-panel full-panel">

        <div className="panel-heading">

          <div>
            <span className="panel-label">
              FINANCIAL PERFORMANCE
            </span>

            <h2>
              Earnings Overview
            </h2>
          </div>

          <select className="dashboard-select">
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 6 Months</option>
          </select>

        </div>

        <div className="earnings-total">
          ₹18,450
        </div>

        <p className="earnings-growth">
          ↑ 12.5% compared with last month
        </p>

        <div className="fake-chart large">

          <div style={{ height: "40%" }} />
          <div style={{ height: "55%" }} />
          <div style={{ height: "45%" }} />
          <div style={{ height: "70%" }} />
          <div style={{ height: "60%" }} />
          <div style={{ height: "85%" }} />
          <div style={{ height: "75%" }} />
          <div style={{ height: "90%" }} />

        </div>

      </section>

    </>
  );
}


/* =====================================================
   CUSTOMERS
===================================================== */

function Customers() {
  const customers = [
    {
      name: "Aman Verma",
      service: "Electrical Repair",
      jobs: 8,
      amount: "₹4,200",
    },
    {
      name: "Riya Singh",
      service: "Fan Installation",
      jobs: 5,
      amount: "₹2,450",
    },
    {
      name: "Karan Sharma",
      service: "Wiring Work",
      jobs: 4,
      amount: "₹3,800",
    },
    {
      name: "Pooja Sharma",
      service: "Light Installation",
      jobs: 3,
      amount: "₹1,350",
    },
  ];

  return (
    <section className="dashboard-panel full-panel">

      <div className="panel-heading">

        <div>
          <span className="panel-label">
            CUSTOMER MANAGEMENT
          </span>

          <h2>
            My Customers
          </h2>
        </div>

      </div>

      <div className="dashboard-table-wrapper">

        <table className="dashboard-table">

          <thead>
            <tr>
              <th>Customer</th>
              <th>Last Service</th>
              <th>Total Jobs</th>
              <th>Total Spent</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {customers.map((customer) => (
              <tr key={customer.name}>

                <td>
                  <strong>
                    {customer.name}
                  </strong>
                </td>

                <td>
                  {customer.service}
                </td>

                <td>
                  {customer.jobs}
                </td>

                <td>
                  {customer.amount}
                </td>

                <td>
                  <button
                    className="table-action-btn"
                    onClick={() =>
                      alert(
                        `Opening ${customer.name}'s profile`
                      )
                    }
                  >
                    View
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}


/* =====================================================
   REVIEWS
===================================================== */

function Reviews() {
  const reviews = [
    {
      name: "Aman Verma",
      rating: 5,
      text: "Very professional and completed the work quickly.",
      service: "Electrical Repair",
    },
    {
      name: "Riya Singh",
      rating: 5,
      text: "Good service and reasonable pricing.",
      service: "Fan Installation",
    },
    {
      name: "Karan Sharma",
      rating: 4,
      text: "Work was good and the provider arrived on time.",
      service: "Switch Repair",
    },
  ];

  return (
    <>

      <section className="dashboard-panel full-panel">

        <div className="review-summary">

          <div>
            <strong className="review-big-rating">
              4.8
            </strong>

            <div className="review-stars">
              ★★★★★
            </div>

            <span>
              Based on 124 reviews
            </span>
          </div>

          <div className="review-rating-bars">

            <div>
              <span>5 ★</span>
              <div className="rating-bar">
                <span style={{ width: "88%" }} />
              </div>
            </div>

            <div>
              <span>4 ★</span>
              <div className="rating-bar">
                <span style={{ width: "8%" }} />
              </div>
            </div>

            <div>
              <span>3 ★</span>
              <div className="rating-bar">
                <span style={{ width: "3%" }} />
              </div>
            </div>

          </div>

        </div>

      </section>

      <section className="dashboard-panel full-panel">

        <div className="panel-heading">

          <div>
            <span className="panel-label">
              CUSTOMER FEEDBACK
            </span>

            <h2>
              Recent Reviews
            </h2>
          </div>

        </div>

        <div className="review-list">

          {reviews.map((review) => (
            <div
              className="review-card"
              key={review.name}
            >

              <div className="review-avatar">
                {review.name.charAt(0)}
              </div>

              <div>

                <strong>
                  {review.name}
                </strong>

                <span className="review-stars">
                  {"★".repeat(review.rating)}
                </span>

                <p>
                  {review.text}
                </p>

                <small>
                  {review.service}
                </small>

              </div>

            </div>
          ))}

        </div>

      </section>

    </>
  );
}


/* =====================================================
   MESSAGES
===================================================== */

function Messages() {
  const [selectedMessage, setSelectedMessage] =
    useState(null);

  const messages = [
    {
      name: "Aman Verma",
      message: "Can you come around 4:30 PM?",
      time: "10 min ago",
    },
    {
      name: "Riya Singh",
      message: "Thank you for confirming the booking.",
      time: "1 hour ago",
    },
    {
      name: "Karan Sharma",
      message: "I have shared the location.",
      time: "Yesterday",
    },
  ];

  return (
    <section className="dashboard-panel full-panel">

      <div className="panel-heading">

        <div>
          <span className="panel-label">
            CUSTOMER COMMUNICATION
          </span>

          <h2>
            Messages
          </h2>
        </div>

      </div>

      <div className="message-list">

        {messages.map((message) => (
          <button
            className="message-item"
            key={message.name}
            onClick={() =>
              setSelectedMessage(message)
            }
          >

            <div className="message-avatar">
              {message.name.charAt(0)}
            </div>

            <div className="message-content">

              <strong>
                {message.name}
              </strong>

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

      {selectedMessage && (
        <div className="message-preview">

          <strong>
            Chat with {selectedMessage.name}
          </strong>

          <p>
            {selectedMessage.message}
          </p>

          <button
            className="primary-dashboard-btn-small"
            onClick={() =>
              alert(
                "Full chat window will open here."
              )
            }
          >
            Open Chat
          </button>

        </div>
      )}

    </section>
  );
}


/* =====================================================
   MY PROFILE
===================================================== */

function MyProfile({
  providerName,
}) {
  const [saved, setSaved] = useState(false);

  return (
    <section className="dashboard-panel full-panel">

      <div className="company-profile-header">

        <div className="company-profile-avatar provider-avatar">
          {providerName.charAt(0).toUpperCase()}
        </div>

        <div>

          <h2>
            {providerName}
          </h2>

          <p>
            Service Professional
          </p>

          <span className="status-badge confirmed">
            Verified Professional
          </span>

        </div>

      </div>

      <div className="profile-form-grid">

        <label>
          Full Name

          <input
            defaultValue={providerName}
          />
        </label>

        <label>
          Phone Number

          <input
            placeholder="+91 XXXXX XXXXX"
          />
        </label>

        <label>
          Email Address

          <input
            placeholder="your@email.com"
          />
        </label>

        <label>
          Experience

          <input
            placeholder="e.g. 5 years"
          />
        </label>

        <label className="profile-full-field">
          About You

          <textarea
            rows="5"
            placeholder="Tell customers about your experience and services..."
          />
        </label>

        <label>
          Location

          <input
            placeholder="Faridabad, Haryana"
          />
        </label>

        <label>
          Service Area

          <input
            placeholder="Faridabad, Delhi NCR"
          />
        </label>

      </div>

      <button
        className="primary-dashboard-btn"
        onClick={() => {
          setSaved(true);

          setTimeout(
            () => setSaved(false),
            2000
          );
        }}
      >
        {saved ? "✓ Changes Saved" : "Save Changes"}
      </button>

    </section>
  );
}


/* =====================================================
   SETTINGS
===================================================== */

function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    bookingAlerts: true,
    messageAlerts: true,
    emailUpdates: false,
  });

  function toggleSetting(key) {
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  const rows = [
    {
      key: "notifications",
      title: "Notifications",
      description:
        "Receive important account notifications.",
    },
    {
      key: "bookingAlerts",
      title: "Booking Alerts",
      description:
        "Get notified when a customer requests a service.",
    },
    {
      key: "messageAlerts",
      title: "Message Alerts",
      description:
        "Receive notifications for new customer messages.",
    },
    {
      key: "emailUpdates",
      title: "Email Updates",
      description:
        "Receive occasional updates and account information.",
    },
  ];

  return (
    <section className="dashboard-panel full-panel">

      <div className="panel-heading">

        <div>
          <span className="panel-label">
            ACCOUNT PREFERENCES
          </span>

          <h2>
            Settings
          </h2>
        </div>

      </div>

      <div className="settings-list">

        {rows.map((row) => (
          <div
            className="settings-row"
            key={row.key}
          >

            <div>

              <strong>
                {row.title}
              </strong>

              <span>
                {row.description}
              </span>

            </div>

            <button
              className={`settings-toggle ${
                settings[row.key]
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                toggleSetting(row.key)
              }
            >
              {settings[row.key]
                ? "ON"
                : "OFF"}
            </button>

          </div>
        ))}

      </div>

    </section>
  );
}


/* =====================================================
   STAT CARD
===================================================== */

function StatCard({
  icon,
  type,
  label,
  value,
  onClick,
}) {
  return (
    <button
      className="stat-card"
      onClick={onClick}
    >

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

    </button>
  );
}


/* =====================================================
   PROVIDER REQUEST
===================================================== */

function ProviderRequest({
  icon,
  title,
  customer,
  location,
  amount,
}) {
  const [status, setStatus] = useState("Pending");

  return (
    <div className="provider-request">

      <div className="request-icon">
        {icon}
      </div>

      <div className="request-details">

        <strong>
          {title}
        </strong>

        <span>
          {customer}
        </span>

        <small>
          📍 {location}
        </small>

      </div>

      <div className="request-right">

        <strong>
          {amount}
        </strong>

        {status === "Pending" ? (
          <div>

            <button
              className="reject-btn"
              onClick={() =>
                setStatus("Rejected")
              }
            >
              Reject
            </button>

            <button
              className="accept-btn"
              onClick={() =>
                setStatus("Accepted")
              }
            >
              Accept
            </button>

          </div>
        ) : (
          <span
            className={`status-badge ${
              status === "Accepted"
                ? "confirmed"
                : "cancelled"
            }`}
          >
            {status}
          </span>
        )}

      </div>

    </div>
  );
}


/* =====================================================
   PROVIDER JOB
===================================================== */

function ProviderJob({
  date,
  time,
  title,
  customer,
  location,
  amount,
}) {
  const [completed, setCompleted] =
    useState(false);

  return (
    <div className="provider-job">

      <div className="job-date">

        <strong>
          {date}
        </strong>

        <span>
          {time}
        </span>

      </div>

      <div>

        <strong>
          {title}
        </strong>

        <span>
          {customer}
        </span>

        <small>
          📍 {location}
        </small>

      </div>

      <div className="job-actions">

        {amount && (
          <strong>
            {amount}
          </strong>
        )}

        {!completed ? (
          <button
            className="table-action-btn"
            onClick={() => setCompleted(true)}
          >
            Complete
          </button>
        ) : (
          <span className="status-badge confirmed">
            Completed
          </span>
        )}

      </div>

    </div>
  );
}


export default ProviderDashboard;

