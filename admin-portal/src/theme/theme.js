import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0b0f19', // Deep navy-black app background
      paper: '#141b2d',   // Card/panel surfaces
    },
    primary: {
      main: '#6366f1',    // Indigo accent
    },
    secondary: {
      main: '#c084fc',    // Purple accent (from Monthly Active Users chart)
    },
    warning: {
      main: '#f59e0b',
    },
    error: {
      main: '#ef4444',
    },
    success: {
      main: '#10b981',    // Emerald green
    },
    text: {
      primary: '#f9fafb',
      secondary: '#9ca3af',
    },
    divider: 'rgba(255,255,255,0.05)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#161d30', // Solid dark card background
          border: '1px solid rgba(255,255,255,0.03)',
          boxShadow: 'none',
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
          '&:hover': {
            boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        },
        head: {
          fontWeight: 600,
          color: '#9ca3af',
        },
      },
    },
  },
});

export default theme;
