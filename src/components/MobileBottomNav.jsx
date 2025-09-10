import React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Home as HomeIcon,
  Explore as ExploreIcon,
  Subscriptions as SubscriptionsIcon,
  VideoLibrary as LibraryIcon,
  AccountCircle as AccountIcon,
  VideoCall as VideoCallIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const MobileBottomNav = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const getCurrentTab = () => {
    const path = location.pathname;
    if (path === '/') return 0;
    if (path === '/trending') return 1;
    if (path === '/subscriptions') return 2;
    if (path === '/library') return 3;
    if (path === '/channel-management' || path === '/create-channel') return 4;
    if (path === '/profile' || path === '/login' || path === '/register') return 5;
    return 0;
  };

  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/trending');
        break;
      case 2:
        navigate('/subscriptions');
        break;
      case 3:
        navigate('/library');
        break;
      case 4:
        navigate(isAuthenticated ? '/channel-management' : '/login');
        break;
      case 5:
        navigate(isAuthenticated ? '/profile' : '/login');
        break;
      default:
        navigate('/');
    }
  };

  if (!isMobile) return null;

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderTop: '1px solid #e0e0e0',
        backgroundColor: 'white',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
      elevation={8}
    >
      <BottomNavigation
        value={getCurrentTab()}
        onChange={handleChange}
        showLabels
        sx={{
          '& .MuiBottomNavigationAction-root': {
            minWidth: 'auto',
            padding: '6px 0',
            '&.Mui-selected': {
              color: 'primary.main',
            },
          },
          '& .MuiBottomNavigationAction-label': {
            fontSize: '0.7rem',
            marginTop: '4px',
          },
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="Explore"
          icon={<ExploreIcon />}
        />
        <BottomNavigationAction
          label="Subscriptions"
          icon={<SubscriptionsIcon />}
        />
        <BottomNavigationAction
          label="Library"
          icon={<LibraryIcon />}
        />
        <BottomNavigationAction
          label="Channel"
          icon={<VideoCallIcon />}
        />
        <BottomNavigationAction
          label={isAuthenticated ? "Profile" : "Sign In"}
          icon={<AccountIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default MobileBottomNav;
