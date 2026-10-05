
function BookingConfirmation({
  provider,
  onViewBookings,
  onBackHome,
}) {
  if (!provider) return null;

  return (
    <section className="booking-confirmation-page">
      <div className="confirmation-container">

        {/* SUCCESS ICON */}

        <div className="confirmation-success-icon">
          ✓
        </div>

        <span className="confirmation-eyebrow">
          REQUEST SENT SUCCESSFULLY
        </span>

        <h1>
          Your service request has been sent!
        </h1>

        <p className="confirmation-subtitle">
          {provider.name} has received your request.
          You can track the booking status from your
          dashboard.
        </p>


        {/* BOOKING CARD */}

        <div className="confirmation-card">

          <div className="confirmation-card-header">
            <div>
              <span>BOOKING REQUEST</span>
              <h2>{provider.service}</h2>
            </div>

            <span className="confirmation-status">
              Pending
            </span>
          </div>


          <div className="confirmation-provider">

            <div className="confirmation-avatar">
              {provider.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h3>{provider.name}</h3>

              <p>
                {provider.service}
              </p>

              <span>
                ⭐ {provider.rating} ·{" "}
                {provider.reviews} reviews
              </span>
            </div>

          </div>


          <div className="confirmation-divider" />


          <div className="confirmation-details">

            <div>
              <span>📍 Location</span>
              <strong>{provider.location}</strong>
            </div>

            <div>
              <span>💰 Starting Price</span>
              <strong>₹{provider.price}</strong>
            </div>

            <div>
              <span>📌 Status</span>
              <strong>Waiting for provider</strong>
            </div>

          </div>

        </div>


        {/* ACTIONS */}

        <div className="confirmation-actions">

          <button
            className="confirmation-primary-btn"
            onClick={onViewBookings}
          >
            View My Bookings
          </button>

          <button
            className="confirmation-secondary-btn"
            onClick={onBackHome}
          >
            Back to Home
          </button>

        </div>


        <p className="confirmation-help">
          You will receive a notification when the
          professional responds to your request.
        </p>

      </div>
    </section>
  );
}

export default BookingConfirmation;
