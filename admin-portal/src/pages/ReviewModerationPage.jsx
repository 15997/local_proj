import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  Typography, 
  TextField, 
  InputAdornment, 
  Chip, 
  Button, 
  IconButton,
  Tooltip,
  Rating
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FlagIcon from '@mui/icons-material/Flag';
import toast from 'react-hot-toast';

import { getReviews, moderateReview, deleteReview } from '../api/reviewsApi';
import DataTable from '../components/common/DataTable';
import ConfirmDialog from '../components/common/ConfirmDialog';

const ReviewModerationPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Flagged'); // Default to flagged

  const [confirmDialog, setConfirmDialog] = useState({ open: false, type: '', id: null, title: '', msg: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    loadData();
  }, [statusFilter, searchQuery]);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await getReviews({
        search: searchQuery,
        status: statusFilter
      });
      setData(response.data);
    } catch (error) {
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const executeAction = async () => {
    const { type, id } = confirmDialog;
    setIsProcessing(true);
    
    try {
      if (type === 'delete') {
        await deleteReview(id);
        toast.success('Review permanently deleted');
      } else {
        await moderateReview(id, type);
        toast.success(`Review status updated to ${type}`);
      }
      
      setConfirmDialog({ open: false });
      await loadData();
    } catch (error) {
      toast.error('Action failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published': return 'success';
      case 'Flagged': return 'error';
      case 'Hidden': return 'default';
      default: return 'default';
    }
  };

  const columns = [
    { 
      id: 'rating', 
      label: 'Rating', 
      width: '120px',
      render: (row) => <Rating value={row.rating} readOnly size="small" />
    },
    { 
      id: 'details', 
      label: 'Review Content',
      width: '40%',
      render: (row) => (
        <Box sx={{ py: 1 }}>
          <Typography variant="body2" sx={{ mb: 0.5, fontStyle: 'italic', wordBreak: 'break-word' }}>
            "{row.text}"
          </Typography>
          <Typography variant="caption" color="text.secondary">
            By <b>{row.author}</b> on {row.date}
          </Typography>
        </Box>
      )
    },
    { id: 'provider', label: 'Provider' },
    { 
      id: 'status', 
      label: 'Status',
      width: '120px',
      render: (row) => (
        <Chip 
          label={row.status} 
          size="small" 
          color={getStatusColor(row.status)} 
          variant={row.status === 'Hidden' ? 'outlined' : 'filled'}
          icon={row.status === 'Flagged' ? <FlagIcon fontSize="small" /> : undefined}
          sx={{ fontWeight: 600 }}
        />
      )
    },
    { 
      id: 'actions', 
      label: 'Moderation Actions', 
      align: 'right',
      render: (row) => (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          {row.status !== 'Published' && (
            <Tooltip title="Approve & Publish">
              <IconButton 
                size="small" 
                color="success"
                onClick={() => setConfirmDialog({ open: true, type: 'Published', id: row.id, title: 'Approve Review?', msg: 'This review will become visible on the public provider profile.' })}
              >
                <CheckCircleOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          {row.status !== 'Hidden' && (
            <Tooltip title="Hide Output">
              <IconButton 
                size="small" 
                color="warning"
                onClick={() => setConfirmDialog({ open: true, type: 'Hidden', id: row.id, title: 'Hide Review?', msg: 'This review will be removed from public view but kept in our logs.' })}
              >
                <VisibilityOffIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Delete Permanently">
            <IconButton 
              size="small" 
              color="error"
              onClick={() => setConfirmDialog({ open: true, type: 'delete', id: row.id, title: 'Delete Forever?', msg: 'This destructive action cannot be undone.' })}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Monitor and moderate user-submitted reviews to maintain platform integrity.
        </Typography>
      </Box>

      {/* Toolbar */}
      <Card sx={{ mb: 4 }}>
        <Box sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <TextField
            placeholder="Search keywords..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: { xs: '100%', sm: 300 } }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>,
            }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            {['All', 'Flagged', 'Published', 'Hidden'].map(status => (
              <Chip 
                key={status}
                label={status}
                onClick={() => setStatusFilter(status)}
                color={statusFilter === status ? 'primary' : 'default'}
                variant={statusFilter === status ? 'filled' : 'outlined'}
                sx={{ cursor: 'pointer', fontWeight: 600 }}
                icon={status === 'Flagged' ? <FlagIcon fontSize="small" /> : undefined}
              />
            ))}
          </Box>
        </Box>
        
        <DataTable 
          columns={columns} 
          data={data} 
          loading={loading} 
        />
      </Card>

      <ConfirmDialog 
        open={confirmDialog.open}
        title={confirmDialog.title}
        message={confirmDialog.msg}
        confirmText="Confirm"
        confirmColor={confirmDialog.type === 'delete' ? 'error' : 'primary'}
        onConfirm={executeAction}
        onCancel={() => setConfirmDialog({ open: false })}
      />
    </Box>
  );
};

export default ReviewModerationPage;
