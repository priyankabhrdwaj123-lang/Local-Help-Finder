function ServiceCard({ icon, title, description, onClick }) {
  return (
    <div className="service-card" onClick={onClick}>
      <div className="service-icon">{icon}</div>

      <h3>{title}</h3>

      <p>{description}</p>

      <button className="service-link">
        Find Professionals →
      </button>
    </div>
  );
}

export default ServiceCard;