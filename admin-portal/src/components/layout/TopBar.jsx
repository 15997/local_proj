import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box, 
  Avatar, 
  Badge,
  Menu,
  MenuItem
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const getPageTitle = (pathname) => {
  if (pathname.includes('/dashboard')) return 'Admin Dashboard';
  if (pathname.includes('/verification-queue')) return 'Verification Queue';
  if (pathname.includes('/providers')) return 'Provider Management';
  if (pathname.includes('/users')) return 'User Management';
  if (pathname.includes('/reviews')) return 'Review Moderation';
  if (pathname.includes('/analytics')) return 'Analytics & Reports';
  if (pathname.includes('/logs')) return 'System Logs';
  return 'Admin Portal';
};

const TopBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const admin = useAuthStore((state) => state.admin);
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        bgcolor: 'background.paper', 
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        zIndex: (theme) => theme.zIndex.drawer - 1
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 72 }}>
        <Typography variant="h5" color="text.primary" sx={{ fontWeight: 600 }}>
          {getPageTitle(location.pathname)}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton size="large" color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, gap: 1.5 }}>
            <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                {admin?.name || 'Super Admin'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {admin?.role || 'Administrator'}
              </Typography>
            </Box>
            
            <IconButton
              size="small"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{ mt: 1 }}
            >
              <MenuItem onClick={handleClose}>Profile Settings</MenuItem>
              <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
                Sign Out
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
