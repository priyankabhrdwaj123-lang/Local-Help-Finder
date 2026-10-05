function ProviderCard({ provider, onViewProfile }) {
  return (
    <div className="provider-card">
      <div className="provider-top">
        <div className="provider-avatar">
          {provider.name.charAt(0)}
        </div>

        <div>
          <h3>{provider.name}</h3>
          <p>{provider.service}</p>
        </div>
      </div>

      <div className="provider-rating">
        ⭐ {provider.rating}
        <span>({provider.reviews} reviews)</span>
      </div>

      <div className="provider-info">
        <span>📍 {provider.location}</span>
        <span>🚗 {provider.distance}</span>
      </div>

      <div className="provider-bottom">
        <strong>₹{provider.price}</strong>
        <span>/ visit</span>
      </div>

      <div className="provider-status">
        {provider.available ? (
          <span className="available">● Available</span>
        ) : (
          <span className="unavailable">● Currently Busy</span>
        )}
      </div>

      <button
        className="view-profile-btn"
        onClick={() => onViewProfile(provider)}
      >
        View Profile
      </button>
    </div>
  );
}

export default ProviderCard;