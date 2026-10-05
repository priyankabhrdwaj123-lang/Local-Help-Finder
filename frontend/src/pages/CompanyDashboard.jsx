
import { useState } from "react";

function CompanyDashboard({
  user,
  onLogout,
  onBack,
}) {
  const companyName = user?.name || "Service Company";

  const [activeMenu, setActiveMenu] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const menuItems = [
    {
      id: "overview",
      icon: "⌂",
      label: "Company Overview",
    },
    {
      id: "requests",
      icon: "📩",
      label: "Service Requests",
      count: 18,
    },
    {
      id: "employees",
      icon: "👨‍🔧",
      label: "Employees",
    },
    {
      id: "assign",
      icon: "📋",
      label: "Assign Jobs",
    },
    {
      id: "services",
      icon: "🛠",
      label: "Services & Pricing",
    },
    {
      id: "schedule",
      icon: "🗓",
      label: "Schedule",
    },
    {
      id: "customers",
      icon: "👥",
      label: "Customers",
    },
    {
      id: "revenue",
      icon: "💰",
      label: "Revenue",
    },
    {
      id: "analytics",
      icon: "📊",
      label: "Analytics",
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
    },
    {
      id: "profile",
      icon: "🏢",
      label: "Company Profile",
    },
  ];

  const currentMenu =
    menuItems.find((item) => item.id === activeMenu) ||
    menuItems[0];

  const changeMenu = (id) => {
    setActiveMenu(id);
    setMobileMenuOpen(false);
  };

  const renderPage = () => {
    switch (activeMenu) {
      case "requests":
        return <ServiceRequests />;

      case "employees":
        return <Employees />;

      case "assign":
        return <AssignJobs />;

      case "services":
        return <ServicesPricing />;

      case "schedule":
        return <Schedule />;

      case "customers":
        return <Customers />;

      case "revenue":
        return <Revenue />;

      case "analytics":
        return <Analytics />;

      case "reviews":
        return <Reviews />;

      case "messages":
        return <Messages />;

      case "profile":
        return (
          <CompanyProfile
            companyName={companyName}
          />
        );

      case "overview":
      default:
        return (
          <Overview
            companyName={companyName}
            onChangeMenu={changeMenu}
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

          <div className="dashboard-avatar company-avatar">
            {companyName
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <strong>{companyName}</strong>
            <span>Service Company</span>
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
            onClick={() =>
              changeMenu("settings")
            }
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

          <div className="dashboard-search">

            <span>🔍</span>

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search jobs, customers..."
            />

          </div>

          <div className="dashboard-top-actions">

            <button
              className="dashboard-notification-btn"
              title="Notifications"
            >
              🔔
              <span />
            </button>

            <div className="top-avatar company-avatar">
              {companyName
                .charAt(0)
                .toUpperCase()}
            </div>

          </div>

        </div>

        {/* PAGE HEADER */}

        {activeMenu !== "overview" && (
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
                COMPANY MANAGEMENT
              </p>

              <h1>
                {currentMenu.label}
              </h1>

              <p>
                Manage your company's{" "}
                {currentMenu.label.toLowerCase()}.
              </p>
            </div>

            <button
              className="primary-dashboard-btn"
              onClick={() => {
                if (
                  activeMenu === "employees"
                ) {
                  setActiveMenu("employees");
                } else if (
                  activeMenu === "services"
                ) {
                  setActiveMenu("services");
                } else {
                  setActiveMenu("overview");
                }
              }}
            >
              {activeMenu === "employees"
                ? "+ Add Employee"
                : activeMenu === "services"
                ? "+ Add Service"
                : "Dashboard"}
            </button>

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
   COMPANY OVERVIEW
========================================================= */

function Overview({
  companyName,
  onChangeMenu,
}) {
  return (
    <>
      <section className="dashboard-welcome">

        <div>

          <p className="welcome-label">
            COMPANY DASHBOARD
          </p>

          <h1>
            Welcome, {companyName} 👋
          </h1>

          <p>
            Manage your team, jobs, customers
            and business performance.
          </p>

        </div>

        <button
          className="primary-dashboard-btn"
          onClick={() =>
            onChangeMenu("employees")
          }
        >
          + Add Employee
        </button>

      </section>


      {/* STATS */}

      <section className="dashboard-stats">

        <StatCard
          icon="📩"
          label="New Requests"
          value="18"
          type="purple"
        />

        <StatCard
          icon="👨‍🔧"
          label="Active Employees"
          value="12"
          type="blue"
        />

        <StatCard
          icon="₹"
          label="Monthly Revenue"
          value="₹2.48L"
          type="green"
        />

        <StatCard
          icon="⭐"
          label="Company Rating"
          value="4.7"
          type="orange"
        />

      </section>


      {/* MAIN GRID */}

      <div className="dashboard-content-grid">

        {/* REQUESTS */}

        <section className="dashboard-panel">

          <div className="panel-heading">

            <div>
              <span className="panel-label">
                MANAGEMENT
              </span>

              <h2>
                Service Requests
              </h2>
            </div>

            <button
              className="view-all-btn"
              onClick={() =>
                onChangeMenu("requests")
              }
            >
              View All →
            </button>

          </div>

          <CompanyRequest
            title="AC Installation"
            customer="Rahul Mehta"
            location="Sector 16, Faridabad"
            value="₹1,500"
          />

          <CompanyRequest
            title="Office Cleaning"
            customer="Tech Solutions Pvt Ltd"
            location="Gurgaon"
            value="₹3,500"
          />

          <CompanyRequest
            title="Electrical Maintenance"
            customer="Apex Residency"
            location="Noida"
            value="₹2,800"
          />

        </section>


        {/* REVENUE */}

        <section className="dashboard-panel">

          <div className="panel-heading">

            <div>
              <span className="panel-label">
                BUSINESS
              </span>

              <h2>Revenue</h2>
            </div>

            <select className="dashboard-select">
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
            </select>

          </div>

          <div className="earnings-total">
            ₹2,48,500
          </div>

          <p className="earnings-growth">
            ↑ 18.4% compared to last month
          </p>

          <div className="fake-chart">

            <div style={{ height: "45%" }} />
            <div style={{ height: "60%" }} />
            <div style={{ height: "55%" }} />
            <div style={{ height: "75%" }} />
            <div style={{ height: "65%" }} />
            <div style={{ height: "90%" }} />
            <div style={{ height: "80%" }} />

          </div>

        </section>

      </div>


      {/* EMPLOYEES */}

      <section className="dashboard-panel">

        <div className="panel-heading">

          <div>
            <span className="panel-label">
              TEAM
            </span>

            <h2>
              Employees & Technicians
            </h2>
          </div>

          <button
            className="primary-dashboard-btn-small"
            onClick={() =>
              onChangeMenu("employees")
            }
          >
            Manage Team
          </button>

        </div>

        <div className="employee-grid">

          <Employee
            name="Amit Kumar"
            role="Senior Technician"
            jobs="24 jobs"
            rating="4.9"
            status="Available"
          />

          <Employee
            name="Vikas Singh"
            role="AC Specialist"
            jobs="19 jobs"
            rating="4.8"
            status="On Job"
          />

          <Employee
            name="Mohit Yadav"
            role="Electrician"
            jobs="31 jobs"
            rating="4.7"
            status="Available"
          />

          <Employee
            name="Ravi Sharma"
            role="Plumber"
            jobs="17 jobs"
            rating="4.6"
            status="Off Duty"
          />

        </div>

      </section>


      {/* SCHEDULE */}

      <section className="dashboard-panel">

        <div className="panel-heading">

          <div>
            <span className="panel-label">
              OPERATIONS
            </span>

            <h2>
              Today's Job Schedule
            </h2>
          </div>

          <button
            className="view-all-btn"
            onClick={() =>
              onChangeMenu("schedule")
            }
          >
            Full Schedule →
          </button>

        </div>

        <div className="company-schedule">

          <ScheduleItem
            time="10:00 AM"
            service="AC Service"
            customer="Priya Sharma"
            employee="Vikas Singh"
            status="In Progress"
          />

          <ScheduleItem
            time="12:30 PM"
            service="Electrical Repair"
            customer="Aman Verma"
            employee="Mohit Yadav"
            status="Assigned"
          />

          <ScheduleItem
            time="03:00 PM"
            service="Home Cleaning"
            customer="Neha Gupta"
            employee="Ravi Sharma"
            status="Assigned"
          />

          <ScheduleItem
            time="05:30 PM"
            service="Plumbing Repair"
            customer="Karan Singh"
            employee="Amit Kumar"
            status="Confirmed"
          />

        </div>

      </section>


      {/* INSIGHTS */}

      <section className="dashboard-panel">

        <div className="panel-heading">

          <div>
            <span className="panel-label">
              INSIGHTS
            </span>

            <h2>
              Business Overview
            </h2>
          </div>

          <button
            className="secondary-dashboard-btn"
            onClick={() =>
              onChangeMenu("analytics")
            }
          >
            View Analytics
          </button>

        </div>

        <div className="company-insights">

          <Insight
            value="94%"
            label="Job Completion Rate"
          />

          <Insight
            value="186"
            label="Completed Jobs"
          />

          <Insight
            value="127"
            label="Active Customers"
          />

          <Insight
            value="4.7/5"
            label="Customer Rating"
          />

        </div>

      </section>
    </>
  );
}


/* =========================================================
   SERVICE REQUESTS
========================================================= */

function ServiceRequests() {
  const requests = [
    {
      title: "AC Installation",
      customer: "Rahul Mehta",
      location: "Sector 16, Faridabad",
      value: "₹1,500",
      status: "New",
    },
    {
      title: "Office Cleaning",
      customer: "Tech Solutions Pvt Ltd",
      location: "Gurgaon",
      value: "₹3,500",
      status: "New",
    },
    {
      title: "Electrical Maintenance",
      customer: "Apex Residency",
      location: "Noida",
      value: "₹2,800",
      status: "Pending",
    },
    {
      title: "Plumbing Repair",
      customer: "Karan Singh",
      location: "Delhi",
      value: "₹900",
      status: "New",
    },
  ];

  return (
    <section className="dashboard-panel full-panel">

      <div className="panel-heading">

        <div>
          <span className="panel-label">
            REQUEST MANAGEMENT
          </span>

          <h2>
            Incoming Service Requests
          </h2>
        </div>

        <span className="dashboard-count-badge">
          18 New
        </span>

      </div>

      <div className="dashboard-list">

        {requests.map((request, index) => (
          <CompanyRequest
            key={index}
            {...request}
          />
        ))}

      </div>

    </section>
  );
}


/* =========================================================
   EMPLOYEES
========================================================= */

function Employees() {
  const employees = [
    {
      name: "Amit Kumar",
      role: "Senior Technician",
      jobs: "24 jobs",
      rating: "4.9",
      status: "Available",
    },
    {
      name: "Vikas Singh",
      role: "AC Specialist",
      jobs: "19 jobs",
      rating: "4.8",
      status: "On Job",
    },
    {
      name: "Mohit Yadav",
      role: "Electrician",
      jobs: "31 jobs",
      rating: "4.7",
      status: "Available",
    },
    {
      name: "Ravi Sharma",
      role: "Plumber",
      jobs: "17 jobs",
      rating: "4.6",
      status: "Off Duty",
    },
    {
      name: "Suresh Kumar",
      role: "Cleaning Specialist",
      jobs: "21 jobs",
      rating: "4.8",
      status: "Available",
    },
    {
      name: "Arjun Verma",
      role: "AC Technician",
      jobs: "28 jobs",
      rating: "4.9",
      status: "On Job",
    },
  ];

  return (
    <section className="dashboard-panel full-panel">

      <div className="panel-heading">

        <div>
          <span className="panel-label">
            TEAM MANAGEMENT
          </span>

          <h2>
            Employees & Technicians
          </h2>
        </div>

        <button className="primary-dashboard-btn-small">
          + Add Employee
        </button>

      </div>

      <div className="employee-grid">

        {employees.map((employee) => (
          <Employee
            key={employee.name}
            {...employee}
          />
        ))}

      </div>

    </section>
  );
}


/* =========================================================
   ASSIGN JOBS
========================================================= */

function AssignJobs() {
  return (
    <section className="dashboard-panel full-panel">

      <div className="panel-heading">

        <div>
          <span className="panel-label">
            OPERATIONS
          </span>

          <h2>
            Assign Jobs
          </h2>
        </div>

      </div>

      <div className="assign-job-grid">

        <div className="assign-job-card">

          <div className="request-icon">
            🛠
          </div>

          <h3>AC Installation</h3>

          <p>
            Rahul Mehta · Sector 16,
            Faridabad
          </p>

          <strong>₹1,500</strong>

          <select className="dashboard-select">
            <option>Select Employee</option>
            <option>Vikas Singh</option>
            <option>Amit Kumar</option>
            <option>Arjun Verma</option>
          </select>

          <button className="assign-btn">
            Assign Job
          </button>

        </div>


        <div className="assign-job-card">

          <div className="request-icon">
            🧹
          </div>

          <h3>Office Cleaning</h3>

          <p>
            Tech Solutions Pvt Ltd · Gurgaon
          </p>

          <strong>₹3,500</strong>

          <select className="dashboard-select">
            <option>Select Employee</option>
            <option>Ravi Sharma</option>
            <option>Suresh Kumar</option>
          </select>

          <button className="assign-btn">
            Assign Job
          </button>

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   SERVICES & PRICING
========================================================= */

function ServicesPricing() {
  const services = [
    {
      name: "AC Repair",
      category: "AC Services",
      price: "₹500",
      jobs: 86,
      status: "Active",
    },
    {
      name: "Electrical Repair",
      category: "Electrical",
      price: "₹300",
      jobs: 124,
      status: "Active",
    },
    {
      name: "Home Cleaning",
      category: "Cleaning",
      price: "₹700",
      jobs: 72,
      status: "Active",
    },
    {
      name: "Plumbing Repair",
      category: "Plumbing",
      price: "₹250",
      jobs: 68,
      status: "Active",
    },
  ];

  return (
    <section className="dashboard-panel full-panel">

      <div className="panel-heading">

        <div>
          <span className="panel-label">
            BUSINESS SERVICES
          </span>

          <h2>
            Services & Pricing
          </h2>
        </div>

        <button className="primary-dashboard-btn-small">
          + Add Service
        </button>

      </div>

      <div className="dashboard-table-wrapper">

        <table className="dashboard-table">

          <thead>
            <tr>
              <th>Service</th>
              <th>Category</th>
              <th>Starting Price</th>
              <th>Jobs</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {services.map((service) => (
              <tr key={service.name}>

                <td>
                  <strong>
                    {service.name}
                  </strong>
                </td>

                <td>{service.category}</td>

                <td>{service.price}</td>

                <td>{service.jobs}</td>

                <td>
                  <span className="status-badge confirmed">
                    {service.status}
                  </span>
                </td>

                <td>
                  <button className="table-action-btn">
                    Edit
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


/* =========================================================
   SCHEDULE
========================================================= */

function Schedule() {
  return (
    <section className="dashboard-panel full-panel">

      <div className="panel-heading">

        <div>
          <span className="panel-label">
            DAILY OPERATIONS
          </span>

          <h2>
            Today's Schedule
          </h2>
        </div>

        <button className="secondary-dashboard-btn">
          + Add Schedule
        </button>

      </div>

      <div className="company-schedule">

        <ScheduleItem
          time="10:00 AM"
          service="AC Service"
          customer="Priya Sharma"
          employee="Vikas Singh"
          status="In Progress"
        />

        <ScheduleItem
          time="12:30 PM"
          service="Electrical Repair"
          customer="Aman Verma"
          employee="Mohit Yadav"
          status="Assigned"
        />

        <ScheduleItem
          time="03:00 PM"
          service="Home Cleaning"
          customer="Neha Gupta"
          employee="Ravi Sharma"
          status="Assigned"
        />

        <ScheduleItem
          time="05:30 PM"
          service="Plumbing Repair"
          customer="Karan Singh"
          employee="Amit Kumar"
          status="Confirmed"
        />

      </div>

    </section>
  );
}


/* =========================================================
   CUSTOMERS
========================================================= */

function Customers() {
  const customers = [
    {
      name: "Rahul Mehta",
      location: "Faridabad",
      jobs: 8,
      spent: "₹12,400",
    },
    {
      name: "Priya Sharma",
      location: "Delhi",
      jobs: 5,
      spent: "₹8,200",
    },
    {
      name: "Neha Gupta",
      location: "Gurgaon",
      jobs: 12,
      spent: "₹18,600",
    },
    {
      name: "Aman Verma",
      location: "Noida",
      jobs: 4,
      spent: "₹6,700",
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
            Customers
          </h2>
        </div>

      </div>

      <div className="dashboard-table-wrapper">

        <table className="dashboard-table">

          <thead>
            <tr>
              <th>Customer</th>
              <th>Location</th>
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
                  📍 {customer.location}
                </td>

                <td>{customer.jobs}</td>

                <td>
                  <strong>
                    {customer.spent}
                  </strong>
                </td>

                <td>
                  <button className="table-action-btn">
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


/* =========================================================
   REVENUE
========================================================= */

function Revenue() {
  return (
    <>
      <section className="dashboard-stats">

        <StatCard
          icon="₹"
          label="This Month"
          value="₹2.48L"
          type="green"
        />

        <StatCard
          icon="📈"
          label="Growth"
          value="+18.4%"
          type="blue"
        />

        <StatCard
          icon="💳"
          label="Pending Payments"
          value="₹24,800"
          type="orange"
        />

        <StatCard
          icon="✅"
          label="Completed Payments"
          value="₹2.12L"
          type="purple"
        />

      </section>

      <section className="dashboard-panel full-panel">

        <div className="panel-heading">

          <div>
            <span className="panel-label">
              FINANCIAL PERFORMANCE
            </span>

            <h2>
              Revenue Overview
            </h2>
          </div>

          <select className="dashboard-select">
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 6 Months</option>
          </select>

        </div>

        <div className="earnings-total">
          ₹2,48,500
        </div>

        <p className="earnings-growth">
          ↑ 18.4% compared to last month
        </p>

        <div className="fake-chart large-chart">

          <div style={{ height: "35%" }} />
          <div style={{ height: "50%" }} />
          <div style={{ height: "45%" }} />
          <div style={{ height: "65%" }} />
          <div style={{ height: "58%" }} />
          <div style={{ height: "85%" }} />
          <div style={{ height: "92%" }} />
          <div style={{ height: "78%" }} />
          <div style={{ height: "95%" }} />

        </div>

      </section>
    </>
  );
}


/* =========================================================
   ANALYTICS
========================================================= */

function Analytics() {
  return (
    <>
      <section className="dashboard-stats">

        <StatCard
          icon="📈"
          label="Completion Rate"
          value="94%"
          type="green"
        />

        <StatCard
          icon="🛠"
          label="Completed Jobs"
          value="186"
          type="blue"
        />

        <StatCard
          icon="👥"
          label="Active Customers"
          value="127"
          type="purple"
        />

        <StatCard
          icon="⭐"
          label="Customer Rating"
          value="4.7"
          type="orange"
        />

      </section>

      <section className="dashboard-panel full-panel">

        <div className="panel-heading">

          <div>
            <span className="panel-label">
              BUSINESS INSIGHTS
            </span>

            <h2>
              Performance Analytics
            </h2>
          </div>

        </div>

        <div className="company-insights">

          <Insight
            value="94%"
            label="Job Completion Rate"
          />

          <Insight
            value="186"
            label="Completed Jobs"
          />

          <Insight
            value="127"
            label="Active Customers"
          />

          <Insight
            value="4.7/5"
            label="Customer Rating"
          />

        </div>

      </section>
    </>
  );
}


/* =========================================================
   REVIEWS
========================================================= */

function Reviews() {
  const reviews = [
    {
      name: "Rahul Mehta",
      rating: "5.0",
      text: "Excellent service. Technician was on time and professional.",
    },
    {
      name: "Priya Sharma",
      rating: "4.8",
      text: "Very good experience. The AC service was completed quickly.",
    },
    {
      name: "Neha Gupta",
      rating: "4.7",
      text: "Good cleaning service and polite staff.",
    },
  ];

  return (
    <section className="dashboard-panel full-panel">

      <div className="panel-heading">

        <div>
          <span className="panel-label">
            CUSTOMER FEEDBACK
          </span>

          <h2>
            Reviews
          </h2>
        </div>

        <strong className="review-summary">
          ⭐ 4.7 / 5
        </strong>

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

              <div>
                ⭐ {review.rating}
              </div>

              <p>
                {review.text}
              </p>

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
      name: "Rahul Mehta",
      message:
        "Can the technician come around 11 AM?",
      time: "10 min ago",
    },
    {
      name: "Priya Sharma",
      message:
        "Thank you for the quick service.",
      time: "1 hour ago",
    },
    {
      name: "Tech Solutions Pvt Ltd",
      message:
        "We need cleaning service tomorrow.",
      time: "2 hours ago",
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
   COMPANY PROFILE
========================================================= */

function CompanyProfile({
  companyName,
}) {
  return (
    <section className="dashboard-panel full-panel">

      <div className="company-profile-header">

        <div className="company-profile-avatar company-avatar">
          {companyName.charAt(0).toUpperCase()}
        </div>

        <div>
          <span className="panel-label">
            COMPANY PROFILE
          </span>

          <h2>{companyName}</h2>

          <p>
            Local service provider company
          </p>
        </div>

      </div>

      <div className="profile-form-grid">

        <label>
          Company Name
          <input
            defaultValue={companyName}
          />
        </label>

        <label>
          Business Email
          <input
            defaultValue="company@example.com"
          />
        </label>

        <label>
          Phone Number
          <input
            defaultValue="+91 98765 43210"
          />
        </label>

        <label>
          Business Category
          <select>
            <option>Home Services</option>
            <option>Electrical</option>
            <option>Cleaning</option>
            <option>Plumbing</option>
            <option>AC Services</option>
          </select>
        </label>

        <label className="profile-full-field">
          Business Address
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
              Email Notifications
            </strong>

            <span>
              Receive updates about new jobs
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
              Job Notifications
            </strong>

            <span>
              Get notified when customers create requests
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
              Customer Messages
            </strong>

            <span>
              Receive messages from customers
            </span>
          </div>

          <input
            type="checkbox"
            defaultChecked
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
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

    </div>
  );
}


function CompanyRequest({
  title,
  customer,
  location,
  value,
  status = "New",
}) {
  return (
    <div className="provider-request">

      <div className="request-icon">
        🛠
      </div>

      <div className="request-details">

        <strong>{title}</strong>

        <span>{customer}</span>

        <small>
          📍 {location}
        </small>

      </div>

      <div className="request-right">

        <strong>{value}</strong>

        <span className="request-status">
          {status}
        </span>

        <button className="assign-btn">
          Assign
        </button>

      </div>

    </div>
  );
}


function Employee({
  name,
  role,
  jobs,
  rating,
  status,
}) {
  return (
    <div className="employee-card">

      <div className="employee-avatar">
        {name.charAt(0)}
      </div>

      <div className="employee-info">

        <strong>{name}</strong>

        <span>{role}</span>

        <small>
          {jobs} · ⭐ {rating}
        </small>

      </div>

      <span
        className={`employee-status ${
          status === "Available"
            ? "available"
            : status === "On Job"
            ? "on-job"
            : "off-duty"
        }`}
      >
        {status}
      </span>

    </div>
  );
}


function ScheduleItem({
  time,
  service,
  customer,
  employee,
  status,
}) {
  return (
    <div className="schedule-item">

      <strong className="schedule-time">
        {time}
      </strong>

      <div className="schedule-service">

        <strong>{service}</strong>

        <span>{customer}</span>

      </div>

      <div className="schedule-employee">
        👨‍🔧 {employee}
      </div>

      <span className="status-badge confirmed">
        {status}
      </span>

    </div>
  );
}


function Insight({
  value,
  label,
}) {
  return (
    <div>

      <strong>{value}</strong>

      <span>{label}</span>

    </div>
  );
}


export default CompanyDashboard;

