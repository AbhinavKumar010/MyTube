import React from 'react';
import { Box, Chip, Tooltip } from '@mui/material';
import {
  Wifi as OnlineIcon,
  WifiOff as OfflineIcon,
  GetApp as InstalledIcon,
  Smartphone as PWAIcon
} from '@mui/icons-material';
import { usePWA } from '../contexts/PWAContext';

const PWAStatusIndicator = () => {
  const { isOnline, isInstalled } = usePWA();

  if (isInstalled) {
    return (
      <Tooltip title="App is installed">
        <Chip
          icon={<InstalledIcon />}
          label="Installed"
          color="success"
          size="small"
          sx={{ 
            position: 'fixed',
            top: 10,
            right: 10,
            zIndex: 1000,
            display: { xs: 'none', sm: 'flex' }
          }}
        />
      </Tooltip>
    );
  }

  return (
    <Box sx={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}>
      <Tooltip title={isOnline ? 'Online' : 'Offline'}>
        <Chip
          icon={isOnline ? <OnlineIcon /> : <OfflineIcon />}
          label={isOnline ? 'Online' : 'Offline'}
          color={isOnline ? 'success' : 'error'}
          size="small"
          sx={{ display: { xs: 'none', sm: 'flex' } }}
        />
      </Tooltip>
    </Box>
  );
};

export default PWAStatusIndicator;
