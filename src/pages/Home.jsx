import React, { useState, useEffect } from 'react';
import { Box, Container, CircularProgress, Tabs, Tab, Typography, Chip, Grid, Paper } from '@mui/material';
import VideoCard from '../components/VideoCard';
import { useVideo } from '../contexts/VideoContext';
import { mockVideos } from '../data/mockVideos'; // Import mock videos
import './Home.css';

const categories = ['All', 'Gaming', 'Music', 'Education'];

const Home = () => {
  const { videos, loading, fetchVideos } = useVideo();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [displayVideos, setDisplayVideos] = useState([]);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const fetchedVideos = await fetchVideos({
          category: selectedCategory === 'All' ? '' : selectedCategory,
          page: currentPage,
          limit: 12,
        });

        // Use backend videos if available, otherwise fallback to mock videos
        setDisplayVideos(
          fetchedVideos?.videos && fetchedVideos.videos.length > 0
            ? fetchedVideos.videos
            : mockVideos
        );
      } catch (error) {
        console.error('Error loading videos, using mock data', error);
        setDisplayVideos(mockVideos);
      }
    };

    loadVideos();
  }, [selectedCategory, currentPage]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <Box className="page-container">
      <Container className="page-content" maxWidth="xl">

        {/* Category Filter */}
        <Paper sx={{ mb: 3, p: 1 }}>
          <Tabs
            value={selectedCategory}
            onChange={(e, value) => handleCategoryChange(value)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            {categories.map((category) => (
              <Tab key={category} label={category} value={category} />
            ))}
          </Tabs>
        </Paper>

        {/* Videos Grid */}
        {loading && displayVideos.length === 0 ? (
          <Box className="loading-box" sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : displayVideos.length > 0 ? (
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            {displayVideos.map((video, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={video._id}>
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
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: '0.7rem',
                    }}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box className="empty-videos" sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h5" gutterBottom>
              No videos found
            </Typography>
            <Typography variant="body1">
              Try selecting a different category or check back later for new content.
            </Typography>
          </Box>
        )}

        {/* Load More */}
        {displayVideos.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Chip
              label="Load More"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              sx={{ cursor: 'pointer', fontWeight: 'bold' }}
            />
          </Box>
        )}

      </Container>
    </Box>
  );
};

export default Home;
