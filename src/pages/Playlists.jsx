import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Container,
  CircularProgress,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  PlayArrow as PlayIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import VideoCard from '../components/VideoCard';
import axios from 'axios';

const Playlists = () => {
  const { user, isAuthenticated } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPlaylists();
    }
  }, [isAuthenticated]);

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get('/api/auth/me');
      setPlaylists(response.data.user.playlists || []);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) return;

    try {
      const response = await axios.post('/api/playlists', {
        name: newPlaylistName.trim()
      });
      setPlaylists([...playlists, response.data]);
      setNewPlaylistName('');
      setOpenDialog(false);
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const handleMenuOpen = (event, playlist) => {
    setAnchorEl(event.currentTarget);
    setSelectedPlaylist(playlist);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPlaylist(null);
  };

  const handleDeletePlaylist = async () => {
    if (!selectedPlaylist) return;

    try {
      await axios.delete(`/api/playlists/${selectedPlaylist._id}`);
      setPlaylists(playlists.filter(p => p._id !== selectedPlaylist._id));
      handleMenuClose();
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Sign in to manage your playlists
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Create and organize your favorite videos into playlists
          </Typography>
          <Button variant="contained" href="/login" size="large">
            Sign In
          </Button>
        </Paper>
      </Container>
    );
  }

  if (loading) {
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 'bold',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
          }}>
            Playlists
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            sx={{ textTransform: 'none' }}
          >
            Create Playlist
          </Button>
        </Box>

        {/* Playlists Grid */}
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          {playlists.map((playlist) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={playlist._id}>
              <Paper
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <Box
                    sx={{
                      height: 120,
                      backgroundColor: 'grey.200',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {playlist.videos && playlist.videos.length > 0 ? (
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {playlist.videos.slice(0, 4).map((video, index) => (
                          <Box
                            key={index}
                            sx={{
                              width: '25%',
                              height: '100%',
                              backgroundColor: 'grey.300',
                              borderRadius: 0.5
                            }}
                          />
                        ))}
                      </Box>
                    ) : (
                      <PlayIcon sx={{ fontSize: 40, color: 'grey.500' }} />
                    )}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.75rem'
                      }}
                    >
                      {playlist.videos?.length || 0} videos
                    </Box>
                  </Box>

                  <Typography variant="h6" gutterBottom sx={{ 
                    fontSize: '1rem',
                    fontWeight: 500,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {playlist.name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Created {new Date(playlist.createdAt).toLocaleDateString()}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                      variant="outlined"
                      startIcon={<PlayIcon />}
                      size="small"
                      sx={{ textTransform: 'none' }}
                    >
                      Play All
                    </Button>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, playlist)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {playlists.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No playlists yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Create your first playlist to organize your favorite videos
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Create Playlist
            </Button>
          </Box>
        )}

        {/* Create Playlist Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Create New Playlist</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Playlist Name"
              fullWidth
              variant="outlined"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleCreatePlaylist} variant="contained">
              Create
            </Button>
          </DialogActions>
        </Dialog>

        {/* Playlist Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <EditIcon sx={{ mr: 1 }} />
            Edit
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ShareIcon sx={{ mr: 1 }} />
            Share
          </MenuItem>
          <MenuItem onClick={handleDeletePlaylist} sx={{ color: 'error.main' }}>
            <DeleteIcon sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        </Menu>
      </Container>
    </Box>
  );
};

export default Playlists;
