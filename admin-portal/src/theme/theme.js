import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a0e1a', // Deep navy-black app background
      paper: '#111827',   // Card/panel surfaces
    },
    primary: {
      main: '#6366f1',    // Indigo accent - buttons, links
    },
    secondary: {
      main: '#10b981',    // Emerald green - success, verified badges
    },
    warning: {
      main: '#f59e0b',    // Amber - pending states
    },
    error: {
      main: '#ef4444',    // Red - rejected, danger actions
    },
    text: {
      primary: '#f9fafb', // Near-white readable text
      secondary: '#9ca3af', // Muted grey labels
    },
    divider: 'rgba(255,255,255,0.08)', // Subtle glass dividers
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(17, 24, 39, 0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
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
