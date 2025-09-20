import { Link } from "react-router-dom";
import { useState } from "react";
import "./VideoCard.css";

function VideoCard({ video }) {
  const [hovered, setHovered] = useState(false);

  // Use environment variable for backend URL
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  return (
    <div
      className="video-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/video/${video._id}`}>
        {/* Hover preview video */}
        {hovered && video.videoUrl ? (
          <video
            className="thumbnail"
            src={video.videoUrl ? `${backendURL}${video.videoUrl}` : ""}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={
              video.thumbnailUrl
                ? `${backendURL}${video.thumbnailUrl}`
                : "/default-thumbnail.png"
            }
            alt={video.title || "Untitled Video"}
            className="thumbnail"
          />
        )}

        {/* Video info */}
        <div className="video-info">
          <h3 className="video-title">{video.title || "Untitled Video"}</h3>
          <p className="video-uploader">{video.uploader || "Unknown"}</p>
          <p className="video-views">
            {video.views ?? 0} views •{" "}
            {video.createdAt
              ? new Date(video.createdAt).toLocaleDateString()
              : ""}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default VideoCard;
