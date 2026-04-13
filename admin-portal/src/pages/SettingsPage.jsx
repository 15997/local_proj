import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Divider, Switch, FormControlLabel } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    emailNotif: true,
    pushNotif: false,
    darkMode: true,
    twoFactor: false,
    autoLogout: true
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto', width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <SettingsIcon sx={{ color: '#6366f1', fontSize: 28 }} />
        <Typography variant="h5" sx={{ color: '#f9fafb', fontWeight: 600 }}>
          System Settings
        </Typography>
      </Box>

      <Card sx={{ bgcolor: '#141b2d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ color: '#f9fafb', mb: 1, fontWeight: 600, fontSize: '1.1rem' }}>
            Notifications
          </Typography>
          <Typography variant="body2" sx={{ color: '#9ca3af', mb: 3 }}>
            Manage how you receive alerts and system updates.
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="body2" sx={{ color: '#f9fafb', fontWeight: 500 }}>Email Notifications</Typography>
              <Typography variant="caption" sx={{ color: '#6b7280' }}>Receive alerts directly to your inbox.</Typography>
            </Box>
            <Switch 
              checked={settings.emailNotif} 
              onChange={() => handleToggle('emailNotif')}
              sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#6366f1' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#6366f1' } }}
            />
          </Box>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="body2" sx={{ color: '#f9fafb', fontWeight: 500 }}>Push Notifications</Typography>
              <Typography variant="caption" sx={{ color: '#6b7280' }}>Browser push notifications for critical events.</Typography>
            </Box>
            <Switch 
              checked={settings.pushNotif} 
              onChange={() => handleToggle('pushNotif')}
              sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#6366f1' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#6366f1' } }}
            />
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ bgcolor: '#141b2d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ color: '#f9fafb', mb: 1, fontWeight: 600, fontSize: '1.1rem' }}>
            Security & Preferences
          </Typography>
          <Typography variant="body2" sx={{ color: '#9ca3af', mb: 3 }}>
            Manage advanced security settings and display preferences.
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="body2" sx={{ color: '#f9fafb', fontWeight: 500 }}>Two-Factor Authentication (2FA)</Typography>
              <Typography variant="caption" sx={{ color: '#6b7280' }}>Require a secondary code when logging in.</Typography>
            </Box>
            <Switch 
              checked={settings.twoFactor} 
              onChange={() => handleToggle('twoFactor')}
              sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#6366f1' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#6366f1' } }}
            />
          </Box>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="body2" sx={{ color: '#f9fafb', fontWeight: 500 }}>Auto-Logout</Typography>
              <Typography variant="caption" sx={{ color: '#6b7280' }}>Automatically end session after 30 minutes of inactivity.</Typography>
            </Box>
            <Switch 
              checked={settings.autoLogout} 
              onChange={() => handleToggle('autoLogout')}
              sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#6366f1' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#6366f1' } }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SettingsPage;
