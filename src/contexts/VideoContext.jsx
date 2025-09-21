import { createContext, useContext, useState, useRef } from 'react';
import axios from 'axios';

const VideoContext = createContext();

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // Prevent duplicate simultaneous fetches
  const loadingRef = useRef(false);

  // Fetch multiple videos
  const fetchVideos = async (params = {}) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    try {
      const response = await axios.get('/api/videos', { params });
      setVideos(response.data.videos);
      return response.data;
    } catch (error) {
      if (error.response?.status === 429) {
        console.warn('Too many requests! Please wait a moment.');
      } else {
        console.error('Error fetching videos:', error);
      }
      return { videos: [], total: 0 };
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  // Fetch a single video
  const fetchVideo = async (id) => {
    if (!id || loadingRef.current) return null;
    loadingRef.current = true;
    setLoading(true);

    try {
      const response = await axios.get(`/api/videos/${id}`);
      setCurrentVideo(response.data);
      return response.data;
    } catch (error) {
      if (error.response?.status === 429) {
        console.warn('Too many requests! Please wait a moment.');
      } else {
        console.error('Error fetching video:', error);
      }
      return null;
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  // Search videos with optional debounce (500ms)
  const searchVideos = async (query, params = {}) => {
    if (!query) return { videos: [], total: 0 };
    if (loadingRef.current) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const response = await axios.get('/api/videos', {
        params: { search: query, ...params },
      });
      setSearchResults(response.data.videos);
      return response.data;
    } catch (error) {
      if (error.response?.status === 429) {
        console.warn('Too many requests! Please wait a moment.');
      } else {
        console.error('Error searching videos:', error);
      }
      return { videos: [], total: 0 };
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  // Like a video (only update state after backend success)
  const likeVideo = async (videoId) => {
    if (!videoId) return null;
    try {
      const response = await axios.post(`/api/videos/${videoId}/like`);
      return response.data; // contains {isLiked, likeCount, isDisliked, dislikeCount}
    } catch (error) {
      if (error.response?.status === 429) {
        console.warn('Too many requests! Please wait a moment.');
      } else {
        console.error('Error liking video:', error);
      }
      return null;
    }
  };

  // Dislike a video
  const dislikeVideo = async (videoId) => {
    if (!videoId) return null;
    try {
      const response = await axios.post(`/api/videos/${videoId}/dislike`);
      return response.data; // contains {isDisliked, dislikeCount, isLiked, likeCount}
    } catch (error) {
      if (error.response?.status === 429) {
        console.warn('Too many requests! Please wait a moment.');
      } else {
        console.error('Error disliking video:', error);
      }
      return null;
    }
  };

  // Subscribe to a channel
  const subscribeToChannel = async (channelId) => {
    if (!channelId) return null;
    try {
      const response = await axios.post(`/api/subscriptions/${channelId}`);
      return response.data; // contains {isSubscribed, subscriberCount}
    } catch (error) {
      if (error.response?.status === 429) {
        console.warn('Too many requests! Please wait a moment.');
      } else {
        console.error('Error subscribing to channel:', error);
      }
      return null;
    }
  };

  // Fetch subscription feed
  const fetchSubscriptionFeed = async (params = {}) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    try {
      const response = await axios.get('/api/subscriptions/feed', { params });
      setVideos(response.data.videos);
      return response.data;
    } catch (error) {
      if (error.response?.status === 429) {
        console.warn('Too many requests! Please wait a moment.');
      } else {
        console.error('Error fetching subscription feed:', error);
      }
      return { videos: [], total: 0 };
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  const value = {
    videos,
    currentVideo,
    loading,
    searchResults,
    fetchVideos,
    fetchVideo,
    searchVideos,
    likeVideo,
    dislikeVideo,
    subscribeToChannel,
    fetchSubscriptionFeed,
    setCurrentVideo,
  };

  return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
};
