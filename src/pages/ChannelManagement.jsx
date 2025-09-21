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
} from '@mui/material';
import {
  Edit,
  Delete,
  Analytics,
  VideoCall,
  Visibility,
  VisibilityOff,
  CheckCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import './ChannelManagement.css';

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
      },
    ];
    setTimeout(() => {
      setChannels(mockChannels);
      setLoading(false);
    }, 1000);
  }, []);

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

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
    setChannels(prev => prev.map(c => c.id === selectedChannel.id ? { ...c, ...editForm } : c));
    setEditDialogOpen(false);
    showNotification('Channel updated successfully!', 'success');
  };

  const handleDeleteChannel = (channel) => {
    setSelectedChannel(channel);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setChannels(prev => prev.filter(c => c.id !== selectedChannel.id));
    setDeleteDialogOpen(false);
    showNotification('Channel deleted successfully!', 'success');
  };

  const formatNumber = (num) => num >= 1000000 ? (num / 1000000).toFixed(1) + 'M' : num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num;

  const getPrivacyIcon = (privacy) => privacy === 'public' ? <Visibility /> : <VisibilityOff />;

  const getCategoryColor = (category) => {
    const colors = {
      Technology: 'tech',
      Gaming: 'gaming',
      Music: 'music',
      Education: 'education',
      Entertainment: 'entertainment',
    };
    return colors[category] || 'default';
  };

  if (loading) return <Box className="loading-container"><CircularProgress /></Box>;

  return (
    <Box className="channel-management">
      <Container maxWidth="xl">
        <Box className="cm-header">
          <Typography variant="h4">Channel Management</Typography>
          <Typography className="cm-subtitle">Manage your channels, view analytics, and customize settings</Typography>
          <Button className="cm-create-btn" startIcon={<VideoCall />} onClick={() => navigate('/create-channel')}>Create New Channel</Button>
        </Box>

        <Paper className="cm-tabs">
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="All Channels" />
            <Tab label="Analytics" />
            <Tab label="Settings" />
          </Tabs>
        </Paper>

        {activeTab === 0 && (
          <Grid container spacing={3}>
            {channels.map(channel => (
              <Grid item xs={12} md={6} lg={4} key={channel.id}>
                <Card className="channel-card">
                  <Box className="channel-banner">
                    {channel.bannerImage ? <CardMedia component="img" image={channel.bannerImage} /> : <Box className="channel-banner-fallback">{channel.name.charAt(0)}</Box>}
                    <Chip icon={getPrivacyIcon(channel.privacy)} label={channel.privacy} className="privacy-chip" />
                  </Box>
                  <CardContent>
                    <Box className="channel-info">
                      <Avatar src={channel.profileImage} className="channel-avatar">{channel.name.charAt(0)}</Avatar>
                      <Box className="channel-name-block">
                        <Box className="channel-name">
                          <Typography>{channel.name}</Typography>
                          {channel.isVerified && <CheckCircle className="verified-icon" />}
                        </Box>
                        <Chip label={channel.category} className={`category-chip ${getCategoryColor(channel.category)}`} />
                      </Box>
                    </Box>

                    <Typography className="channel-description">{channel.description}</Typography>

                    <Grid container spacing={2} className="channel-stats">
                      <Grid item xs={4}><Typography>{formatNumber(channel.subscribers)}</Typography><Typography>Subscribers</Typography></Grid>
                      <Grid item xs={4}><Typography>{channel.videos}</Typography><Typography>Videos</Typography></Grid>
                      <Grid item xs={4}><Typography>{formatNumber(channel.views)}</Typography><Typography>Views</Typography></Grid>
                    </Grid>

                    <Divider />

                    <Box className="channel-actions">
                      <Button startIcon={<Edit />} onClick={() => handleEditChannel(channel)}>Edit</Button>
                      <Button startIcon={<Analytics />} onClick={() => navigate(`/channel/${channel.id}/analytics`)}>Analytics</Button>
                      <IconButton color="error" onClick={() => handleDeleteChannel(channel)}><Delete /></IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {channels.length === 0 && (
              <Grid item xs={12}>
                <Paper className="no-channels">
                  <VideoCall className="no-channels-icon" />
                  <Typography>No channels yet</Typography>
                  <Typography>Create your first channel to start sharing content</Typography>
                  <Button startIcon={<VideoCall />} onClick={() => navigate('/create-channel')}>Create Channel</Button>
                </Paper>
              </Grid>
            )}
          </Grid>
        )}

        {activeTab === 1 && <Paper className="cm-tab-content"><Alert severity="info">Analytics dashboard coming soon!</Alert></Paper>}
        {activeTab === 2 && <Paper className="cm-tab-content"><Alert severity="info">Global channel settings coming soon!</Alert></Paper>}

        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Channel</DialogTitle>
          <DialogContent>
            <TextField fullWidth label="Channel Name" value={editForm.name} onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))} />
            <TextField fullWidth multiline rows={3} label="Description" value={editForm.description} onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))} />
            <TextField fullWidth label="Category" value={editForm.category} onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))} />
            <TextField fullWidth select label="Privacy" value={editForm.privacy} onChange={(e) => setEditForm(prev => ({ ...prev, privacy: e.target.value }))}>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Delete Channel</DialogTitle>
          <DialogContent>Are you sure you want to delete "{selectedChannel?.name}"? This action cannot be undone.</DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ChannelManagement;
