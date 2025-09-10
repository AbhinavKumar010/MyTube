import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  CircularProgress,
  Divider,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import {
  PhotoCamera,
  Save,
  ArrowBack,
  Public,
  Lock,
  CheckCircle,
  Upload,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

const CreateChannel = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showNotification } = useNotification();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    channelName: '',
    description: '',
    category: '',
    privacy: 'public',
    bannerImage: null,
    profileImage: null,
    website: '',
    socialLinks: {
      twitter: '',
      instagram: '',
      facebook: '',
      tiktok: '',
    },
    tags: [],
    newTag: '',
  });

  const categories = [
    'Gaming',
    'Music',
    'Education',
    'Entertainment',
    'Sports',
    'Technology',
    'Lifestyle',
    'News',
    'Comedy',
    'Science',
    'Travel',
    'Food',
    'Fashion',
    'Art',
    'Other',
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handleImageUpload = (type, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          [type]: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (formData.newTag.trim() && formData.tags.length < 10) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: ''
      }));
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.channelName.trim()) {
      showNotification('Channel name is required', 'error');
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showNotification('Channel created successfully!', 'success');
      navigate('/profile');
    } catch (error) {
      showNotification('Failed to create channel', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#f9f9f9',
      py: 4
    }}>
      <Container maxWidth="md">
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Create Your Channel
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              {/* Channel Profile Section */}
              <Grid item xs={12}>
                <Card sx={{ p: 3, backgroundColor: '#fafafa' }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Channel Profile
                  </Typography>
                  
                  <Grid container spacing={3} alignItems="center">
                    {/* Profile Image */}
                    <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                      <Box sx={{ position: 'relative', display: 'inline-block' }}>
                        <Avatar
                          src={formData.profileImage}
                          sx={{ 
                            width: 120, 
                            height: 120, 
                            mx: 'auto',
                            border: '3px solid #fff',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                          }}
                        >
                          {user?.name?.charAt(0) || 'U'}
                        </Avatar>
                        <IconButton
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            backgroundColor: 'primary.main',
                            color: 'white',
                            '&:hover': { backgroundColor: 'primary.dark' }
                          }}
                          component="label"
                        >
                          <PhotoCamera />
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => handleImageUpload('profileImage', e.target.files[0])}
                          />
                        </IconButton>
                      </Box>
                      <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                        Channel Profile Picture
                      </Typography>
                    </Grid>

                    {/* Channel Info */}
                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="Channel Name"
                        value={formData.channelName}
                        onChange={(e) => handleInputChange('channelName', e.target.value)}
                        placeholder="Enter your channel name"
                        sx={{ mb: 2 }}
                        required
                      />
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Channel Description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Tell viewers about your channel..."
                        sx={{ mb: 2 }}
                      />
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Category</InputLabel>
                        <Select
                          value={formData.category}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          label="Category"
                        >
                          {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                              {category}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>

              {/* Channel Banner */}
              <Grid item xs={12}>
                <Card sx={{ p: 3, backgroundColor: '#fafafa' }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Channel Banner
                  </Typography>
                  
                  <Box sx={{ textAlign: 'center' }}>
                    {formData.bannerImage ? (
                      <Box sx={{ position: 'relative', display: 'inline-block' }}>
                        <CardMedia
                          component="img"
                          image={formData.bannerImage}
                          sx={{
                            width: '100%',
                            maxWidth: 600,
                            height: 200,
                            borderRadius: 2,
                            objectFit: 'cover'
                          }}
                        />
                        <IconButton
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' }
                          }}
                          component="label"
                        >
                          <PhotoCamera />
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => handleImageUpload('bannerImage', e.target.files[0])}
                          />
                        </IconButton>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          border: '2px dashed #ccc',
                          borderRadius: 2,
                          p: 4,
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          '&:hover': { borderColor: 'primary.main' }
                        }}
                        component="label"
                      >
                        <Upload sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          Upload Channel Banner
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Recommended: 2560x1440px
                        </Typography>
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => handleImageUpload('bannerImage', e.target.files[0])}
                        />
                      </Box>
                    )}
                  </Box>
                </Card>
              </Grid>

              {/* Channel Settings */}
              <Grid item xs={12}>
                <Card sx={{ p: 3, backgroundColor: '#fafafa' }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Channel Settings
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Privacy</InputLabel>
                        <Select
                          value={formData.privacy}
                          onChange={(e) => handleInputChange('privacy', e.target.value)}
                          label="Privacy"
                        >
                          <MenuItem value="public">
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Public sx={{ mr: 1, fontSize: 20 }} />
                              Public
                            </Box>
                          </MenuItem>
                          <MenuItem value="private">
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Lock sx={{ mr: 1, fontSize: 20 }} />
                              Private
                            </Box>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Website"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        placeholder="https://yourwebsite.com"
                      />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>

              {/* Social Links */}
              <Grid item xs={12}>
                <Card sx={{ p: 3, backgroundColor: '#fafafa' }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Social Media Links
                  </Typography>
                  
                  <Grid container spacing={2}>
                    {Object.entries(formData.socialLinks).map(([platform, value]) => (
                      <Grid item xs={12} sm={6} key={platform}>
                        <TextField
                          fullWidth
                          label={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
                          value={value}
                          onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
                          placeholder={`https://${platform}.com/yourusername`}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              </Grid>

              {/* Tags */}
              <Grid item xs={12}>
                <Card sx={{ p: 3, backgroundColor: '#fafafa' }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Channel Tags
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    {formData.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        onDelete={() => handleRemoveTag(tag)}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      size="small"
                      placeholder="Add a tag"
                      value={formData.newTag}
                      onChange={(e) => handleInputChange('newTag', e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      disabled={formData.tags.length >= 10}
                    />
                    <Button
                      variant="outlined"
                      onClick={handleAddTag}
                      disabled={!formData.newTag.trim() || formData.tags.length >= 10}
                    >
                      Add
                    </Button>
                  </Box>
                  
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Add up to 10 tags to help viewers find your channel
                  </Typography>
                </Card>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(-1)}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={loading ? <CircularProgress size={20} /> : <CheckCircle />}
                    disabled={loading}
                    sx={{ px: 4 }}
                  >
                    {loading ? 'Creating Channel...' : 'Create Channel'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreateChannel;
