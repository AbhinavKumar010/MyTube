import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Paper,
  IconButton,
  CircularProgress,
  Divider
} from '@mui/material';
import {
  Send as SendIcon,
  ThumbUp as ThumbUpIcon,
  Reply as ReplyIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';

const CommentSection = ({ videoId }) => {
  const { isAuthenticated, user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/comments/video/${videoId}`);
      setComments(response.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated) return;

    setSubmitting(true);
    try {
      const response = await axios.post('/api/comments', {
        content: newComment.trim(),
        videoId: videoId
      });
      
      setComments(prev => [response.data, ...prev]);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLikeComment = async (commentId) => {
    if (!isAuthenticated) return;

    try {
      const response = await axios.post(`/api/comments/${commentId}/like`);
      setComments(prev => 
        prev.map(comment => 
          comment._id === commentId 
            ? { ...comment, isLiked: response.data.isLiked, likeCount: response.data.likeCount }
            : comment
        )
      );
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Comments ({comments.length})
      </Typography>

      {/* Add Comment Form */}
      {isAuthenticated && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box component="form" onSubmit={handleSubmitComment}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Avatar
                src={user?.profilePicture}
                sx={{ width: 40, height: 40 }}
              >
                {user?.username?.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  variant="outlined"
                  size="small"
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!newComment.trim() || submitting}
                    startIcon={<SendIcon />}
                    size="small"
                  >
                    Comment
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      )}

      {/* Comments List */}
      {comments.map((comment) => (
        <Paper key={comment._id} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Avatar
              src={comment.author?.profilePicture}
              sx={{ width: 40, height: 40 }}
            >
              {comment.author?.username?.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                  {comment.author?.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </Typography>
                {comment.isEdited && (
                  <Typography variant="body2" color="text.secondary">
                    (edited)
                  </Typography>
                )}
              </Box>
              
              <Typography variant="body2" sx={{ mb: 1, whiteSpace: 'pre-wrap' }}>
                {comment.content}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => handleLikeComment(comment._id)}
                  color={comment.isLiked ? 'primary' : 'inherit'}
                >
                  <ThumbUpIcon fontSize="small" />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  {comment.likeCount}
                </Typography>
                <IconButton size="small">
                  <ReplyIcon fontSize="small" />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  Reply
                </Typography>
              </Box>

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <Box sx={{ mt: 2, ml: 2 }}>
                  {comment.replies.map((reply) => (
                    <Box key={reply._id} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <Avatar
                        src={reply.author?.profilePicture}
                        sx={{ width: 32, height: 32 }}
                      >
                        {reply.author?.username?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                            {reply.author?.username}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                          {reply.content}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Paper>
      ))}

      {comments.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          No comments yet. Be the first to comment!
        </Typography>
      )}
    </Box>
  );
};

export default CommentSection;
