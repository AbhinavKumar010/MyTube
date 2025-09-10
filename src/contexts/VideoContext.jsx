import { createContext, useContext, useState } from 'react';
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

  const fetchVideos = async (params = {}) => {
    setLoading(true);
    try {
      const response = await axios.get('/api/videos', { params });
      setVideos(response.data.videos);
      return response.data;
    } catch (error) {
      console.error('Error fetching videos:', error);
      return { videos: [], total: 0 };
    } finally {
      setLoading(false);
    }
  };

  const fetchVideo = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/videos/${id}`);
      setCurrentVideo(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching video:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const searchVideos = async (query, params = {}) => {
    setLoading(true);
    try {
      const response = await axios.get('/api/videos', {
        params: { search: query, ...params }
      });
      setSearchResults(response.data.videos);
      return response.data;
    } catch (error) {
      console.error('Error searching videos:', error);
      return { videos: [], total: 0 };
    } finally {
      setLoading(false);
    }
  };

  const likeVideo = async (videoId) => {
    try {
      const response = await axios.post(`/api/videos/${videoId}/like`);
      return response.data;
    } catch (error) {
      console.error('Error liking video:', error);
      return null;
    }
  };

  const dislikeVideo = async (videoId) => {
    try {
      const response = await axios.post(`/api/videos/${videoId}/dislike`);
      return response.data;
    } catch (error) {
      console.error('Error disliking video:', error);
      return null;
    }
  };

  const subscribeToChannel = async (channelId) => {
    try {
      const response = await axios.post(`/api/subscriptions/${channelId}`);
      return response.data;
    } catch (error) {
      console.error('Error subscribing to channel:', error);
      return null;
    }
  };

  const fetchSubscriptionFeed = async (params = {}) => {
    setLoading(true);
    try {
      const response = await axios.get('/api/subscriptions/feed', { params });
      setVideos(response.data.videos);
      return response.data;
    } catch (error) {
      console.error('Error fetching subscription feed:', error);
      return { videos: [], total: 0 };
    } finally {
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
    setCurrentVideo
  };

  return (
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  );
};
