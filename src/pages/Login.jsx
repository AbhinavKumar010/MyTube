import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Link, Alert, CircularProgress } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await login(formData.email, formData.password);
    if (result.success) navigate('/');
    else setError(result.message);
    setLoading(false);
  };

  return (
    <Box className="login-container">
      <Paper className="login-paper">
        <Box className="login-header">
          <Typography component="h1">BharatTube</Typography>
          <Typography component="h2">Sign In</Typography>
          <Typography component="p">Sign in to your account to continue</Typography>
        </Box>

        {error && <Alert severity="error" className="login-error">{error}</Alert>}

        <Box component="form" className="login-form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            autoFocus
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>

          <Box className="login-footer">
            <Typography>
              Don't have an account?{' '}
              <Link component={RouterLink} to="/register" underline="hover">
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
