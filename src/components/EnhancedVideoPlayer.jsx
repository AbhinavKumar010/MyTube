import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  IconButton,
  Slider,
  Typography,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  Paper,
  Chip
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
  Fullscreen as FullscreenIcon,
  Settings as SettingsIcon,
  Replay as ReplayIcon,
  SkipNext as SkipNextIcon,
  SkipPrevious as SkipPreviousIcon,
  Speed as SpeedIcon,
  ClosedCaption as CaptionIcon
} from '@mui/icons-material';
import ReactPlayer from 'react-player';

const EnhancedVideoPlayer = ({ 
  url, 
  onEnded, 
  onProgress, 
  onDuration,
  playing = false,
  onPlayPause,
  volume = 0.8,
  onVolumeChange,
  playbackRate = 1,
  onPlaybackRateChange
}) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(playing);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volumeLevel, setVolumeLevel] = useState(volume);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [settingsAnchor, setSettingsAnchor] = useState(null);
  const [speedAnchor, setSpeedAnchor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  useEffect(() => {
    setIsPlaying(playing);
  }, [playing]);

  useEffect(() => {
    setVolumeLevel(volume);
  }, [volume]);

  const handlePlayPause = () => {
    const newPlaying = !isPlaying;
    setIsPlaying(newPlaying);
    onPlayPause?.(newPlaying);
  };

  const handleProgress = (state) => {
    setCurrentTime(state.playedSeconds);
    onProgress?.(state);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
    onDuration?.(duration);
  };

  const handleSeek = (event, newValue) => {
    const newTime = (newValue / 100) * duration;
    setCurrentTime(newTime);
    playerRef.current?.seekTo(newTime);
  };

  const handleVolumeChange = (event, newValue) => {
    const newVolume = newValue / 100;
    setVolumeLevel(newVolume);
    setIsMuted(newVolume === 0);
    onVolumeChange?.(newVolume);
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolumeLevel(0.8);
      onVolumeChange?.(0.8);
    } else {
      setIsMuted(true);
      onVolumeChange?.(0);
    }
  };

  const handleSpeedChange = (rate) => {
    onPlaybackRateChange?.(rate);
    setSpeedAnchor(null);
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.getInternalPlayer()?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    setTimeout(() => setShowControls(false), 3000);
  };

  const handleReady = () => {
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: '#e41212ff',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        '&:hover .video-controls': {
          opacity: 1,
        },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Player */}
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={isPlaying}
        volume={isMuted ? 0 : volumeLevel}
        playbackRate={playbackRate}
        width="100%"
        height="100%"
        onProgress={handleProgress}
        onDuration={handleDuration}
        onEnded={onEnded}
        onReady={handleReady}
        onBuffer={() => setIsLoading(true)}
        onBufferEnd={() => setIsLoading(false)}
        config={{
          youtube: {
            playerVars: {
              controls: 0,
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
            },
          },
        }}
      />

      {/* Loading Indicator */}
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
          }}
        >
          <Typography variant="h6">Loading...</Typography>
        </Box>
      )}

      {/* Video Controls */}
      <Box
        className="video-controls"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
          p: 2,
          opacity: showControls ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        {/* Progress Bar */}
        <Box sx={{ mb: 2 }}>
          <Slider
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            sx={{
              color: 'primary.main',
              '& .MuiSlider-thumb': {
                width: 14,
                height: 14,
              },
              '& .MuiSlider-track': {
                height: 4,
              },
              '& .MuiSlider-rail': {
                height: 4,
                opacity: 0.3,
              },
            }}
          />
        </Box>

        {/* Control Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Play/Pause */}
          <IconButton onClick={handlePlayPause} sx={{ color: 'white' }}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </IconButton>

          {/* Time Display */}
          <Typography variant="body2" sx={{ color: 'white', minWidth: '80px' }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </Typography>

          {/* Volume */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
            <IconButton onClick={handleMuteToggle} sx={{ color: 'white' }}>
              {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>
            <Slider
              value={isMuted ? 0 : volumeLevel * 100}
              onChange={handleVolumeChange}
              sx={{
                width: 80,
                color: 'primary.main',
                '& .MuiSlider-thumb': {
                  width: 12,
                  height: 12,
                },
              }}
            />
          </Box>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Settings Menu */}
          <Tooltip title="Settings">
            <IconButton
              onClick={(e) => setSettingsAnchor(e.currentTarget)}
              sx={{ color: 'white' }}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          {/* Speed Menu */}
          <Tooltip title="Playback Speed">
            <IconButton
              onClick={(e) => setSpeedAnchor(e.currentTarget)}
              sx={{ color: 'white' }}
            >
              <SpeedIcon />
            </IconButton>
          </Tooltip>

          {/* Fullscreen */}
          <Tooltip title="Fullscreen">
            <IconButton onClick={handleFullscreen} sx={{ color: 'white' }}>
              <FullscreenIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Settings Menu */}
      <Menu
        anchorEl={settingsAnchor}
        open={Boolean(settingsAnchor)}
        onClose={() => setSettingsAnchor(null)}
      >
        <MenuItem>
          <CaptionIcon sx={{ mr: 1 }} />
          Captions
        </MenuItem>
        <MenuItem>
          <SettingsIcon sx={{ mr: 1 }} />
          Quality
        </MenuItem>
      </Menu>

      {/* Speed Menu */}
      <Menu
        anchorEl={speedAnchor}
        open={Boolean(speedAnchor)}
        onClose={() => setSpeedAnchor(null)}
      >
        {playbackRates.map((rate) => (
          <MenuItem
            key={rate}
            onClick={() => handleSpeedChange(rate)}
            selected={playbackRate === rate}
          >
            {rate}x
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};



export default EnhancedVideoPlayer;
