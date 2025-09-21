import React, { useState } from 'react';
import {
  Box, Container, Paper, Typography, TextField, Button, Avatar,
  IconButton, Grid, FormControl, InputLabel, Select, MenuItem, Chip, Card
} from '@mui/material';
import { PhotoCamera, ArrowBack, Public, Lock, CheckCircle, Upload } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import './CreateChannel.css';

const CreateChannel = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showNotification } = useNotification();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    channelName: '', description: '', category: '', privacy: 'public',
    bannerImage: null, profileImage: null, website: '',
    socialLinks: { twitter: '', instagram: '', facebook: '', tiktok: '' },
    tags: [], newTag: '',
  });

  const categories = [
    'Gaming','Music','Education','Entertainment','Sports','Technology',
    'Lifestyle','News','Comedy','Science','Travel','Food','Fashion','Art','Other'
  ];

  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const handleSocialLinkChange = (platform, value) =>
    setFormData(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, [platform]: value }}));

  const handleImageUpload = (type, file) => {
    if(file){
      const reader = new FileReader();
      reader.onload = e => setFormData(prev => ({ ...prev, [type]: e.target.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if(formData.newTag.trim() && formData.tags.length < 10){
      setFormData(prev => ({ ...prev, tags: [...prev.tags, prev.newTag.trim()], newTag: '' }));
    }
  };

  const handleRemoveTag = tagToRemove =>
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));

  const handleSubmit = async e => {
    e.preventDefault();
    if(!formData.channelName.trim()){
      showNotification('Channel name is required', 'error');
      return;
    }
    setLoading(true);
    try{
      await new Promise(resolve => setTimeout(resolve, 2000));
      showNotification('Channel created successfully!', 'success');
      navigate('/profile');
    } catch {
      showNotification('Failed to create channel', 'error');
    } finally{
      setLoading(false);
    }
  };

  return (
    <Box className="create-channel-container">
      <Container maxWidth="md">
        <Paper className="create-channel-paper">
          <Box className="create-channel-header">
            <IconButton onClick={() => navigate(-1)}><ArrowBack /></IconButton>
            <Typography variant="h5">Create Your Channel</Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>

              {/* Channel Profile */}
              <Grid item xs={12}>
                <Card className="create-channel-card">
                  <Typography variant="h6">Channel Profile</Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4} style={{ textAlign:'center' }}>
                      <Box className="channel-avatar-wrapper">
                        <Avatar src={formData.profileImage}>
                          {user?.name?.charAt(0) || 'U'}
                        </Avatar>
                        <IconButton component="label">
                          <PhotoCamera />
                          <input type="file" hidden accept="image/*"
                            onChange={e => handleImageUpload('profileImage', e.target.files[0])} />
                        </IconButton>
                      </Box>
                      <Typography variant="caption" display="block">Channel Profile Picture</Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <TextField fullWidth label="Channel Name" value={formData.channelName} onChange={e => handleInputChange('channelName', e.target.value)} required />
                      <TextField fullWidth multiline rows={3} label="Channel Description" value={formData.description} onChange={e => handleInputChange('description', e.target.value)} />
                      <FormControl fullWidth className="create-channel-category">
  <InputLabel>Category</InputLabel>
  <Select
    value={formData.category}
    onChange={e => handleInputChange('category', e.target.value)}
  >
    {categories.map(cat => (
      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
    ))}
  </Select>
</FormControl>

                    </Grid>
                  </Grid>
                </Card>
              </Grid>

              {/* Banner */}
              <Grid item xs={12}>
                <Card className="create-channel-card">
                  <Typography variant="h6">Channel Banner</Typography>
                  <Box className="channel-banner-wrapper">
                    {formData.bannerImage ? (
                      <img src={formData.bannerImage} alt="Banner" />
                    ) : (
                      <Box className="channel-banner-upload" component="label">
                        <Upload style={{ fontSize: 40, color: '#ccc' }} />
                        <Typography>Upload Channel Banner</Typography>
                        <input type="file" hidden accept="image/*"
                          onChange={e => handleImageUpload('bannerImage', e.target.files[0])} />
                      </Box>
                    )}
                  </Box>
                </Card>
              </Grid>

              {/* Channel Settings */}
              <Grid item xs={12}>
                <Card className="create-channel-card">
                  <Typography variant="h6">Channel Settings</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Privacy</InputLabel>
                        <Select value={formData.privacy} onChange={e => handleInputChange('privacy', e.target.value)}>
                          <MenuItem value="public"><Public /> Public</MenuItem>
                          <MenuItem value="private"><Lock /> Private</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Website" value={formData.website} onChange={e => handleInputChange('website', e.target.value)} />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>

              {/* Social Links */}
              <Grid item xs={12}>
                <Card className="create-channel-card">
                  <Typography variant="h6">Social Media Links</Typography>
                  <Grid container spacing={2}>
                    {Object.entries(formData.socialLinks).map(([platform, value]) => (
                      <Grid item xs={12} sm={6} key={platform}>
                        <TextField fullWidth label={`${platform.charAt(0).toUpperCase()+platform.slice(1)} URL`} value={value} onChange={e => handleSocialLinkChange(platform,e.target.value)} />
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              </Grid>

              {/* Tags */}
              <Grid item xs={12}>
                <Card className="create-channel-card">
                  <Typography variant="h6">Channel Tags</Typography>
                  <Box className="channel-tags">
                    {formData.tags.map(tag => <Chip key={tag} label={tag} onDelete={() => handleRemoveTag(tag)} color="primary" variant="outlined" />)}
                  </Box>
                  <Box style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
                    <TextField size="small" placeholder="Add a tag" value={formData.newTag} onChange={e => handleInputChange('newTag',e.target.value)} onKeyPress={e => e.key==='Enter' && (e.preventDefault(), handleAddTag())} disabled={formData.tags.length>=10} />
                    <Button variant="outlined" onClick={handleAddTag} disabled={!formData.newTag.trim()||formData.tags.length>=10}>Add</Button>
                  </Box>
                  <Typography variant="caption" color="text.secondary" style={{ display:'block', marginTop:'0.5rem' }}>Add up to 10 tags to help viewers find your channel</Typography>
                </Card>
              </Grid>

              {/* Submit Buttons */}
              <Grid item xs={12}>
                <Box className="create-channel-actions">
                  <Button variant="outlined" onClick={() => navigate(-1)} disabled={loading}>Cancel</Button>
                  <Button type="submit" variant="contained" startIcon={<CheckCircle />} disabled={loading}>{loading?'Creating...':'Create Channel'}</Button>
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
