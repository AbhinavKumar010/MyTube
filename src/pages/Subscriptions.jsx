import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Container,
  CircularProgress,
  Paper,
  Avatar,
  Button,
  Chip,
  Tabs,
  Tab
} from '@mui/material';
import { useVideo } from '../contexts/VideoContext';
import { useAuth } from '../contexts/AuthContext';
import VideoCard from '../components/VideoCard';
import axios from 'axios';

const Subscriptions = () => {
  const { videos, loading, fetchSubscriptionFeed } = useVideo();
  const { isAuthenticated } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubscriptions();
      fetchSubscriptionFeed();
    }
  }, [isAuthenticated]);

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get('/api/users/subscriptions');
      setSubscriptions(response.data.subscriptions || []);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Sign in to see your subscriptions
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Subscribe to channels to see their latest videos here
          </Typography>
          <Button variant="contained" href="/login" size="large">
            Sign In
          </Button>
        </Paper>
      </Container>
    );
  }

  if (loading && videos.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2, md: 3 } }}>
      <Container maxWidth="xl" sx={{ px: { xs: 0, sm: 2 } }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ 
            fontWeight: 'bold',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
          }}>
            Subscriptions
          </Typography>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Latest" />
            <Tab label="Channels" />
          </Tabs>
        </Box>

        {/* Content */}
        {activeTab === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Latest from your subscriptions
            </Typography>
            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
              {videos.map((video) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={video._id}>
                  <VideoCard video={video} />
                </Grid>
              ))}
            </Grid>
            {videos.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No videos from your subscriptions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Subscribe to some channels to see their latest videos here
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Your subscriptions ({subscriptions.length})
            </Typography>
            <Grid container spacing={2}>
              {subscriptions.map((channel) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={channel._id}>
                  <Paper sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }}>
                    <Avatar
                      src={channel.profilePicture}
                      sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
                    >
                      {channel.username?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="h6" gutterBottom>
                      {channel.channelName || channel.username}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {channel.subscriberCount} subscribers
                    </Typography>
                    <Chip
                      label="Subscribed"
                      color="primary"
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
            {subscriptions.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No subscriptions yet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Subscribe to channels to see them here
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Subscriptions;
