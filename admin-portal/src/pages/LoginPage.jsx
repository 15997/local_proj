import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  InputAdornment, 
  IconButton,
  Alert
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { loginAdmin } from '../api/authApi';
import toast from 'react-hot-toast';

const schema = yup.object({
  email: yup.string().email('Enter a valid email address').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
}).required();

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorReason, setErrorReason] = useState(null);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setErrorReason(null);
    try {
      const response = await loginAdmin(data);
      const { token, admin } = response.data;
      
      // Save globally
      login(token, admin);
      
      toast.success(`Welcome back, ${admin.name}`);
      navigate('/dashboard');
    } catch (err) {
      setErrorReason(err.response?.data?.detail || 'Authentication failed. Please check your credentials.');
      // Optional shake animation trigger here
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      
      {/* LEFT SIDE: Branding Panel */}
      <Box 
        sx={{ 
          flex: 1, 
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 6,
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)'
        }}
      >
        {/* Subtle decorative circles */}
        <Box sx={{ position: 'absolute', top: '-10%', left: '-10%', width: '50%', height: '50%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)' }} />
        <Box sx={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '60%', height: '60%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)' }} />

        <Box sx={{ zIndex: 1, textAlign: 'center', maxWidth: 480 }}>
          <Box sx={{ 
            width: 80, height: 80, bgcolor: 'primary.main', borderRadius: 3, 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            color: 'white', fontSize: '2rem', fontWeight: 'bold', mb: 4, mx: 'auto',
            boxShadow: '0 0 40px rgba(99,102,241,0.4)'
          }}>
            A
          </Box>
          <Typography variant="h3" fontWeight={700} gutterBottom sx={{ color: 'white', letterSpacing: '-1px' }}>
            Addis Local Service Finder
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, mt: 2, lineHeight: 1.6 }}>
            Admin Control Center. <br /> Monitor metrics, verify providers, and manage platform integrity.
          </Typography>
        </Box>
      </Box>

      {/* RIGHT SIDE: Login Form Panel */}
      <Box 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          p: { xs: 2, sm: 6 },
          position: 'relative'
        }}
      >
        <Container maxWidth="sm">
          <Card 
            elevation={0} 
            sx={{ p: { xs: 2, sm: 4 }, bgcolor: 'background.paper' }}
          >
            <CardContent>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={600} gutterBottom color="text.primary">
                  Sign In
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Please enter your administrator credentials to continue.
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  (Hint: use admin@addis.com / Admin1234!)
                </Typography>
              </Box>

              {errorReason && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {errorReason}
                </Alert>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  variant="outlined"
                  margin="normal"
                  autoComplete="email"
                  autoFocus
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  id="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  margin="normal"
                  autoComplete="current-password"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{ mb: 3 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          color="inherit"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={isSubmitting}
                  sx={{ py: 1.5, fontSize: '1.1rem' }}
                >
                  {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Access Portal'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>

    </Box>
  );
};

export default LoginPage;
