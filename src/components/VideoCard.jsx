import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate(`/video/${video._id}`);
  };

  const handleChannelClick = (e) => {
    e.stopPropagation();
    navigate(`/channel/${video.uploader._id}`);
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatViewCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M views`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K views`;
    }
    return `${count} views`;
  };

  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        },
        '&:active': {
          transform: 'scale(0.98)',
        },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        backgroundColor: 'white',
        border: '1px solid rgba(0,0,0,0.05)',
      }}
      onClick={handleVideoClick}
    >
      {/* Thumbnail */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height={{ xs: 180, sm: 200 }}
          image={video.thumbnailUrl || '/placeholder-thumbnail.jpg'}
          alt={video.title}
          sx={{
            objectFit: 'cover',
          }}
        />
        {/* Duration Badge */}
        <Chip
          label={formatDuration(video.duration)}
          size="small"
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            fontSize: '0.75rem',
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2 } }}>
        {/* Title */}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontSize: { xs: '0.9rem', sm: '1rem' },
            fontWeight: 500,
            lineHeight: 1.3,
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {video.title}
        </Typography>

        {/* Channel Info */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 1,
            cursor: 'pointer',
          }}
          onClick={handleChannelClick}
        >
          <Avatar
            src={video.uploader?.profilePicture}
            sx={{ width: { xs: 28, sm: 32 }, height: { xs: 28, sm: 32 }, mr: 1 }}
          >
            {video.uploader?.username?.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                fontWeight: 500,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {video.uploader?.channelName || video.uploader?.username}
            </Typography>
          </Box>
        </Box>

        {/* Stats */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
            {formatViewCount(video.views)}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
            •
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
            {formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}
          </Typography>
        </Box>

        {/* Category */}
        {video.category && video.category !== 'Other' && (
          <Chip
            label={video.category}
            size="small"
            sx={{
              mt: 1,
              fontSize: '0.7rem',
              height: 20,
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default VideoCard;

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
