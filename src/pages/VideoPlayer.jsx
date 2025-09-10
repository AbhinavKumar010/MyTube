import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Avatar,
  Chip,
  Divider,
  TextField,
  CircularProgress,
  Grid,
  Paper
} from '@mui/material';
import {
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Share as ShareIcon,
  PlaylistAdd as PlaylistAddIcon,
  MoreVert as MoreVertIcon,
  Send as SendIcon
} from '@mui/icons-material';
import EnhancedVideoPlayer from '../components/EnhancedVideoPlayer';
import { useParams, useNavigate } from 'react-router-dom';
import { useVideo } from '../contexts/VideoContext';
import { useAuth } from '../contexts/AuthContext';
import VideoCard from '../components/VideoCard';
import CommentSection from '../components/CommentSection';

const VideoPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentVideo, fetchVideo, likeVideo, dislikeVideo, subscribeToChannel, videos } = useVideo();
  const { user, isAuthenticated } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchVideo(id).then((video) => {
        if (video) {
          setLikeCount(video.likeCount);
          setDislikeCount(video.dislikeCount);
          setSubscriberCount(video.uploader?.subscriberCount || 0);
        }
        setLoading(false);
      });
    }
  }, [id, fetchVideo]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const result = await likeVideo(id);
      if (result) {
        setIsLiked(result.isLiked);
        setLikeCount(result.likeCount);
        if (result.isLiked && isDisliked) {
          setIsDisliked(false);
          setDislikeCount(result.dislikeCount);
        }
      }
    } catch (error) {
      console.error('Error liking video:', error);
    }
  };

  const handleDislike = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const result = await dislikeVideo(id);
      if (result) {
        setIsDisliked(result.isDisliked);
        setDislikeCount(result.dislikeCount);
        if (result.isDisliked && isLiked) {
          setIsLiked(false);
          setLikeCount(result.likeCount);
        }
      }
    } catch (error) {
      console.error('Error disliking video:', error);
    }
  };

  const handleSubscribe = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const result = await subscribeToChannel(currentVideo.uploader._id);
      if (result) {
        setIsSubscribed(result.isSubscribed);
        setSubscriberCount(result.subscriberCount);
      }
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  const formatViewCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M views`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K views`;
    }
    return `${count} views`;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!currentVideo) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography variant="h5" color="text.secondary">
          Video not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 },
      backgroundColor: '#f9f9f9',
      minHeight: '100vh'
    }}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {/* Main Video Section */}
        <Grid item xs={12} lg={8}>
          {/* Video Player */}
          <Box sx={{ mb: 2 }}>
            <EnhancedVideoPlayer
              url={currentVideo.videoUrl}
              playing={false}
              volume={0.8}
              playbackRate={1}
              onPlayPause={(playing) => console.log('Playing:', playing)}
              onVolumeChange={(volume) => console.log('Volume:', volume)}
              onPlaybackRateChange={(rate) => console.log('Rate:', rate)}
              onProgress={(state) => console.log('Progress:', state)}
              onDuration={(duration) => console.log('Duration:', duration)}
              onEnded={() => console.log('Video ended')}
            />
          </Box>

          {/* Video Info */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
              {currentVideo.title}
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between', 
              mb: 2,
              gap: 1
            }}>
              <Typography variant="body2" color="text.secondary">
                {formatViewCount(currentVideo.views)} • {new Date(currentVideo.createdAt).toLocaleDateString()}
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: { xs: 0.5, sm: 1 },
                flexWrap: 'wrap'
              }}>
                <Button
                  startIcon={<ThumbUpIcon />}
                  onClick={handleLike}
                  color={isLiked ? 'primary' : 'inherit'}
                  variant={isLiked ? 'contained' : 'outlined'}
                  size="small"
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                >
                  {likeCount}
                </Button>
                <Button
                  startIcon={<ThumbDownIcon />}
                  onClick={handleDislike}
                  color={isDisliked ? 'primary' : 'inherit'}
                  variant={isDisliked ? 'contained' : 'outlined'}
                  size="small"
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                >
                  {dislikeCount}
                </Button>
                <Button
                  startIcon={<ShareIcon />}
                  variant="outlined"
                  size="small"
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                >
                  Share
                </Button>
                <Button
                  startIcon={<PlaylistAddIcon />}
                  variant="outlined"
                  size="small"
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                >
                  Save
                </Button>
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* Channel Info */}
          <Paper sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  src={currentVideo.uploader?.profilePicture}
                  sx={{ width: 48, height: 48 }}
                >
                  {currentVideo.uploader?.username?.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    {currentVideo.uploader?.channelName || currentVideo.uploader?.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {subscriberCount} subscribers
                  </Typography>
                </Box>
              </Box>
              <Button
                variant={isSubscribed ? 'outlined' : 'contained'}
                color="primary"
                onClick={handleSubscribe}
                sx={{ textTransform: 'none' }}
              >
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </Button>
            </Box>
          </Paper>

          {/* Video Description */}
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
              {currentVideo.description}
            </Typography>
            {currentVideo.tags && currentVideo.tags.length > 0 && (
              <Box sx={{ mt: 2 }}>
                {currentVideo.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={`#${tag}`}
                    size="small"
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Box>
            )}
          </Paper>

          {/* Comments */}
          <CommentSection videoId={id} />
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          <Typography variant="h6" gutterBottom>
            Recommended Videos
          </Typography>
          {videos.slice(0, 5).map((video) => (
            <Box key={video._id} sx={{ mb: 2 }}>
              <VideoCard video={video} />
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default VideoPlayer;
