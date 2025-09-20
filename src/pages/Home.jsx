import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Chip,
  Container,
  CircularProgress,
  Tabs,
  Tab
} from '@mui/material';
import VideoCard from '../components/VideoCard';
import { useVideo } from '../contexts/VideoContext';

const categories = [
  'All',
  'Gaming',
  'Music',
  'Education',
  'Entertainment',
  'Sports',
  'News',
  'Tech'
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
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      flexGrow: 1, 
      p: { xs: 2, sm: 3, md: 4 },
      backgroundColor: '#f9f9f9',
      minHeight: '100vh'
    }}>
      <Container maxWidth="xl" sx={{ px: { xs: 0, sm: 1 } }}>
        {/* Category Filter */}
        <Box sx={{ 
          mb: 4, 
          px: { xs: 1, sm: 0 },
          backgroundColor: 'white',
          borderRadius: 3,
          p: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <Tabs
            value={selectedCategory}
            onChange={(e, value) => handleCategoryChange(value)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                minWidth: 'auto',
                px: { xs: 2, sm: 3 },
                py: 1.5,
                mr: { xs: 1, sm: 1.5 },
                borderRadius: '25px',
                backgroundColor: selectedCategory === 'All' ? 'primary.main' : 'grey.100',
                color: selectedCategory === 'All' ? 'white' : 'text.primary',
                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                fontWeight: 500,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: selectedCategory === 'All' ? 'primary.dark' : 'grey.200',
                  transform: 'translateY(-1px)',
                },
              },
            }}
          >
            {categories.map((category) => (
              <Tab
                key={category}
                label={category}
                value={category}
              />
            ))}
          </Tabs>
        </Box>

        {/* Videos Grid */}
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          {videos.map((video) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={video._id}>
              <VideoCard video={video} />
            </Grid>
          ))}
        </Grid>

        {/* Load More Button */}
        {videos.length > 0 && (
          <Box
            display="flex"
            justifyContent="center"
            mt={4}
          >
            <Chip
              label="Load More"
              onClick={() => setCurrentPage(prev => prev + 1)}
              sx={{
                px: 3,
                py: 1,
                fontSize: '1rem',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                },
              }}
            />
          </Box>
        )}

        {!loading && videos.length === 0 && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="50vh"
            textAlign="center"
          >
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No videos found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try selecting a different category or check back later for new content.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Home;