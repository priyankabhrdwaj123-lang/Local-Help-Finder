function ProviderProfile({ provider, onBack, onRequest }) {
  if (!provider) return null;

  return (
    <section className="profile-page">
      <button className="back-btn" onClick={onBack}>
        ← Back to Results
      </button>

      <div className="profile-card">
        <div className="profile-header">
          <div className="large-avatar">
            {provider.name.charAt(0)}
          </div>

          <div>
            <div className="verified">✓ Verified Professional</div>

            <h1>{provider.name}</h1>

            <p className="profile-service">
              {provider.service}
            </p>

            <div className="profile-rating">
              ⭐ {provider.rating}
              <span>
                {provider.reviews} customer reviews
              </span>
            </div>
          </div>
        </div>

        <div className="profile-details">
          <div>
            <span>Experience</span>
            <strong>{provider.experience}</strong>
          </div>

          <div>
            <span>Location</span>
            <strong>{provider.location}</strong>
          </div>

          <div>
            <span>Distance</span>
            <strong>{provider.distance}</strong>
          </div>

          <div>
            <span>Starting Price</span>
            <strong>₹{provider.price}</strong>
          </div>
        </div>

        <div className="profile-section">
          <h2>About</h2>

          <p>{provider.description}</p>
        </div>

        <div className="profile-section">
          <h2>Services Offered</h2>

          <div className="service-tags">
            {provider.services.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
        </div>

        <button
          className="request-service-btn"
          onClick={onRequest}
          disabled={!provider.available}
        >
          {provider.available
            ? "Request Service"
            : "Currently Unavailable"}
        </button>
      </div>
    </section>
  );
}

export default ProviderProfile;