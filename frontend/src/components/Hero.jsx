import { useState } from "react";

function Hero({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    onSearch(search);
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          🛠️ Trusted Local Services
        </div>

        <h1>
          Find Trusted
          <span> Local Help </span>
          Near You
        </h1>

        <p>
          Find verified local professionals for your home,
          education and everyday service needs.
        </p>

        <form className="search-box" onSubmit={handleSearch}>
          <span>🔍</span>

          <input
            type="text"
            placeholder="What service do you need?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit" className="search-btn">
            Search
          </button>
        </form>

        <div className="popular-searches">
          <span>Popular:</span>
          <button onClick={() => onSearch("Electrician")}>
            Electrician
          </button>
          <button onClick={() => onSearch("Plumber")}>
            Plumber
          </button>
          <button onClick={() => onSearch("AC Repair")}>
            AC Repair
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;