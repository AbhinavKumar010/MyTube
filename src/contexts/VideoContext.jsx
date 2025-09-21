import { createContext, useContext, useState, useRef } from 'react';
import axios from 'axios';
import { mockVideos } from '../data/mockVideos'; // import your mockVideos array

const VideoContext = createContext();

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};

export const VideoProvider = ({ children, useMock = true }) => {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const loadingRef = useRef(false);

  // -------------------- Fetch multiple videos --------------------
  const fetchVideos = async (params = {}) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    try {
      if (useMock) {
        setVideos(mockVideos);
        return { videos: mockVideos, total: mockVideos.length };
      }

      const response = await axios.get('/api/videos', { params });
      setVideos(response.data.videos);
      return response.data;
    } catch (error) {
      console.error('Error fetching videos:', error);
      return { videos: [], total: 0 };
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  // -------------------- Fetch single video --------------------
  const fetchVideo = async (id) => {
    if (!id || loadingRef.current) return null;
    loadingRef.current = true;
    setLoading(true);

    try {
      if (useMock) {
        const video = mockVideos.find(v => v._id === id) || null;
        setCurrentVideo(video);
        return video;
      }

      const response = await axios.get(`/api/videos/${id}`);
      setCurrentVideo(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching video:', error);
      return null;
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  // -------------------- Search Videos --------------------
  const searchVideos = async (query, params = {}) => {
    if (!query) return { videos: [], total: 0 };
    if (loadingRef.current) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      if (useMock) {
        const results = mockVideos.filter(video =>
          video.title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
        return { videos: results, total: results.length };
      }

      const response = await axios.get('/api/videos', {
        params: { search: query, ...params },
      });
      setSearchResults(response.data.videos);
      return response.data;
    } catch (error) {
      console.error('Error searching videos:', error);
      return { videos: [], total: 0 };
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  // -------------------- Like Video --------------------
  const likeVideo = async (videoId) => {
    if (!videoId) return null;

    if (useMock) {
      // Update local mock video
      const updatedVideos = videos.map(video => {
        if (video._id === videoId) {
          video.likeCount = (video.likeCount || 0) + 1;
          video.isLikedByUser = true;
        }
        return video;
      });
      setVideos(updatedVideos);
      const updatedVideo = updatedVideos.find(v => v._id === videoId);
      setCurrentVideo(updatedVideo);
      return {
        isLiked: true,
        likeCount: updatedVideo.likeCount,
        isDisliked: false,
        dislikeCount: updatedVideo.dislikeCount || 0
      };
    }

    try {
      const response = await axios.post(`/api/videos/${videoId}/like`);
      return response.data;
    } catch (error) {
      console.error('Error liking video:', error);
      return null;
    }
  };

  // -------------------- Dislike Video --------------------
  const dislikeVideo = async (videoId) => {
    if (!videoId) return null;

    if (useMock) {
      const updatedVideos = videos.map(video => {
        if (video._id === videoId) {
          video.dislikeCount = (video.dislikeCount || 0) + 1;
          video.isDislikedByUser = true;
        }
        return video;
      });
      setVideos(updatedVideos);
      const updatedVideo = updatedVideos.find(v => v._id === videoId);
      setCurrentVideo(updatedVideo);
      return {
        isDisliked: true,
        dislikeCount: updatedVideo.dislikeCount,
        isLiked: false,
        likeCount: updatedVideo.likeCount || 0
      };
    }

    try {
      const response = await axios.post(`/api/videos/${videoId}/dislike`);
      return response.data;
    } catch (error) {
      console.error('Error disliking video:', error);
      return null;
    }
  };

  // -------------------- Subscribe to Channel --------------------
  const subscribeToChannel = async (channelId) => {
    if (!channelId) return null;

    if (useMock) {
      const updatedVideos = videos.map(video => {
        if (video.uploader?._id === channelId) {
          video.uploader.subscriberCount = (video.uploader.subscriberCount || 0) + 1;
          video.isSubscribedByUser = true;
        }
        return video;
      });
      setVideos(updatedVideos);
      return {
        isSubscribed: true,
        subscriberCount: updatedVideos.find(v => v.uploader?._id === channelId)?.uploader.subscriberCount || 0
      };
    }

    try {
      const response = await axios.post(`/api/subscriptions/${channelId}`);
      return response.data;
    } catch (error) {
      console.error('Error subscribing to channel:', error);
      return null;
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
    setCurrentVideo,
  };

  return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
};
