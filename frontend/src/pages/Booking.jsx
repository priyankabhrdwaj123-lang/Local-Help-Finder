function Booking({ provider, onBack, onConfirm }) {
  if (!provider) return null;

  return (
    <section className="booking-page">
      <div className="booking-container">

        <button
          className="booking-back-btn"
          onClick={onBack}
        >
          ← Back to Profile
        </button>

        <div className="booking-layout">

          {/* LEFT SIDE */}

          <div className="booking-form-card">

            <span className="booking-eyebrow">
              REQUEST SERVICE
            </span>

            <h1>Book a service</h1>

            <p className="booking-subtitle">
              Tell {provider.name} what help you need.
            </p>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                onConfirm();
              }}
            >

              <div className="booking-field">
                <label>Service</label>

                <select defaultValue={provider.service}>
                  <option>
                    {provider.service}
                  </option>

                  {provider.services?.map((service) => (
                    <option key={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div className="booking-field">
                <label>Preferred Date</label>

                <input
                  type="date"
                  required
                />
              </div>

              <div className="booking-field">
                <label>Preferred Time</label>

                <input
                  type="time"
                  required
                />
              </div>

              <div className="booking-field">
                <label>Service Address</label>

                <textarea
                  placeholder="Enter the address where service is required..."
                  rows="3"
                  required
                />
              </div>

              <div className="booking-field">
                <label>Describe your problem</label>

                <textarea
                  placeholder="Tell the professional what you need help with..."
                  rows="4"
                  required
                />
              </div>

              <button
                type="submit"
                className="confirm-booking-btn"
              >
                Send Service Request →
              </button>

            </form>

          </div>


          {/* RIGHT SIDE */}

          <aside className="booking-summary-card">

            <span className="booking-summary-label">
              PROFESSIONAL
            </span>

            <div className="booking-provider">

              <div className="booking-avatar">
                {provider.name.charAt(0)}
              </div>

              <div>
                <h3>{provider.name}</h3>

                <p>{provider.service}</p>

                <span>
                  ⭐ {provider.rating}
                </span>
              </div>

            </div>

            <div className="booking-summary-divider" />

            <div className="booking-price-row">
              <span>Starting price</span>

              <strong>
                ₹{provider.price}
              </strong>
            </div>

            <div className="booking-price-row">
              <span>Location</span>

              <strong>
                {provider.location}
              </strong>
            </div>

            <div className="booking-price-row">
              <span>Distance</span>

              <strong>
                {provider.distance}
              </strong>
            </div>

            <div className="booking-note">
              💡 Final price may depend on the
              actual work required.
            </div>

          </aside>

        </div>

      </div>
    </section>
  );
}

export default Booking;