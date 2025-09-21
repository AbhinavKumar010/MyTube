// ChannelManagement.jsx
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
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import { Edit, Delete, VideoCall, Visibility, VisibilityOff, CheckCircle, Search } from '@mui/icons-material';
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
  const [filteredChannels, setFilteredChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    category: '',
    privacy: 'public',
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    try {
      setLoading(true);
      // TODO: Replace with real API call
      const data = [
        {
          id: 1,
          name: 'TechWave',
          description: 'Technology channel',
          category: 'Technology',
          privacy: 'public',
          profileImage: null,
          bannerImage: null,
          isVerified: true,
        },
        {
          id: 2,
          name: 'GamingZone',
          description: 'Gaming videos',
          category: 'Gaming',
          privacy: 'private',
          profileImage: null,
          bannerImage: null,
          isVerified: false,
        },
      ];
      setChannels(data);
      setFilteredChannels(data);
    } catch (error) {
      console.error(error);
      showNotification('Failed to fetch channels', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const query = e.target.value.toLowerCase();
    setFilteredChannels(channels.filter(ch => ch.name.toLowerCase().includes(query)));
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

  const handleSaveEdit = async () => {
    try {
      // TODO: Save changes via API
      const updatedChannels = channels.map(ch =>
        ch.id === selectedChannel.id ? { ...ch, ...editForm } : ch
      );
      setChannels(updatedChannels);
      setFilteredChannels(updatedChannels);
      showNotification('Channel updated successfully!', 'success');
    } catch (error) {
      console.error(error);
      showNotification('Failed to update channel', 'error');
    } finally {
      setEditDialogOpen(false);
    }
  };

  const handleDeleteChannel = (channel) => {
    setSelectedChannel(channel);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      // TODO: Delete channel via API
      const updatedChannels = channels.filter(ch => ch.id !== selectedChannel.id);
      setChannels(updatedChannels);
      setFilteredChannels(updatedChannels);
      showNotification('Channel deleted successfully!', 'success');
    } catch (error) {
      console.error(error);
      showNotification('Failed to delete channel', 'error');
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const getPrivacyIcon = (privacy) => (privacy === 'public' ? <Visibility /> : <VisibilityOff />);

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

  if (loading) return (
    <Box className="loading-container">
      <CircularProgress />
    </Box>
  );

  return (
    <Box className="channel-management">
      <Container maxWidth="xl">
        <Box className="cm-header">
          <Typography variant="h4">Channel Management</Typography>
          <Typography className="cm-subtitle">Manage your channels, view analytics, and customize settings</Typography>
          <Button
            className="cm-create-btn"
            startIcon={<VideoCall />}
            onClick={() => navigate('/create-channel')}
          >
            Create New Channel
          </Button>
        </Box>

        <Paper className="cm-tabs">
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="All Channels" />
            <Tab label="Analytics" />
            <Tab label="Settings" />
          </Tabs>
        </Paper>

        {activeTab === 0 && (
          <Box sx={{ my: 2 }}>
            <TextField
              fullWidth
              placeholder="Search channels..."
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        )}

        {activeTab === 0 && (
          <Grid container spacing={3}>
            {filteredChannels.length ? (
              filteredChannels.map(channel => (
                <Grid item xs={12} md={6} lg={4} key={channel.id}>
                  <Card className="channel-card">
                    <Box className="channel-banner">
                      {channel.bannerImage ? (
                        <CardMedia component="img" image={channel.bannerImage} alt="Banner" />
                      ) : (
                        <Box className="channel-banner-fallback">{channel.name.charAt(0)}</Box>
                      )}
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
                      <Divider />
                      <Box className="channel-actions">
                        <Button startIcon={<Edit />} onClick={() => handleEditChannel(channel)}>Edit</Button>
                        <IconButton color="error" onClick={() => handleDeleteChannel(channel)}><Delete /></IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography sx={{ textAlign: 'center', mt: 4 }}>No channels found.</Typography>
            )}
          </Grid>
        )}

        {activeTab === 1 && <Paper className="cm-tab-content"><Typography>Analytics coming soon!</Typography></Paper>}
        {activeTab === 2 && <Paper className="cm-tab-content"><Typography>Global settings coming soon!</Typography></Paper>}

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Channel</DialogTitle>
          <DialogContent>
            <TextField fullWidth label="Channel Name" value={editForm.name} onChange={e => setEditForm(prev => ({ ...prev, name: e.target.value }))} margin="dense" />
            <TextField fullWidth multiline rows={3} label="Description" value={editForm.description} onChange={e => setEditForm(prev => ({ ...prev, description: e.target.value }))} margin="dense" />
            <TextField fullWidth label="Category" value={editForm.category} onChange={e => setEditForm(prev => ({ ...prev, category: e.target.value }))} margin="dense" />
            <TextField fullWidth select label="Privacy" value={editForm.privacy} onChange={e => setEditForm(prev => ({ ...prev, privacy: e.target.value }))} margin="dense" SelectProps={{ native: true }}>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>

        {/* Delete Dialog */}
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
