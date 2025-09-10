import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  CircularProgress,
  Container
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { useVideo } from '../contexts/VideoContext';
import VideoCard from '../components/VideoCard';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchResults, loading, searchVideos } = useVideo();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [activeTab, setActiveTab] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (query) {
      performSearch();
    }
  }, [query]);

  const performSearch = async () => {
    const result = await searchVideos(query, { page: 1, limit: 20 });
    setTotalResults(result.total);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Search Bar */}
      <Box component="form" onSubmit={handleSearch} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search videos, channels, and more"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit" edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '40px',
            },
          }}
        />
      </Box>

      {/* Results Header */}
      {query && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Search results for "{query}"
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {totalResults} results found
          </Typography>
        </Box>
      )}

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Videos" />
          <Tab label="Channels" />
        </Tabs>
      </Box>

      {/* Loading */}
      {loading && (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      )}

      {/* Results */}
      {!loading && query && (
        <>
          {activeTab === 0 && (
            <Grid container spacing={3}>
              {searchResults.map((video) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={video._id}>
                  <VideoCard video={video} />
                </Grid>
              ))}
            </Grid>
          )}

          {activeTab === 1 && (
            <Box>
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                Channel search functionality coming soon!
              </Typography>
            </Box>
          )}

          {searchResults.length === 0 && activeTab === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No videos found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try different keywords or check your spelling
              </Typography>
            </Box>
          )}
        </>
      )}

      {/* No Search Query */}
      {!query && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Search for videos, channels, and more
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Enter your search query above to get started
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Search;
