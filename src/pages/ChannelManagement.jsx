import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Chip,
  Avatar,
  Divider,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  Badge,
} from '@mui/material';
import {
  Edit,
  Delete,
  Analytics,
  Settings,
  VideoCall,
  Subscriptions,
  Visibility,
  VisibilityOff,
  MoreVert,
  PlayArrow,
  Schedule,
  CheckCircle,
  Warning,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

const ChannelManagement = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showNotification } = useNotification();
  
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    category: '',
    privacy: 'public',
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockChannels = [
      {
        id: 1,
        name: 'Tech Reviews',
        description: 'Latest technology reviews and tutorials',
        category: 'Technology',
        privacy: 'public',
        subscribers: 12500,
        videos: 45,
        views: 250000,
        profileImage: null,
        bannerImage: null,
        isVerified: true,
        createdAt: '2023-01-15',
        lastVideo: '2024-01-10',
      },
      {
        id: 2,
        name: 'Gaming Channel',
        description: 'Gaming content and live streams',
        category: 'Gaming',
        privacy: 'public',
        subscribers: 8500,
        videos: 120,
        views: 180000,
        profileImage: null,
        bannerImage: null,
        isVerified: false,
        createdAt: '2023-06-20',
        lastVideo: '2024-01-08',
      },
    ];
    
    setTimeout(() => {
      setChannels(mockChannels);
      setLoading(false);
    }, 1000);
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEditChannel = (channel) => {
    setSelectedChannel(channel);
    setEditForm({
      name: channel.name,
      description: channel.description,
      category: channel.category,
      privacy: channel.privacy,
    });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    // Simulate API call
    setChannels(prev => prev.map(channel => 
      channel.id === selectedChannel.id 
        ? { ...channel, ...editForm }
        : channel
    ));
    setEditDialogOpen(false);
    showNotification('Channel updated successfully!', 'success');
  };

  const handleDeleteChannel = (channel) => {
    setSelectedChannel(channel);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setChannels(prev => prev.filter(channel => channel.id !== selectedChannel.id));
    setDeleteDialogOpen(false);
    showNotification('Channel deleted successfully!', 'success');
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getPrivacyIcon = (privacy) => {
    return privacy === 'public' ? <Visibility /> : <VisibilityOff />;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Technology': 'primary',
      'Gaming': 'secondary',
      'Music': 'success',
      'Education': 'info',
      'Entertainment': 'warning',
    };
    return colors[category] || 'default';
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#f9f9f9',
      py: 4
    }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Channel Management
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Manage your channels, view analytics, and customize settings
          </Typography>
          <Button
            variant="contained"
            startIcon={<VideoCall />}
            onClick={() => navigate('/create-channel')}
            sx={{ borderRadius: 2 }}
          >
            Create New Channel
          </Button>
        </Box>

        {/* Tabs */}
        <Paper sx={{ mb: 3, borderRadius: 2 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{ px: 2 }}
          >
            <Tab label="All Channels" />
            <Tab label="Analytics" />
            <Tab label="Settings" />
          </Tabs>
        </Paper>

        {/* Content based on active tab */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            {channels.map((channel) => (
              <Grid item xs={12} md={6} lg={4} key={channel.id}>
                <Card sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  }
                }}>
                  {/* Banner */}
                  <Box sx={{ height: 120, backgroundColor: 'primary.main', position: 'relative' }}>
                    {channel.bannerImage ? (
                      <CardMedia
                        component="img"
                        image={channel.bannerImage}
                        sx={{ height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <Box sx={{ 
                        height: '100%', 
                        background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                          {channel.name.charAt(0)}
                        </Typography>
                      </Box>
                    )}
                    
                    {/* Privacy Badge */}
                    <Chip
                      icon={getPrivacyIcon(channel.privacy)}
                      label={channel.privacy}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'rgba(255,255,255,0.9)',
                      }}
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    {/* Channel Info */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        src={channel.profileImage}
                        sx={{ 
                          width: 50, 
                          height: 50, 
                          mr: 2,
                          border: '2px solid #fff',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                        }}
                      >
                        {channel.name.charAt(0)}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {channel.name}
                          </Typography>
                          {channel.isVerified && (
                            <CheckCircle sx={{ color: 'primary.main', fontSize: 20 }} />
                          )}
                        </Box>
                        <Chip
                          label={channel.category}
                          size="small"
                          color={getCategoryColor(channel.category)}
                          sx={{ mt: 0.5 }}
                        />
                      </Box>
                    </Box>

                    {/* Description */}
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                    >
                      {channel.description}
                    </Typography>

                    {/* Stats */}
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            {formatNumber(channel.subscribers)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Subscribers
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                            {channel.videos}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Videos
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                            {formatNumber(channel.views)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Views
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 2 }} />

                    {/* Actions */}
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between' }}>
                      <Button
                        size="small"
                        startIcon={<Edit />}
                        onClick={() => handleEditChannel(channel)}
                        sx={{ flexGrow: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        startIcon={<Analytics />}
                        onClick={() => navigate(`/channel/${channel.id}/analytics`)}
                        sx={{ flexGrow: 1 }}
                      >
                        Analytics
                      </Button>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteChannel(channel)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {channels.length === 0 && (
              <Grid item xs={12}>
                <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
                  <VideoCall sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    No channels yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Create your first channel to start sharing content
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<VideoCall />}
                    onClick={() => navigate('/create-channel')}
                  >
                    Create Channel
                  </Button>
                </Paper>
              </Grid>
            )}
          </Grid>
        )}

        {activeTab === 1 && (
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Channel Analytics
            </Typography>
            <Alert severity="info">
              Analytics dashboard coming soon! Track your channel performance, viewer demographics, and engagement metrics.
            </Alert>
          </Paper>
        )}

        {activeTab === 2 && (
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Channel Settings
            </Typography>
            <Alert severity="info">
              Global channel settings and preferences coming soon!
            </Alert>
          </Paper>
        )}

        {/* Edit Channel Dialog */}
        <Dialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Edit Channel</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Channel Name"
              value={editForm.name}
              onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
              sx={{ mb: 2, mt: 1 }}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={editForm.description}
              onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Category"
              value={editForm.category}
              onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              select
              label="Privacy"
              value={editForm.privacy}
              onChange={(e) => setEditForm(prev => ({ ...prev, privacy: e.target.value }))}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Delete Channel</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete "{selectedChannel?.name}"? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ChannelManagement;
