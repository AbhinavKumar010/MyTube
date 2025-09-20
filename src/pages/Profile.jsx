<<<<<<< HEAD
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";

function Profile() {
  const { user, setUser } = useContext(AuthContext); // assuming auth context
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: null
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch user profile on mount
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    axios.get("/api/profile")
      .then(res => {
        setFormData({
          name: res.data.name,
          email: res.data.email,
          password: "", // leave blank for security
          profilePic: res.data.profilePic || null
        });
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      setFormData({ ...formData, profilePic: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    if (formData.password) data.append("password", formData.password);
    if (formData.profilePic) data.append("profilePic", formData.profilePic);

    try {
      const res = await axios.put("/api/profile", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMessage("Profile updated successfully!");
      setUser(res.data); // update auth context
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile");
=======
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Paper,
  TextField,
  Grid,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import {
  Edit as EditIcon,
  CameraAlt as CameraIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import VideoCard from '../components/VideoCard';
import axios from 'axios';

const Profile = () => {
  const { user, updateProfile, isAuthenticated } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [activeTab, setActiveTab] = useState(0);
  const [userVideos, setUserVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    channelName: '',
    channelDescription: '',
    profilePicture: ''
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      setProfileData({
        channelName: user.channelName || '',
        channelDescription: user.channelDescription || '',
        profilePicture: user.profilePicture || ''
      });
      fetchUserVideos();
    }
  }, [isAuthenticated, user]);

  const fetchUserVideos = async () => {
    try {
      const response = await axios.get(`/api/users/${user._id}/videos`);
      setUserVideos(response.data.videos);
    } catch (error) {
      console.error('Error fetching user videos:', error);
>>>>>>> 87242f82151e73030e84310ec42fa8acb9aaa44f
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="profile-form">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password (leave blank to keep current):</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Profile Picture:</label>
          <input type="file" name="profilePic" onChange={handleChange} />
          {formData.profilePic && typeof formData.profilePic === "string" && (
            <img
              src={formData.profilePic}
              alt="Profile"
              style={{ width: 100, height: 100, marginTop: 10, borderRadius: "50%" }}
            />
          )}
        </div>
        <button type="submit" disabled={loading}>Update Profile</button>
      </form>
    </div>
  );
}
=======
  const handleEditProfile = () => {
    setEditDialogOpen(true);
  };

  const handleSaveProfile = async () => {
    try {
      const result = await updateProfile(profileData);
      if (result.success) {
        showSuccess('Profile updated successfully!');
        setEditDialogOpen(false);
      } else {
        showError(result.message || 'Failed to update profile');
      }
    } catch (error) {
      showError('Failed to update profile');
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" gutterBottom>
          Please sign in to view your profile
        </Typography>
        <Button variant="contained" href="/login" size="large">
          Sign In
        </Button>
      </Box>
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
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Profile Header */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
            <Box sx={{ position: 'relative', alignSelf: 'center' }}>
              <Avatar
                src={user.profilePicture}
                sx={{ width: 120, height: 120 }}
              >
                {user.username?.charAt(0).toUpperCase()}
              </Avatar>
              <IconButton
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                }}
                size="small"
              >
                <CameraIcon />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {user.channelName || user.username}
                </Typography>
                <IconButton onClick={handleEditProfile} color="primary">
                  <EditIcon />
                </IconButton>
              </Box>

              <Typography variant="body1" color="text.secondary" gutterBottom>
                @{user.username}
              </Typography>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                {user.subscriberCount} subscribers
              </Typography>

              {user.channelDescription && (
                <Typography variant="body1" sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
                  {user.channelDescription}
                </Typography>
              )}

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<SettingsIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  Channel Settings
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Videos" />
            <Tab label="Playlists" />
            <Tab label="About" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        {activeTab === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Your Videos ({userVideos.length})
            </Typography>
            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
              {userVideos.map((video) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={video._id}>
                  <VideoCard video={video} />
                </Grid>
              ))}
            </Grid>
            {userVideos.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No videos uploaded yet
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Start creating content by uploading your first video
                </Typography>
                <Button variant="contained" href="/upload">
                  Upload Video
                </Button>
              </Box>
            )}
          </Box>
        )}

        {activeTab === 1 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Playlists feature coming soon!
            </Typography>
          </Box>
        )}

        {activeTab === 2 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              About {user.channelName || user.username}
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>Username:</strong> {user.username}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>Subscribers:</strong> {user.subscriberCount}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>Videos:</strong> {userVideos.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
            {user.channelDescription && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {user.channelDescription}
                </Typography>
              </Box>
            )}
          </Paper>
        )}
      </Box>

      {/* Edit Profile Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Channel Name"
            value={profileData.channelName}
            onChange={(e) => setProfileData({ ...profileData, channelName: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Channel Description"
            value={profileData.channelDescription}
            onChange={(e) => setProfileData({ ...profileData, channelDescription: e.target.value })}
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="Profile Picture URL"
            value={profileData.profilePicture}
            onChange={(e) => setProfileData({ ...profileData, profilePicture: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveProfile} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
>>>>>>> 87242f82151e73030e84310ec42fa8acb9aaa44f

export default Profile;
