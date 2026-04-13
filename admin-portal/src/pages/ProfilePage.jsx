import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Grid, Button, Divider, TextField } from '@mui/material';
import useAuthStore from '../store/authStore';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import ShieldIcon from '@mui/icons-material/Shield';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const ProfilePage = () => {
  const admin = useAuthStore(state => state.admin);
  
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto', width: '100%' }}>
      <Typography variant="h5" sx={{ color: '#f9fafb', fontWeight: 600, mb: 3 }}>
        My Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Left Column - Overview */}
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#141b2d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <Avatar 
                src="https://mui.com/static/images/avatar/2.jpg" 
                sx={{ width: 100, height: 100, mb: 2, border: '4px solid #1a2235' }}
              />
              <Typography variant="h6" sx={{ color: '#f9fafb', fontWeight: 600 }}>
                {admin?.name || 'Alex Rivera'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6366f1', mb: 2, fontWeight: 500 }}>
                SYSTEM ADMIN
              </Typography>
              
              <Box sx={{ width: '100%', mt: 2 }}>
                <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mb: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                  <EmailIcon sx={{ color: '#6b7280', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: '#9ca3af' }}>{admin?.email || 'admin@os.com'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                  <ShieldIcon sx={{ color: '#6b7280', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: '#9ca3af' }}>Super Admin Role</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <PersonIcon sx={{ color: '#6b7280', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: '#9ca3af' }}>Joined Jan 2023</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Edit Details */}
        <Grid item xs={12} md={8}>
          <Card sx={{ bgcolor: '#141b2d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ color: '#f9fafb', mb: 3, fontWeight: 600, fontSize: '1.1rem' }}>
                Personal Information
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                    <Typography variant="caption" sx={{ color: '#9ca3af' }}>Full Name</Typography>
                    <TextField 
                      fullWidth 
                      defaultValue={admin?.name || 'Alex Rivera'}
                      variant="outlined"
                      size="small"
                      sx={{ 
                        '& .MuiOutlinedInput-root': { color: '#f9fafb', bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 2 },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.05)' }
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                    <Typography variant="caption" sx={{ color: '#9ca3af' }}>Email Address</Typography>
                    <TextField 
                      fullWidth 
                      defaultValue={admin?.email || 'admin@os.com'}
                      variant="outlined"
                      size="small"
                      sx={{ 
                        '& .MuiOutlinedInput-root': { color: '#f9fafb', bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 2 },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.05)' }
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" sx={{ bgcolor: '#6366f1', color: 'white', borderRadius: 2, textTransform: 'none', px: 3 }}>
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ bgcolor: '#141b2d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ color: '#f9fafb', fontWeight: 600, fontSize: '1.1rem' }}>
                    Security
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                    Manage your password and security settings.
                  </Typography>
                </Box>
                <VpnKeyIcon sx={{ color: '#6b7aff', fontSize: 32, opacity: 0.5 }} />
              </Box>
              <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mb: 2 }} />
              <Button variant="outlined" sx={{ color: '#f9fafb', borderColor: 'rgba(255,255,255,0.2)', borderRadius: 2, textTransform: 'none' }}>
                Change Password
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
