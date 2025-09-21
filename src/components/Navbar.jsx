import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Right sidebar
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for "${searchTerm}"`);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <nav>
        <div className="navbar-left">
          <button 
            className="hamburger"
            onClick={() => setSidebarOpen(true)} // open sidebar
          >
            ☰
          </button>
          <div className="logo">
            <Link to="/">BharatTube</Link>
          </div>
        </div>

        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>

        <div className="navbar-right">
          
          <button className="notifications">🔔</button>
          <button className="login-btn" onClick={handleLogin}>Login</button>

          <button
            className="mobile-search-btn"
            onClick={() => setMobileSearchOpen(true)}
          >
            🔍
          </button>
        </div>
      </nav>

      {/* Right Sidebar */}
      {sidebarOpen && (
        <div className="right-sidebar open">
          <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>✖</button>
          <ul className="sidebar-menu">
            <li><Link to="/music">🎵 Music</Link></li>
            <li><Link to="/films">🎬 Films</Link></li>
            <li><Link to="/hype">🔥 Hype</Link></li>
            <li><Link to="/live">📺 Live</Link></li>
            <li><Link to="/gaming">🎮 Gaming</Link></li>
            <li><Link to="/news">📰 News</Link></li>
            <li><Link to="/sports">🏅 Sports</Link></li>
            <li><Link to="/courses">📚 Courses</Link></li>
            <li><Link to="/fashion">💄 Fashion & Beauty</Link></li>
          </ul>
        </div>
      )}

      {/* Mobile Search Overlay */}
      {mobileSearchOpen && (
        <div className="mobile-search-overlay">
          <form className="mobile-search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            <button type="submit">🔍</button>
            <button
              type="button"
              className="close-overlay"
              onClick={() => setMobileSearchOpen(false)}
            >
              ✖
            </button>
          </form>
          <div className="search-recommendations">
            <p>Recommendation 1</p>
            <p>Recommendation 2</p>
            <p>Recommendation 3</p>
          </div>
        </div>
      )}
    </>
  );
}
