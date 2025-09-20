import { Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import UploadVideo from "../pages/UploadVideo";
import Login from "../components/Login";
import Profile from "../pages/Profile";
import VideoPlayer from "../pages/VideoPlayer"; // ✅ Import this
import "./Sidebar.css";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      
      {/* Main content area */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadVideo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/video/:id" element={<VideoPlayer />} /> {/* ✅ Add this */}
        </Routes>
      </div>

      {/* Bottom navigation icons */}
      <div className="bottom-nav">
        <Link to="/" className="bottom-nav-btn" title="Home">🏠</Link>
        <Link to="/upload" className="bottom-nav-btn" title="Upload">⬆️</Link>
        <Link to="/login" className="bottom-nav-btn" title="Login">🔑</Link>
        <Link to="/profile" className="bottom-nav-btn" title="Profile">👤</Link>
      </div>
    </div>
  );
}

export default App;
