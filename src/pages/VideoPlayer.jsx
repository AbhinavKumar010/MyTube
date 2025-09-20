import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./VideoPlayer.css";

function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestedVideos, setSuggestedVideos] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/videos/${id}`);
        if (!res.ok) throw new Error("Failed to fetch video");
        const data = await res.json();
        setVideo(data);

        const res2 = await fetch("http://localhost:5000/api/videos");
        if (!res2.ok) throw new Error("Failed to fetch suggested videos");
        const allVideos = await res2.json();
        setSuggestedVideos(allVideos.filter(v => v._id !== id));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!video) return <p className="text-center mt-20">Video not found</p>;

  return (
    <div className="video-player-container">
      <div className="main-video">
        <video
          src={`http://localhost:5000${video.videoUrl}`}
          controls
          className="video-element"
        />
        <h1 className="video-title">{video.title}</h1>
        <p className="video-meta">
          {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
        </p>
        <p className="video-description">{video.description}</p>
      </div>

      <div className="suggested-videos">
        <h2>Suggested Videos</h2>
        {suggestedVideos.map((sv) => (
          <Link key={sv._id} to={`/video/${sv._id}`} className="suggested-video-card">
            <img
              src={sv.thumbnailUrl ? `http://localhost:5000${sv.thumbnailUrl}` : "/default-thumbnail.png"}
              alt={sv.title}
              className="suggested-thumbnail"
            />
            <div className="suggested-info">
              <p className="suggested-title">{sv.title}</p>
              <p className="suggested-uploader">{sv.uploader || "Unknown"}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default VideoPlayer;
