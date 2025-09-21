import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  Tabs,
  Tab,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Visibility,
  Subscriptions,
  ThumbUp,
  Comment,
  Share,
  MoreVert,
  PlayArrow,
  Schedule,
  CheckCircle,
  ArrowBack,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useParams, useNavigate } from 'react-router-dom';

const ChannelAnalytics = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [timeRange, setTimeRange] = useState('30d');
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [id, timeRange]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
    setAnchorEl(null);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Channel Analytics
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              endIcon={<MoreVert />}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              {timeRange === '7d' ? 'Last 7 days' : 
               timeRange === '30d' ? 'Last 30 days' : 
               timeRange === '90d' ? 'Last 90 days' : 'Last year'}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={handleTimeRangeChange} value="7d">Last 7 days</MenuItem>
              <MenuItem onClick={handleTimeRangeChange} value="30d">Last 30 days</MenuItem>
              <MenuItem onClick={handleTimeRangeChange} value="90d">Last 90 days</MenuItem>
              <MenuItem onClick={handleTimeRangeChange} value="1y">Last year</MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Overview Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 3, borderRadius: 3, background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)', color: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {formatNumber(analyticsData.overview.totalViews)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Views
                  </Typography>
                </Box>
                <Visibility sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2">+12.5% from last month</Typography>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 3, borderRadius: 3, background: 'linear-gradient(135deg, #00c853 0%, #00a844 100%)', color: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {formatNumber(analyticsData.overview.totalSubscribers)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Subscribers
                  </Typography>
                </Box>
                <Subscriptions sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2">+8.2% from last month</Typography>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 3, borderRadius: 3, background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)', color: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {analyticsData.overview.totalVideos}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Videos
                  </Typography>
                </Box>
                <PlayArrow sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2">+3 this month</Typography>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 3, borderRadius: 3, background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)', color: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {analyticsData.overview.avgViewDuration}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Avg. View Duration
                  </Typography>
                </Box>
                <Schedule sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2">+15s from last month</Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Paper sx={{ mb: 3, borderRadius: 2 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{ px: 2 }}
          >
            <Tab label="Overview" />
            <Tab label="Videos" />
            <Tab label="Audience" />
            <Tab label="Revenue" />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            {/* Views Chart */}
            <Grid item xs={12} lg={8}>
              <Card sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                  Views Over Time
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData.viewsOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="views" stroke="#ff0000" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Grid>

            {/* Recent Activity */}
            <Grid item xs={12} lg={4}>
              <Card sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                  Recent Activity
                </Typography>
                <List>
                  {analyticsData.recentActivity.map((activity, index) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ backgroundColor: `${activity.color}.main` }}>
                            {activity.icon}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={activity.title}
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {activity.description}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {activity.time}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < analyticsData.recentActivity.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </Card>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Top Performing Videos
            </Typography>
            <Grid container spacing={2}>
              {analyticsData.topVideos.map((video, index) => (
                <Grid item xs={12} md={6} lg={4} key={video.id}>
                  <Card sx={{ p: 2, borderRadius: 2, height: '100%' }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Avatar
                        sx={{ width: 80, height: 60, borderRadius: 1 }}
                        variant="rounded"
                      >
                        <PlayArrow />
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                          {video.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {formatNumber(video.views)} views • {video.duration}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            👍 {formatNumber(video.likes)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            💬 {video.comments}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          Published {new Date(video.publishedAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card>
        )}

        {activeTab === 2 && (
          <Grid container spacing={3}>
            {/* Age Demographics */}
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                  Age Demographics
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.demographics.ageGroups}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {analyticsData.demographics.ageGroups.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Grid>

            {/* Gender Demographics */}
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                  Gender Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.demographics.gender}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {analyticsData.demographics.gender.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Grid>

            {/* Top Countries */}
            <Grid item xs={12}>
              <Card sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                  Top Countries
                </Typography>
                {analyticsData.demographics.countries.map((country, index) => (
                  <Box key={country.name} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">{country.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {country.percentage}% ({formatNumber(country.views)} views)
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={country.percentage}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                ))}
              </Card>
            </Grid>
          </Grid>
        )}

        {activeTab === 3 && (
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Revenue Analytics
            </Typography>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main', mb: 2 }}>
                ${analyticsData.overview.revenue.toFixed(2)}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Total Revenue (Last 30 days)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Revenue analytics and monetization features coming soon!
              </Typography>
            </Box>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default ChannelAnalytics;

