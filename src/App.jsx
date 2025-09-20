// App.jsx
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { VideoProvider } from './contexts/VideoContext';
import { PWAProvider } from './contexts/PWAContext';

import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import PWAStatusIndicator from './components/PWAStatusIndicator';

import Home from './pages/Home';
import Trending from './pages/Trending';
import Subscriptions from './pages/Subscriptions';
import VideoPlayer from './pages/VideoPlayer';
import Channel from './pages/Channel';
import Upload from './pages/Upload';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import Library from './pages/Library';
import Playlists from './pages/Playlists';
import Profile from './pages/Profile';
import CreateChannel from './pages/CreateChannel';
import ChannelManagement from './pages/ChannelManagement';
import ChannelAnalytics from './pages/ChannelAnalytics';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <AuthProvider>
          <VideoProvider>
            <PWAProvider>
              <Router>
                <Navbar />
                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    pb: { xs: 8, md: 0 },
                    minHeight: 'calc(100vh - 64px)',
                  }}
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/trending" element={<Trending />} />
                    <Route path="/subscriptions" element={<Subscriptions />} />
                    <Route path="/video/:id" element={<VideoPlayer />} />
                    <Route path="/channel/:id" element={<Channel />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="/playlists" element={<Playlists />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/create-channel" element={<CreateChannel />} />
                    <Route path="/channel-management" element={<ChannelManagement />} />
                    <Route path="/channel/:id/analytics" element={<ChannelAnalytics />} />
                  </Routes>
                </Box>
                <MobileBottomNav />
                <PWAInstallPrompt />
                <PWAStatusIndicator />
              </Router>
            </PWAProvider>
          </VideoProvider>
        </AuthProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
