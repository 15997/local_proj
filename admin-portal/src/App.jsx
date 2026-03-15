import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, IconButton, AppBar, Toolbar } from '@mui/material';
import { ThemeProvider, CssBaseline } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import BarChartIcon from '@mui/icons-material/BarChart';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { Toaster } from 'react-hot-toast';

import theme from './theme/theme';
import useAuthStore from './store/authStore';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import VerificationQueuePage from './pages/VerificationQueuePage';
import ProviderManagementPage from './pages/ProviderManagementPage';
import UserManagementPage from './pages/UserManagementPage';
import ReviewModerationPage from './pages/ReviewModerationPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SystemLogsPage from './pages/SystemLogsPage';

const drawerWidth = 260;

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

// Layout Component (Sidebar & Header)
const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, logout } = useAuthStore();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Verification Queue', icon: <SecurityIcon />, path: '/verification-queue' },
    { text: 'Provider Management', icon: <VerifiedUserIcon />, path: '/providers' },
    { text: 'User Management', icon: <PeopleOutlineIcon />, path: '/users' },
    { text: 'Review Moderation', icon: <StarOutlineIcon />, path: '/reviews' },
    { text: 'Analytics & Reports', icon: <BarChartIcon />, path: '/analytics' },
    { text: 'System Logs', icon: <HistoryIcon />, path: '/logs' },
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ width: 36, height: 36, bgcolor: 'primary.main', borderRadius: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>A</Box>
        <Typography variant="h6" fontWeight={700} color="text.primary">Admin OS</Typography>
      </Box>
      <List sx={{ px: 2, flexGrow: 1 }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <ListItem 
              button 
              key={item.text} 
              onClick={() => navigate(item.path)}
              sx={{ 
                borderRadius: 2, 
                mb: 1, 
                bgcolor: active ? 'rgba(99,102,241,0.1)' : 'transparent',
                color: active ? 'primary.main' : 'text.secondary',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', color: 'text.primary' }
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: active ? 600 : 500, fontSize: '0.9rem' }} />
            </ListItem>
          );
        })}
      </List>
      <Box sx={{ p: 3 }}>
        <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2, mb: 2 }}>
          <Typography variant="body2" fontWeight={600} gutterBottom>{admin?.name || 'Admin User'}</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>{admin?.email || 'admin@addis.com'}</Typography>
        </Box>
        <ListItem 
          button 
          onClick={handleLogout}
          sx={{ borderRadius: 2, color: 'text.secondary', '&:hover': { bgcolor: 'rgba(239,68,68,0.1)', color: 'error.main' } }}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><LogoutIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Log Out" primaryTypographyProps={{ fontWeight: 500, fontSize: '0.9rem' }} />
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="fixed" elevation={0} sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, bgcolor: 'background.default', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600, color: 'text.primary' }}>
            {navItems.find(i => i.path === location.pathname)?.text || 'Administration'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}>
          {drawer}
        </Drawer>
        <Drawer variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 'none' } }} open>
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 4 }, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: '64px' }}>
        {children}
      </Box>
    </Box>
  );
};

// Main App Router
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: { background: '#111827', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
        }} 
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected Area — Chunk 1 */}
          <Route path="/dashboard" element={<ProtectedRoute><Layout><DashboardPage /></Layout></ProtectedRoute>} />
          <Route path="/verification-queue" element={<ProtectedRoute><Layout><VerificationQueuePage /></Layout></ProtectedRoute>} />
          <Route path="/providers" element={<ProtectedRoute><Layout><ProviderManagementPage /></Layout></ProtectedRoute>} />
          
          {/* Protected Area — Chunk 2 */}
          <Route path="/users" element={<ProtectedRoute><Layout><UserManagementPage /></Layout></ProtectedRoute>} />
          <Route path="/reviews" element={<ProtectedRoute><Layout><ReviewModerationPage /></Layout></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Layout><AnalyticsPage /></Layout></ProtectedRoute>} />
          <Route path="/logs" element={<ProtectedRoute><Layout><SystemLogsPage /></Layout></ProtectedRoute>} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
