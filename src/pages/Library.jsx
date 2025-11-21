import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  Paper,
  CircularProgress,
  Container,
  Button
} from '@mui/material';
import {
  History as HistoryIcon,
  ThumbUp as ThumbUpIcon,
  PlaylistPlay as PlaylistIcon,
  WatchLater as WatchLaterIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useVideo } from '../contexts/VideoContext';
import VideoCard from '../components/VideoCard';
import axios from 'axios';

const Library = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { videos, fetchVideos } = useVideo();
  const [activeTab, setActiveTab] = useState(0);
  const [watchHistory, setWatchHistory] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const [userResponse, videosResponse] = await Promise.all([
        axios.get('/api/auth/me'),
        fetchVideos({ page: 1, limit: 20 })
      ]);

      const userData = userResponse.data.user;
      setWatchHistory(userData.watchHistory || []);
      setLikedVideos(userData.likedVideos || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
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
            Sign in to access your library
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Keep track of your watch history, liked videos, and playlists
          </Typography>
          <Button color="error"
            variant="contained"
            onClick={() => navigate('/login')}
            size="large"
          > 
            Sign In
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Library
      </Typography>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab icon={<HistoryIcon />} label="History" />
          <Tab icon={<ThumbUpIcon />} label="Liked videos" />
          <Tab icon={<PlaylistIcon />} label="Playlists" />
          <Tab icon={<WatchLaterIcon />} label="Watch later" />
        </Tabs>
      </Box>

      {/* Loading */}
      {loading && (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      )}

      {/* Tab Content */}
      {!loading && (
        <>
          {activeTab === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Watch History
              </Typography>
              {watchHistory.length > 0 ? (
                <Grid container spacing={3}>
                  {watchHistory.map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item.video._id}>
                      <VideoCard video={item.video} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="body1" color="text.secondary">
                    No watch history yet. Start watching some videos!
                  </Typography>
                </Paper>
              )}
            </Box>
          )}

          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Liked Videos
              </Typography>
              {likedVideos.length > 0 ? (
                <Grid container spacing={3}>
                  {likedVideos.map((video) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={video._id}>
                      <VideoCard video={video} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="body1" color="text.secondary">
                    No liked videos yet. Like some videos to see them here!
                  </Typography>
                </Paper>
              )}
            </Box>
          )}

          {activeTab === 2 && (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Playlists feature coming soon!
              </Typography>
            </Paper>
          )}

          {activeTab === 3 && (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Watch later feature coming soon!
              </Typography>
            </Paper>
          )}
        </>
      )}
    </Container>
  );
};

export default Library;
