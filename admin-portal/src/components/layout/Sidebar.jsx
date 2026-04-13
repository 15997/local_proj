import React from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import GroupIcon from '@mui/icons-material/Group';
import PeopleIcon from '@mui/icons-material/PeopleAlt';
import StarIcon from '@mui/icons-material/Star';
import TimelineIcon from '@mui/icons-material/Timeline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 220;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: 18 }} />, path: '/dashboard' },
  { text: 'Verification Queue', icon: <InboxIcon sx={{ fontSize: 18 }} />, path: '/verification-queue' },
  { text: 'Provider Management', icon: <GroupIcon sx={{ fontSize: 18 }} />, path: '/providers' },
  { text: 'User Management', icon: <PeopleIcon sx={{ fontSize: 18 }} />, path: '/users' },
  { text: 'Review Moderation', icon: <StarIcon sx={{ fontSize: 18 }} />, path: '/reviews' },
  { text: 'Analytics & Reports', icon: <TimelineIcon sx={{ fontSize: 18 }} />, path: '/analytics' },
  { text: 'System Logs', icon: <ListAltIcon sx={{ fontSize: 18 }} />, path: '/logs' },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box',
          backgroundColor: '#0a0d14',
          borderRight: 'none',
          display: 'flex',
          flexDirection: 'column'
        },
      }}
    >
      <Box sx={{ p: '20px 16px 24px 16px', display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box 
          sx={{ 
            width: 32, 
            height: 32, 
            bgcolor: '#6b7aff', 
            borderRadius: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '1rem'
          }}
        >
          A
        </Box>
        <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600, fontSize: '1rem' }}>
          Admin OS
        </Typography>
      </Box>

      <List sx={{ px: 1.5, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 1.5,
                  backgroundColor: isActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                  padding: '6px 12px',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.05)',
                  },
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    color: isActive ? '#6b7aff' : '#6b7280',
                    minWidth: 34
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    color: isActive ? '#6b7aff' : '#9ca3af',
                    whiteSpace: 'nowrap'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ p: 2 }}>
        <Box 
          sx={{ 
            p: 1.5, 
            borderRadius: 2, 
            backgroundColor: '#111522',
            border: '1px solid rgba(255,255,255,0.03)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 1.5
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#f9fafb', mb: 0.25, fontSize: '0.8rem' }}>
            Super Admin
          </Typography>
          <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.7rem' }}>
            admin@addis.com
          </Typography>
        </Box>
        
        <ListItemButton
          onClick={() => navigate('/login')}
          sx={{
            borderRadius: 1.5,
            padding: '6px 12px',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' },
          }}
        >
          <ListItemIcon sx={{ color: '#6b7280', minWidth: 34 }}>
            <LogoutIcon sx={{ fontSize: 18 }} />
          </ListItemIcon>
          <ListItemText 
            primary="Log Out" 
            primaryTypographyProps={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 500 }} 
          />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
