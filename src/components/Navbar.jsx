import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Avatar,
  Button,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  VideoCall as VideoCallIcon,
  Apps as AppsIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Home as HomeIcon,
  Subscriptions as SubscriptionsIcon,
  VideoLibrary as VideoLibraryIcon,
  Close as CloseIcon,
  TrendingUp as TrendingIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleDrawerItemClick = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const drawerItems = [
    { icon: <HomeIcon />, text: 'Home', path: '/' },
    { icon: <TrendingIcon />, text: 'Trending', path: '/trending' },
    { icon: <SubscriptionsIcon />, text: 'Subscriptions', path: '/subscriptions' },
    { icon: <VideoLibraryIcon />, text: 'Library', path: '/library' },
    { icon: <VideoCallIcon />, text: 'Upload', path: '/upload' },
  ];

  const userMenuItems = [
    { icon: <AccountCircleIcon />, text: 'Your Channel', path: '/channel-management' },
    { icon: <VideoCallIcon />, text: 'Create Channel', path: '/create-channel' },
    { icon: <VideoLibraryIcon />, text: 'Your Videos', path: '/library' },
  ];

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          backgroundColor: 'white', 
          color: 'black', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar sx={{ px: { xs: 1, sm: 2 } }}>
          {/* Logo and Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: { xs: 1, sm: 2 } }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: 'primary.main',
                  fontWeight: 'bold',
                  fontSize: { xs: '1.2rem', sm: '1.5rem' }
                }}
              >
                YouTube
              </Typography>
            </Box>
          </Box>

          {/* Search Bar */}
          {!isSmallMobile && (
            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{ flexGrow: 1, maxWidth: 600, mx: { xs: 1, sm: 2 } }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '40px',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    '&:hover': {
                      border: '1px solid #999',
                    },
                    '&.Mui-focused': {
                      border: '1px solid #1976d2',
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="submit"
                        edge="end"
                        sx={{ color: 'text.secondary' }}
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          )}

          {/* Mobile Search Icon */}
          {isSmallMobile && (
            <IconButton
              color="inherit"
              onClick={() => navigate('/search')}
              sx={{ mr: 1 }}
            >
              <SearchIcon />
            </IconButton>
          )}

          {/* Right Side Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
            {!isMobile && (
              <>
                <IconButton color="inherit" onClick={() => navigate('/upload')}>
                  <VideoCallIcon />
                </IconButton>
                <IconButton color="inherit">
                  <AppsIcon />
                </IconButton>
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </>
            )}

            {isAuthenticated ? (
              <IconButton
                onClick={handleMenuOpen}
                color="inherit"
                sx={{ ml: 1 }}
              >
                <Avatar
                  src={user?.profilePicture}
                  sx={{ width: { xs: 28, sm: 32 }, height: { xs: 28, sm: 32 } }}
                >
                  {user?.username?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            ) : (
              <Button
                variant="outlined"
                startIcon={<AccountCircleIcon />}
                onClick={() => navigate('/login')}
                sx={{ 
                  ml: 1,
                  display: { xs: 'none', sm: 'flex' },
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }}
              >
                Sign In
              </Button>
            )}
          </Box>

          {/* User Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {userMenuItems.map((item, index) => (
              <MenuItem 
                key={index}
                onClick={() => { 
                  handleMenuClose(); 
                  navigate(item.path); 
                }}
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                {item.icon}
                {item.text}
              </MenuItem>
            ))}
            <Divider />
            <MenuItem onClick={() => { navigate('/upload'); handleMenuClose(); }}>
              <VideoCallIcon sx={{ mr: 1 }} />
              Upload Video
            </MenuItem>
            <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
              <AccountCircleIcon sx={{ mr: 1 }} />
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              YouTube
            </Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Divider sx={{ mb: 2 }} />
          
          <List>
            {drawerItems.map((item) => (
              <ListItem
                key={item.text}
                button
                onClick={() => handleDrawerItemClick(item.path)}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>

          {!isAuthenticated && (
            <>
              <Divider sx={{ my: 2 }} />
              <Button
                variant="outlined"
                fullWidth
                startIcon={<AccountCircleIcon />}
                onClick={() => { navigate('/login'); setDrawerOpen(false); }}
                sx={{ mb: 1 }}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={() => { navigate('/register'); setDrawerOpen(false); }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
