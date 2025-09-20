import { useEffect, useState } from "react";
import VideoGrid from "../components/VideoGrid";
import "./Home.css";

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/videos");
        if (!res.ok) throw new Error("Failed to fetch videos");
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading videos...</p>;

  return (
    <div className="home-container">
      {videos.length > 0 ? (
        <VideoGrid videos={videos} />
      ) : (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>No videos available</p>
      )}
    </div>
  );
}

export default Home;
