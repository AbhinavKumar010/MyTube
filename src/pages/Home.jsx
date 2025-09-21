import React, { useState, useEffect } from 'react';
import { Box, Container, CircularProgress, Tabs, Tab, Typography, Chip } from '@mui/material';
import VideoCard from '../components/VideoCard';
import { useVideo } from '../contexts/VideoContext';
import './Home.css';

const categories = ['All', 'Gaming', 'Music', 'Education', 'Entertainment', 'Sports', 'News', 'Tech'];

const Home = () => {
  const { videos, loading, fetchVideos } = useVideo();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchVideos({
      category: selectedCategory === 'All' ? '' : selectedCategory,
      page: currentPage,
      limit: 12,
    });
  }, [selectedCategory, currentPage]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <Box className="page-container">
      <Container className="page-content" maxWidth="xl">

        {/* Category Filter */}
        <Box className="category-filter">
          <Tabs
            value={selectedCategory}
            onChange={(e, value) => handleCategoryChange(value)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {categories.map((category) => (
              <Tab key={category} label={category} value={category} />
            ))}
          </Tabs>
        </Box>

        {/* Videos Grid */}
        {loading && videos.length === 0 ? (
          <Box className="loading-box">
            <CircularProgress color="primary" />
          </Box>
        ) : videos.length > 0 ? (
          <Box className="videos-grid">
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </Box>
        ) : (
          <Box className="empty-videos">
            <Typography variant="h5" gutterBottom>
              No videos found
            </Typography>
            <Typography variant="body1">
              Try selecting a different category or check back later for new content.
            </Typography>
          </Box>
        )}

        {/* Load More */}
        {videos.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Chip
              label="Load More"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="load-more-chip"
            />
          </Box>
        )}

      </Container>
    </Box>
  );
};

export default Home;
