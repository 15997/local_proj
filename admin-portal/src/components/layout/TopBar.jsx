import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box, 
  Avatar, 
  InputBase,
  Menu,
  MenuItem,
  Divider,
  Badge,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SecurityIcon from '@mui/icons-material/Security';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const TopBar = () => {
  const navigate = useNavigate();
  const { admin, logout } = useAuthStore();

  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [anchorElNotif, setAnchorElNotif] = useState(null);
  const [anchorElSearch, setAnchorElSearch] = useState(null);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleProfileMenuOpen = (event) => setAnchorElProfile(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorElProfile(null);

  const handleNotifMenuOpen = (event) => setAnchorElNotif(event.currentTarget);
  const handleNotifMenuClose = () => setAnchorElNotif(null);

  const handleSearchFocus = (event) => setAnchorElSearch(event.currentTarget);
  const handleSearchClose = () => setAnchorElSearch(null);

  const handleLogout = () => {
    handleProfileMenuClose();
    logout();
    navigate('/login');
  };

  const navigateTo = (path) => {
    handleProfileMenuClose();
    navigate(path);
  };

  const adminName = admin?.name || 'Alex Rivera';
  const adminEmail = admin?.email || 'admin@os.com';

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          bgcolor: '#0b0f19', 
          borderBottom: 'none',
          zIndex: 1
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: '64px !important', px: '24px !important', gap: 2 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              bgcolor: '#141b2d', 
              borderRadius: 2,
              px: 1.5,
              py: 0.5,
              flexGrow: 1,
              maxWidth: 320,
              border: '1px solid rgba(255,255,255,0.05)',
            }}
            onClick={handleSearchFocus}
          >
            <SearchIcon sx={{ color: '#6b7280', fontSize: 18, mr: 1 }} />
            <InputBase 
              placeholder="Global search commands..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ color: '#f9fafb', width: '100%', fontSize: '0.8rem' }} 
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton size="small" sx={{ color: '#9ca3af' }} onClick={handleNotifMenuOpen}>
              <Badge badgeContent={3} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem', height: 16, minWidth: 16 } }}>
                <NotificationsIcon sx={{ fontSize: 18 }} />
              </Badge>
            </IconButton>
            <IconButton size="small" sx={{ color: '#9ca3af' }} onClick={() => navigateTo('/settings')}>
              <SettingsIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <IconButton size="small" sx={{ color: '#9ca3af' }} onClick={() => setHelpDialogOpen(true)}>
              <HelpOutlineIcon sx={{ fontSize: 18 }} />
            </IconButton>

            <Box 
              sx={{ display: 'flex', alignItems: 'center', ml: 1, gap: 1, cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
              onClick={handleProfileMenuOpen}
            >
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#f9fafb', lineHeight: 1.2, fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                  {adminName}
                </Typography>
                <Typography variant="caption" sx={{ color: '#6b7280', letterSpacing: '0.5px', fontSize: '0.6rem', whiteSpace: 'nowrap' }}>
                  SYSTEM ADMIN
                </Typography>
              </Box>
              
              <Avatar 
                sx={{ width: 32, height: 32 }} 
                src="https://mui.com/static/images/avatar/2.jpg" 
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Notifications Menu */}
      <Menu
        anchorEl={anchorElNotif}
        open={Boolean(anchorElNotif)}
        onClose={handleNotifMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            bgcolor: '#141b2d',
            color: '#f9fafb',
            border: '1px solid rgba(255,255,255,0.05)',
            width: 320,
            borderRadius: 2
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle2" fontWeight={600}>Notifications</Typography>
          <Typography variant="caption" color="#6366f1" sx={{ cursor: 'pointer' }}>Mark all as read</Typography>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />
        <MenuItem onClick={handleNotifMenuClose} sx={{ py: 1.5, px: 2, '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
          <ListItemIcon sx={{ color: '#ef4444', minWidth: 36 }}><WarningAmberIcon fontSize="small" /></ListItemIcon>
          <Box>
            <Typography variant="body2" fontWeight={500}>High Risk Review Flagged</Typography>
            <Typography variant="caption" color="#9ca3af">Review #88192 needs immediate attention.</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleNotifMenuClose} sx={{ py: 1.5, px: 2, '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
          <ListItemIcon sx={{ color: '#6366f1', minWidth: 36 }}><SecurityIcon fontSize="small" /></ListItemIcon>
          <Box>
            <Typography variant="body2" fontWeight={500}>New Provider Verification</Typography>
            <Typography variant="caption" color="#9ca3af">Sarah Jenkins submitted KYC documents.</Typography>
          </Box>
        </MenuItem>
        <Box sx={{ p: 1, textAlign: 'center' }}>
          <Typography variant="caption" color="#6366f1" sx={{ cursor: 'pointer', fontWeight: 600 }}>View All Notifications</Typography>
        </Box>
      </Menu>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorElProfile}
        open={Boolean(anchorElProfile)}
        onClose={handleProfileMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            bgcolor: '#141b2d',
            color: '#f9fafb',
            border: '1px solid rgba(255,255,255,0.05)',
            minWidth: 200,
            borderRadius: 2
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="body2" fontWeight={600}>{adminName}</Typography>
          <Typography variant="caption" color="#9ca3af">{adminEmail}</Typography>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />
        <MenuItem onClick={() => navigateTo('/profile')} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
          <ListItemIcon sx={{ color: '#9ca3af' }}><PersonIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="My Profile" primaryTypographyProps={{ fontSize: '0.85rem' }} />
        </MenuItem>
        <MenuItem onClick={() => navigateTo('/settings')} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
          <ListItemIcon sx={{ color: '#9ca3af' }}><SettingsIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Settings" primaryTypographyProps={{ fontSize: '0.85rem' }} />
        </MenuItem>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />
        <MenuItem onClick={handleLogout} sx={{ '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' } }}>
          <ListItemIcon sx={{ color: 'inherit' }}><LogoutIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Sign Out" primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 500 }} />
        </MenuItem>
      </Menu>

      {/* Search Popover */}
      <Popover
        open={Boolean(anchorElSearch) && searchQuery.length > 0}
        anchorEl={anchorElSearch}
        onClose={handleSearchClose}
        disableAutoFocus
        disableEnforceFocus
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            mt: 1,
            width: 320,
            bgcolor: '#141b2d',
            color: '#f9fafb',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 2
          }
        }}
      >
        <List sx={{ p: 0 }}>
          <ListItem sx={{ py: 1, px: 2, bgcolor: 'rgba(255,255,255,0.02)' }}>
            <Typography variant="caption" color="#6b7280" fontWeight={600}>SEARCH RESULTS FOR "{searchQuery}"</Typography>
          </ListItem>
          <ListItem button onClick={handleSearchClose} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
            <ListItemIcon sx={{ color: '#9ca3af', minWidth: 36 }}><SearchIcon fontSize="small" /></ListItemIcon>
            <ListItemText primary={`Search users matching "${searchQuery}"`} primaryTypographyProps={{ fontSize: '0.85rem' }} />
          </ListItem>
          <ListItem button onClick={handleSearchClose} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
            <ListItemIcon sx={{ color: '#9ca3af', minWidth: 36 }}><SearchIcon fontSize="small" /></ListItemIcon>
            <ListItemText primary={`Search logs for "${searchQuery}"`} primaryTypographyProps={{ fontSize: '0.85rem' }} />
          </ListItem>
        </List>
      </Popover>

      {/* Help Dialog */}
      <Dialog 
        open={helpDialogOpen} 
        onClose={() => setHelpDialogOpen(false)}
        PaperProps={{ sx: { bgcolor: '#141b2d', color: '#f9fafb', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, maxWidth: 400, width: '100%' } }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#f9fafb' }}>
          <HelpOutlineIcon sx={{ color: '#6366f1' }} />
          System Help
        </DialogTitle>
        <DialogContent sx={{ color: '#9ca3af' }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Welcome to the Obsidian Pulse Admin interface. You are currently logged in as a System Admin.
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#f9fafb' }}>
            Keyboard Shortcuts:
          </Typography>
          <List dense disablePadding>
            <ListItem disablePadding sx={{ mb: 0.5 }}>• Press <strong>Ctrl + K</strong> to focus Search</ListItem>
            <ListItem disablePadding sx={{ mb: 0.5 }}>• Press <strong>Esc</strong> to close menus</ListItem>
            <ListItem disablePadding sx={{ mb: 0.5 }}>• Press <strong>?</strong> to open this help dialog</ListItem>
          </List>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={() => setHelpDialogOpen(false)} sx={{ color: '#6366f1', textTransform: 'none' }}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TopBar;
