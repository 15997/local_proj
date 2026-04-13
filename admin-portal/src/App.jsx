import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';

import theme from './theme/theme';
import useAuthStore from './store/authStore';
import AppLayout from './components/layout/AppLayout';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import VerificationQueuePage from './pages/VerificationQueuePage';
import ProviderManagementPage from './pages/ProviderManagementPage';
import UserManagementPage from './pages/UserManagementPage';
import ReviewModerationPage from './pages/ReviewModerationPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SystemLogsPage from './pages/SystemLogsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
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
          <Route path="/dashboard" element={<ProtectedRoute><AppLayout><DashboardPage /></AppLayout></ProtectedRoute>} />
          <Route path="/verification-queue" element={<ProtectedRoute><AppLayout><VerificationQueuePage /></AppLayout></ProtectedRoute>} />
          <Route path="/providers" element={<ProtectedRoute><AppLayout><ProviderManagementPage /></AppLayout></ProtectedRoute>} />
          
          {/* Protected Area — Chunk 2 */}
          <Route path="/users" element={<ProtectedRoute><AppLayout><UserManagementPage /></AppLayout></ProtectedRoute>} />
          <Route path="/reviews" element={<ProtectedRoute><AppLayout><ReviewModerationPage /></AppLayout></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><AppLayout><AnalyticsPage /></AppLayout></ProtectedRoute>} />
          <Route path="/logs" element={<ProtectedRoute><AppLayout><SystemLogsPage /></AppLayout></ProtectedRoute>} />
          
          {/* Protected Area — Settings & Profile */}
          <Route path="/profile" element={<ProtectedRoute><AppLayout><ProfilePage /></AppLayout></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><AppLayout><SettingsPage /></AppLayout></ProtectedRoute>} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
