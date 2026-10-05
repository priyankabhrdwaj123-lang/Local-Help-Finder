import ServiceCard from "../components/ServiceCard";

function Home({ onSearch, onServiceClick }) {
  const services = [
    {
      icon: "⚡",
      title: "Electrician",
      description: "Wiring, switches, fans and electrical repairs.",
    },
    {
      icon: "🔧",
      title: "Plumber",
      description: "Pipes, taps, leakage and bathroom services.",
    },
    {
      icon: "❄️",
      title: "AC Repair",
      description: "AC repair, servicing and installation.",
    },
    {
      icon: "🧹",
      title: "Cleaning",
      description: "Home, kitchen and deep cleaning services.",
    },
    {
      icon: "📚",
      title: "Tutor",
      description: "Find tutors for school and competitive exams.",
    },
    {
      icon: "🚗",
      title: "Mechanic",
      description: "Car and bike repair and maintenance.",
    },
  ];

  return (
    <>
      <section className="services" id="services">
        <div className="section-header">
          <span>OUR SERVICES</span>
          <h2>What help do you need?</h2>
          <p>
            Find trusted professionals for your everyday needs.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              {...service}
              onClick={() => onServiceClick(service.title)}
            />
          ))}
        </div>
      </section>

      <section className="how-it-works" id="how-it-works">
        <div className="section-header">
          <span>HOW IT WORKS</span>
          <h2>Get help in 3 simple steps</h2>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-number">01</div>
            <h3>Choose a Service</h3>
            <p>
              Select the service you need from our list.
            </p>
          </div>

          <div className="step">
            <div className="step-number">02</div>
            <h3>Choose a Professional</h3>
            <p>
              Compare professionals, ratings and prices.
            </p>
          </div>

          <div className="step">
            <div className="step-number">03</div>
            <h3>Request Service</h3>
            <p>
              Send your request and get your problem solved.
            </p>
          </div>
        </div>
      </section>

      <section className="cta" id="providers">
        <h2>Are you a professional?</h2>

        <p>
          Join Local Help Finder and connect with customers
          looking for your services.
        </p>

        <button className="cta-btn" onClick={() => onSearch("provider")}>
          Become a Provider →
        </button>
      </section>
    </>
  );
}

export default Home;