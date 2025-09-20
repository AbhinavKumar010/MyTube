import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  CircularProgress,
  Tabs,
  Tab,
  Typography,
  Chip
} from '@mui/material';
import VideoCard from '../components/VideoCard';
import { useVideo } from '../contexts/VideoContext';
import './Home.css'; // ✅ Import the CSS file

const categories = [
  'All', 'Gaming', 'Music', 'Education', 'Entertainment',
  'Sports', 'News', 'Tech'
];

const Home = () => {
  const { videos, loading, fetchVideos } = useVideo();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchVideos({
      category: selectedCategory === 'All' ? '' : selectedCategory,
      page: currentPage,
      limit: 12
    });
  }, [selectedCategory, currentPage]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  if (loading && videos.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box className="home-container">
      <Container maxWidth="xl">
        
        {/* Category Filter */}
        <Box className="category-filter">
          <Tabs
            value={selectedCategory}
            onChange={(e, value) => handleCategoryChange(value)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {categories.map(category => (
              <Tab key={category} label={category} value={category} />
            ))}
          </Tabs>
        </Box>

        {/* Videos Grid */}
        <Box className="videos-grid">
          {videos.map(video => (
            <VideoCard key={video._id} video={video} />
          ))}
        </Box>

        {/* Load More Button */}
        {videos.length > 0 && (
          <Box display="flex" justifyContent="center" mt={5}>
            <Chip
              label="Load More"
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="load-more-chip"
            />
          </Box>
        )}

        {/* Empty State */}
        {!loading && videos.length === 0 && (
          <Box className="empty-videos">
            <Typography variant="h5" gutterBottom>
              No videos found
            </Typography>
            <Typography variant="body1">
              Try selecting a different category or check back later for new content.
            </Typography>
          </Box>
        )}

      </Container>
    </Box>
  );
};

export default Home;
