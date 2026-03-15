import React from 'react';
import { Chip } from '@mui/material';

const getStatusColor = (status) => {
  const s = status.toLowerCase();
  if (['verified', 'approved', 'success'].includes(s)) return 'success';
  if (['pending'].includes(s)) return 'warning';
  if (['rejected', 'error', 'flagged'].includes(s)) return 'error';
  if (['under review'].includes(s)) return 'info';
  if (['suspended', 'deleted'].includes(s)) return 'default';
  return 'default';
};

const getStatusVariant = (status) => {
  const s = status.toLowerCase();
  if (['suspended', 'deleted'].includes(s)) return 'outlined';
  return 'filled';
};

const StatusBadge = ({ status, size = "small", sx = {} }) => {
  return (
    <Chip 
      label={status} 
      size={size}
      color={getStatusColor(status)}
      variant={getStatusVariant(status)}
      sx={{ fontWeight: 600, ...sx }}
    />
  );
};

export default StatusBadge;
