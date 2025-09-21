import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "../pages/Search"; // Your existing Search component
import SearchIcon from "@mui/icons-material/Search"; // Real search icon
import "./Navbar.css";

export default function Navbar() {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (term) => {
    if (term?.trim()) {
      navigate(`/search?q=${encodeURIComponent(term)}`);
      setMobileSearchOpen(false); // close mobile overlay after search
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <nav>
        <div className="navbar-left">
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          <div className="logo">
            <Link to="/">BharatTube</Link>
          </div>
        </div>

        {/* Desktop Search */}
        <div className="navbar-search">
          <Search onSearch={handleSearch} />
        </div>

        <div className="navbar-right">
          <button className="notifications">🔔</button>
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          {/* Mobile Search Button */}
          <button
            className="mobile-search-btn"
            onClick={() => setMobileSearchOpen(true)}
          >
            <SearchIcon />
          </button>
        </div>
      </nav>

      {/* Right Sidebar */}
      {sidebarOpen && (
        <div className="right-sidebar open">
          <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>
            ✖
          </button>
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
            <li><Link to="/subscriptions">🔔 Subscriptions</Link></li>
          </ul>
        </div>
      )}

      {/* Mobile Search Overlay */}
      {mobileSearchOpen && (
        <div className="mobile-search-overlay">
          <Search
            onSearch={handleSearch}
            placeholder="Search..."
          />
          <button
            type="button"
            className="close-overlay"
            onClick={() => setMobileSearchOpen(false)}
          >
            ✖
          </button>
          <div className="search-recommendations">
            <p onClick={() => handleSearch("Musics")}>Musics</p>
            <p onClick={() => handleSearch("Comedies")}>Comedies</p>
            <p onClick={() => handleSearch("Movies")}>Movies</p>
          </div>
        </div>
      )}
    </>
  );
}
