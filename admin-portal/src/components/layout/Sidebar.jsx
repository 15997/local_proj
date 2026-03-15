import React from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography,
  Chip
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import GroupIcon from '@mui/icons-material/Group';
import PeopleIcon from '@mui/icons-material/PeopleAlt';
import StarIcon from '@mui/icons-material/Star';
import TimelineIcon from '@mui/icons-material/Timeline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 260;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Verification Queue', icon: <InboxIcon />, path: '/verification-queue', badge: 12 }, // mock badge
  { text: 'Provider Management', icon: <GroupIcon />, path: '/providers' },
  { text: 'User Management', icon: <PeopleIcon />, path: '/users' },
  { text: 'Review Moderation', icon: <StarIcon />, path: '/reviews', badge: 3 }, // mock badge
  { text: 'Analytics & Reports', icon: <TimelineIcon />, path: '/analytics' },
  { text: 'System Logs', icon: <ListAltIcon />, path: '/logs' },
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
          backgroundColor: 'background.paper',
          borderRight: '1px solid rgba(255,255,255,0.08)'
        },
      }}
    >
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Placeholder for real logo SVG */}
        <Box 
          sx={{ 
            width: 32, 
            height: 32, 
            bgcolor: 'primary.main', 
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          A
        </Box>
        <Typography variant="h6" color="text.primary" sx={{ letterSpacing: '-0.5px' }}>
          Admin Portal
        </Typography>
      </Box>
      <List sx={{ px: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                  borderLeft: isActive ? '3px solid #6366f1' : '3px solid transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.05)',
                  },
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    color: isActive ? 'primary.main' : 'text.secondary',
                    minWidth: 40
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    variant: 'body2',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'text.primary' : 'text.secondary'
                  }} 
                />
                {item.badge && (
                  <Chip 
                    label={item.badge} 
                    size="small" 
                    color={item.text === 'Verification Queue' ? 'warning' : 'error'}
                    sx={{ height: 20, fontSize: '0.7rem', fontWeight: 'bold' }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
