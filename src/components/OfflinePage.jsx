import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Container
} from '@mui/material';
import {
  WifiOff as OfflineIcon,
  Refresh as RefreshIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const OfflinePage = () => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: 'center',
          borderRadius: 3,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}
      >
        <Box sx={{ mb: 3 }}>
          <OfflineIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            You're Offline
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            It looks like you're not connected to the internet. Don't worry, you can still browse some content that was previously loaded.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            sx={{ textTransform: 'none' }}
          >
            Try Again
          </Button>
          <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            onClick={handleGoHome}
            sx={{ textTransform: 'none' }}
          >
            Go Home
          </Button>
        </Box>

        <Box sx={{ mt: 4, p: 2, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 2 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Offline Features Available:</strong>
            <br />
            • Browse previously loaded videos
            <br />
            • View cached content
            <br />
            • Access your library
            <br />
            • Read comments (if cached)
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default OfflinePage;

