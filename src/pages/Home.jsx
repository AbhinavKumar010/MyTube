import React, { useState, useEffect } from 'react';
import { Container, Tabs, Tab, Typography, Chip, CircularProgress } from '@mui/material';
import VideoCard from '../components/VideoCard';
import { useVideo } from '../contexts/VideoContext';
import './Home.css';

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

  const handleCategoryChange = (event, value) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  if (loading && videos.length === 0) {
    return (
      <div className="home-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress color="primary" />
      </div>
    );
  }

  return (
    <div className="home-container">
      <Container maxWidth="xl">

        {/* Category Filter */}
        <div className="category-filter">
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {categories.map(category => (
              <Tab key={category} label={category} value={category} />
            ))}
          </Tabs>
        </div>

        {/* Videos Grid */}
        <div className="videos-grid">
          {videos.map(video => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>

        {/* Load More */}
        {videos.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <Chip
              label="Load More"
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="load-more-chip"
            />
          </div>
        )}

        {/* Empty State */}
        {!loading && videos.length === 0 && (
          <div className="empty-videos">
            <Typography variant="h5" gutterBottom>
              No videos found
            </Typography>
            <Typography variant="body1">
              Try selecting a different category or check back later for new content.
            </Typography>
          </div>
        )}

      </Container>
    </div>
  );
};

export default Home;
