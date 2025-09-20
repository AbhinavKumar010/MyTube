import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Container,
  CircularProgress,
  Tabs,
  Tab,
  Chip,
  Paper
} from '@mui/material';
import { useVideo } from '../contexts/VideoContext';
import VideoCard from '../components/VideoCard';

const Trending = () => {
  const { videos, loading, fetchVideos } = useVideo();
  const [activeTab, setActiveTab] = useState(0);
  const [trendingVideos, setTrendingVideos] = useState([]);

  const categories = [
    { label: 'Now', value: 'now' },
    { label: 'Music', value: 'music' },
    { label: 'Gaming', value: 'gaming' },
    { label: 'News', value: 'news' },
    { label: 'Movies', value: 'movies' },
    { label: 'Live', value: 'live' }
  ];

  useEffect(() => {
    fetchTrendingVideos();
  }, [activeTab]);

  const fetchTrendingVideos = async () => {
    const category = categories[activeTab].value;
    const result = await fetchVideos({
      category: category === 'now' ? '' : category,
      sortBy: 'views',
      page: 1,
      limit: 20
    });
    setTrendingVideos(result.videos);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading && trendingVideos.length === 0) {
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
            Trending
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}>
            The most popular videos on YouTube right now
          </Typography>
        </Box>

        {/* Category Tabs */}
        <Paper sx={{ mb: 3, borderRadius: 2 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                minWidth: 'auto',
                px: { xs: 1.5, sm: 2 },
                py: 1,
                mr: { xs: 0.5, sm: 1 },
                borderRadius: '20px',
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              },
            }}
          >
            {categories.map((category, index) => (
              <Tab
                key={category.value}
                label={category.label}
                value={index}
              />
            ))}
          </Tabs>
        </Paper>

        {/* Trending Videos Grid */}
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          {trendingVideos.map((video, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={video._id}>
              <Box sx={{ position: 'relative' }}>
                <VideoCard video={video} />
                {index < 3 && (
                  <Chip
                    label={`#${index + 1} Trending`}
                    color="primary"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.7rem'
                    }}
                  />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>

        {trendingVideos.length === 0 && !loading && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No trending videos found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Check back later for trending content
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Trending;
