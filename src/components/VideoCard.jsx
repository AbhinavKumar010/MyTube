import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  if (!video) return null;

  const handleVideoClick = () => {
    if (video._id) navigate(`/video/${video._id}`);
  };

  const handleChannelClick = (e) => {
    e.stopPropagation();
    if (video.uploader?._id) navigate(`/channel/${video.uploader._id}`);
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return hrs > 0
      ? `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      : `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatViewCount = (count = 0) => {
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M views`;
    if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K views`;
    return `${count} views`;
  };

  return (
    <Card
      onClick={handleVideoClick}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        backgroundColor: 'white',
        border: '1px solid rgba(0,0,0,0.08)',
        width: '100%',
        maxWidth: 360,
        margin: 'auto',

        // Responsive design
        '@media (max-width: 600px)': {
          maxWidth: '100%',
          borderRadius: 0,
          boxShadow: 'none',
          border: 'none',
        },
      }}
    >
      {/* Thumbnail */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height={200}
          image={video.thumbnail || '/placeholder-thumbnail.jpg'}
          alt={video.title || 'Untitled Video'}
          sx={{
            objectFit: 'cover',
            '@media (max-width: 600px)': {
              height: 160,
            },
          }}
        />
        <Chip
          label={formatDuration(video.duration)}
          size="small"
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            backgroundColor: 'rgba(0,0,0,0.8)',
            color: 'white',
            fontSize: '0.75rem',
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontSize: '1rem',
            fontWeight: 500,
            lineHeight: 1.3,
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {video.title || 'Untitled Video'}
        </Typography>

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
            src={video.uploader?.profilePicture || ''}
            sx={{
              width: 32,
              height: 32,
              mr: 1,
              '@media (max-width: 600px)': { width: 28, height: 28 },
            }}
          >
            {video.uploader?.username?.charAt(0).toUpperCase() || '?'}
          </Avatar>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontWeight: 500,
              fontSize: '0.9rem',
              '@media (max-width: 600px)': { fontSize: '0.8rem' },
            }}
          >
            {video.uploader?.channelName || video.uploader?.username || 'Unknown Channel'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            {formatViewCount(video.views)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            •
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {video.createdAt
              ? formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })
              : 'Unknown'}
          </Typography>
        </Box>

        {video.category && video.category !== 'Other' && (
          <Chip
            label={video.category}
            size="small"
            sx={{
              mt: 1,
              fontSize: '0.7rem',
              height: 20,
              '@media (max-width: 600px)': { fontSize: '0.65rem' },
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default VideoCard;
