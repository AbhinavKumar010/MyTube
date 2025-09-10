import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Tabs,
  Tab,
  Grid,
  Paper,
  CircularProgress,
  Container
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import VideoCard from '../components/VideoCard';
import axios from 'axios';

const Channel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser, subscribeToChannel } = useAuth();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetchChannelData();
  }, [id]);

  const fetchChannelData = async () => {
    try {
      const [channelResponse, videosResponse] = await Promise.all([
        axios.get(`/api/users/${id}`),
        axios.get(`/api/users/${id}/videos`)
      ]);

      setChannel(channelResponse.data.user);
      setVideos(videosResponse.data.videos);
      setSubscriberCount(channelResponse.data.user.subscriberCount);

      // Check if current user is subscribed
      if (currentUser) {
        try {
          const subResponse = await axios.get(`/api/subscriptions/check/${id}`);
          setIsSubscribed(subResponse.data.isSubscribed);
        } catch (error) {
          console.error('Error checking subscription:', error);
        }
      }
    } catch (error) {
      console.error('Error fetching channel data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    try {
      const result = await subscribeToChannel(id);
      if (result) {
        setIsSubscribed(result.isSubscribed);
        setSubscriberCount(result.subscriberCount);
      }
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!channel) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5" color="text.secondary" sx={{ textAlign: 'center' }}>
          Channel not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Channel Header */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
          <Avatar
            src={channel.profilePicture}
            sx={{ width: 80, height: 80 }}
          >
            {channel.username?.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
              {channel.channelName || channel.username}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              @{channel.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {subscriberCount} subscribers
            </Typography>
          </Box>
          <Button
            variant={isSubscribed ? 'outlined' : 'contained'}
            color="primary"
            onClick={handleSubscribe}
            disabled={currentUser?._id === channel._id}
            sx={{ textTransform: 'none', px: 3 }}
          >
            {currentUser?._id === channel._id ? 'Your Channel' : isSubscribed ? 'Subscribed' : 'Subscribe'}
          </Button>
        </Box>

        {channel.channelDescription && (
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {channel.channelDescription}
          </Typography>
        )}
      </Paper>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Videos" />
          <Tab label="About" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Box>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Videos ({videos.length})
          </Typography>
          <Grid container spacing={3}>
            {videos.map((video) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={video._id}>
                <VideoCard video={video} />
              </Grid>
            ))}
          </Grid>
          {videos.length === 0 && (
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              No videos uploaded yet.
            </Typography>
          )}
        </Box>
      )}

      {activeTab === 1 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            About {channel.channelName || channel.username}
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Username:</strong> {channel.username}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Subscribers:</strong> {subscriberCount}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Videos:</strong> {videos.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Joined:</strong> {new Date(channel.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
          {channel.channelDescription && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {channel.channelDescription}
              </Typography>
            </Box>
          )}
        </Paper>
      )}
    </Container>
  );
};

export default Channel;
