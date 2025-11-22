import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  IconButton,
  Slider,
  Typography,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
  Fullscreen as FullscreenIcon,
  Settings as SettingsIcon,
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
  const [settingsAnchor, setSettingsAnchor] = useState(null);
  const [speedAnchor, setSpeedAnchor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  // 🔥 Auto-hide controls
  useEffect(() => {
    if (!isPlaying) {
      setShowControls(true);
      return;
    }

    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentTime, isPlaying]);

  const handlePlayPause = () => {
    const newPlaying = !isPlaying;
    setIsPlaying(newPlaying);
    onPlayPause?.(newPlaying);
  };

  const handleProgress = (state) => {
    setCurrentTime(state.playedSeconds);
    onProgress?.(state);
  };

  const handleDuration = (d) => {
    setDuration(d);
    onDuration?.(d);
  };

  const handleSeek = (_, newValue) => {
    const newTime = (newValue / 100) * duration;
    setCurrentTime(newTime);
    playerRef.current?.seekTo(newTime);
  };

  const handleVolumeChange = (_, newValue) => {
    const newVolume = newValue / 100;
    setVolumeLevel(newVolume);
    setIsMuted(newVolume === 0);
    onVolumeChange?.(newVolume);
  };

  const handleMuteToggle = () => setIsMuted(!isMuted);

  const handleSpeedChange = (rate) => {
    onPlaybackRateChange?.(rate);
    setSpeedAnchor(null);
  };

  const handleFullscreen = () => {
    playerRef.current?.getInternalPlayer()?.requestFullscreen?.();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleShowControls = () => {
    setShowControls(true);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        paddingTop: "56.25%", // Aspect ratio
        background: "#000",
      }}
      onMouseMove={handleShowControls}
      onTouchStart={handleShowControls}
    >
      {/* Video Player Layer */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
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
          onReady={() => setIsLoading(false)}
          onBuffer={() => setIsLoading(true)}
          onBufferEnd={() => setIsLoading(false)}
        />
      </Box>

      {/* Loading Indicator */}
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
          }}
        >
          <Typography variant="h6">Loading...</Typography>
        </Box>
      )}

      {/* Controls Layer */}
      <Box
        className="video-controls"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
          p: 2,
          opacity: showControls ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: showControls ? "auto" : "none",
        }}
      >

        {/* Time + Progress Bar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Typography sx={{ color: "white", width: "60px" }}>
            {formatTime(currentTime)}
          </Typography>

          <Slider
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            sx={{
              flexGrow: 1,
              color: "primary.main",
              "& .MuiSlider-thumb": { width: 14, height: 14 },
              "& .MuiSlider-track, & .MuiSlider-rail": { height: 4 },
            }}
          />

          <Typography sx={{ color: "white", width: "60px", textAlign: "right" }}>
            {formatTime(duration)}
          </Typography>
        </Box>

        {/* Control Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={handlePlayPause} sx={{ color: "white" }}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </IconButton>

          <IconButton onClick={handleMuteToggle} sx={{ color: "white" }}>
            {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton onClick={(e) => setSpeedAnchor(e.currentTarget)} sx={{ color: "white" }}>
            <SpeedIcon />
          </IconButton>

          <IconButton onClick={handleFullscreen} sx={{ color: "white" }}>
            <FullscreenIcon />
          </IconButton>
        </Box>
      </Box>

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
