import React, { useState, useEffect } from 'react';
import { Box, Container, CircularProgress, Tabs, Tab, Typography, Chip, Grid, Paper } from '@mui/material';
import VideoCard from '../components/VideoCard';
import TrilCard from '../components/TrillCard';
import { useVideo } from '../contexts/VideoContext';
import { mockVideos } from '../data/mockVideos';
import { mockTrils } from '../data/mockTrills';
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


        {/* Categories */}
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

        
        {/* 🔥 TRIL (Shorts Section) */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            Trills
          </Typography>

          <Box
            sx={{
              display: 'flex',
              overflowX: 'auto',
              p: 0.1,
              gap: 0.1,
              whiteSpace: 'nowrap',
              scrollbarWidth: 'none'
            }}
          >
            {mockTrils.map((tril) => (
              <TrilCard key={tril._id} tril={tril} />
            ))}
          </Box>
        </Box>

        {/* Videos Grid */}
        {loading && displayVideos.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            {displayVideos.map((video, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={video._id}>
                <VideoCard video={video} />
              </Grid>
            ))}
          </Grid>
        )}

      </Container>
    </Box>
  );
};

export default Home;
