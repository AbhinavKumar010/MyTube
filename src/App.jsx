<<<<<<< HEAD
import { Routes, Route, Navigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import VideoPlayer from "./pages/VideoPlayer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

// Protected Route
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video/:id" element={<VideoPlayer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <div>Profile Page</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import { VideoProvider } from './contexts/VideoContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { PWAProvider } from './contexts/PWAContext';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import Home from './pages/Home';
import VideoPlayer from './pages/VideoPlayer';
import Channel from './pages/Channel';
import Upload from './pages/Upload';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import Library from './pages/Library';
import Trending from './pages/Trending';
import Subscriptions from './pages/Subscriptions';
import Playlists from './pages/Playlists';
import Profile from './pages/Profile';
import CreateChannel from './pages/CreateChannel';
import ChannelManagement from './pages/ChannelManagement';
import ChannelAnalytics from './pages/ChannelAnalytics';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import OfflinePage from './components/OfflinePage';
import PWAStatusIndicator from './components/PWAStatusIndicator';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff0000',
    },
    secondary: {
      main: '#282828',
    },
    background: {
      default: '#f9f9f9',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <PWAProvider>
          <AuthProvider>
            <VideoProvider>
              <NotificationProvider>
                <Router>
                  <div className="App">
                    <Navbar />
                    <Box sx={{
                      flexGrow: 1,
                      pb: { xs: 8, md: 0 },
                      minHeight: 'calc(100vh - 64px)'
                    }}>
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
                        <Route path="/offline" element={<OfflinePage />} />
                      </Routes>
                    </Box>
                    <MobileBottomNav />
                    <PWAInstallPrompt />
                    <PWAStatusIndicator />
                  </div>
                </Router>
              </NotificationProvider>
            </VideoProvider>
          </AuthProvider>
        </PWAProvider>
      </ErrorBoundary>
    </ThemeProvider>
>>>>>>> 87242f82151e73030e84310ec42fa8acb9aaa44f
  );
}

export default App;
