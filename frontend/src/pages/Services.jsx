
import { useMemo, useState } from "react";
import { providers } from "../data/providers";

function Services({
  searchQuery = "",
  onViewProfile,
  onBack,
}) {
  const [search, setSearch] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const categories = [
    {
      name: "All",
      icon: "🔎",
    },
    {
      name: "Electrician",
      icon: "⚡",
    },
    {
      name: "Plumber",
      icon: "🔧",
    },
    {
      name: "AC Repair",
      icon: "❄️",
    },
    {
      name: "Cleaning",
      icon: "🧹",
    },
    {
      name: "Tutor",
      icon: "📚",
    },
    {
      name: "Mechanic",
      icon: "🚗",
    },
    {
      name: "Painter",
      icon: "🎨",
    },
  ];

  const filteredProviders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return providers.filter((provider) => {
      const matchesSearch =
        !query ||
        provider.name?.toLowerCase().includes(query) ||
        provider.service?.toLowerCase().includes(query) ||
        provider.location?.toLowerCase().includes(query) ||
        provider.description
          ?.toLowerCase()
          .includes(query) ||
        provider.services?.some((service) =>
          service.toLowerCase().includes(query)
        );

      const matchesCategory =
        selectedCategory === "All" ||
        provider.service?.toLowerCase() ===
          selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  function handleSearch(event) {
    event.preventDefault();
  }

  function clearSearch() {
    setSearch("");
    setSelectedCategory("All");
  }

  return (
    <div className="services-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="services-header">

        <div className="services-header-content">

          <button
            className="services-back-btn"
            onClick={onBack}
          >
            ← Back
          </button>

          <p className="services-eyebrow">
            LOCAL HELP FINDER
          </p>

          <h1>
            Find the right professional
            <span> near you</span>
          </h1>

          <p className="services-subtitle">
            Search trusted local professionals for
            your home and personal service needs.
          </p>

        </div>


        {/* SEARCH */}

        <form
          className="services-search-box"
          onSubmit={handleSearch}
        >

          <span className="services-search-icon">
            🔍
          </span>

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="What service do you need?"
          />

          <button type="submit">
            Search
          </button>

        </form>

      </section>


      {/* =================================================
          CATEGORIES
      ================================================= */}

      <section className="services-category-section">

        <div className="services-container">

          <div className="services-section-heading">

            <div>
              <span>
                EXPLORE SERVICES
              </span>

              <h2>
                What do you need help with?
              </h2>
            </div>

          </div>


          <div className="services-category-list">

            {categories.map((category) => (
              <button
                key={category.name}
                className={`service-category ${
                  selectedCategory === category.name
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setSelectedCategory(
                    category.name
                  )
                }
              >

                <span>
                  {category.icon}
                </span>

                {category.name}

              </button>
            ))}

          </div>

        </div>

      </section>


      {/* =================================================
          PROVIDERS
      ================================================= */}

      <main className="services-container services-results">

        <div className="services-results-header">

          <div>

            <span className="services-result-label">
              PROFESSIONALS
            </span>

            <h2>
              {selectedCategory === "All"
                ? "Available professionals"
                : `${selectedCategory} professionals`}
            </h2>

            <p>
              {filteredProviders.length} professional
              {filteredProviders.length !== 1
                ? "s"
                : ""}{" "}
              found
            </p>

          </div>


          {(search || selectedCategory !== "All") && (
            <button
              className="clear-filters-btn"
              onClick={clearSearch}
            >
              Clear filters
            </button>
          )}

        </div>


        {/* PROVIDER GRID */}

        {filteredProviders.length > 0 ? (
          <div className="services-provider-grid">

            {filteredProviders.map((provider) => (
              <ServiceProviderCard
                key={provider.id || provider.name}
                provider={provider}
                onViewProfile={onViewProfile}
              />
            ))}

          </div>
        ) : (
          <div className="services-empty">

            <div className="services-empty-icon">
              🔍
            </div>

            <h3>
              No professionals found
            </h3>

            <p>
              Try another service, location or
              search term.
            </p>

            <button
              className="primary-dashboard-btn"
              onClick={clearSearch}
            >
              View All Professionals
            </button>

          </div>
        )}

      </main>

    </div>
  );
}


/* =====================================================
   PROVIDER CARD
===================================================== */

function ServiceProviderCard({
  provider,
  onViewProfile,
}) {
  const [favorite, setFavorite] = useState(false);

  return (
    <article className="services-provider-card">

      {/* CARD TOP */}

      <div className="services-provider-top">

        <div className="services-provider-avatar">
          {provider.name
            ?.charAt(0)
            .toUpperCase()}
        </div>

        <button
          className={`services-favorite ${
            favorite ? "active" : ""
          }`}
          onClick={() =>
            setFavorite(!favorite)
          }
          aria-label="Favorite"
        >
          {favorite ? "♥" : "♡"}
        </button>

      </div>


      {/* PROVIDER INFO */}

      <div className="services-provider-info">

        <div className="services-provider-name-row">

          <h3>
            {provider.name}
          </h3>

          <span className="verified-badge">
            ✓
          </span>

        </div>

        <p className="services-provider-service">
          {provider.service}
        </p>

        <div className="services-rating">

          <span>
            ★
          </span>

          <strong>
            {provider.rating}
          </strong>

          <small>
            ({provider.reviews} reviews)
          </small>

        </div>

      </div>


      {/* DETAILS */}

      <div className="services-provider-details">

        <div>
          <span>📍</span>
          {provider.location}
        </div>

        <div>
          <span>📏</span>
          {provider.distance} away
        </div>

        <div>
          <span>💼</span>
          {provider.experience} experience
        </div>

      </div>


      {/* DESCRIPTION */}

      <p className="services-provider-description">
        {provider.description}
      </p>


      {/* SERVICES */}

      {provider.services?.length > 0 && (
        <div className="services-provider-tags">

          {provider.services
            .slice(0, 3)
            .map((service) => (
              <span key={service}>
                {service}
              </span>
            ))}

        </div>
      )}


      {/* BOTTOM */}

      <div className="services-provider-bottom">

        <div>

          <small>
            Starting from
          </small>

          <strong>
            {provider.price}
          </strong>

        </div>

        <span
          className={`provider-availability ${
            provider.available
              ? "available"
              : "unavailable"
          }`}
        >
          {provider.available
            ? "● Available"
            : "● Unavailable"}
        </span>

      </div>


      <button
        className="services-view-profile-btn"
        onClick={() => {
          if (onViewProfile) {
            onViewProfile(provider);
          } else {
            alert(
              `Opening ${provider.name}'s profile`
            );
          }
        }}
      >
        View Profile →
      </button>

    </article>
  );
}


export default Services;
