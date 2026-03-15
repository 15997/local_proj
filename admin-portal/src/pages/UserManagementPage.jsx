import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  Typography, 
  TextField, 
  InputAdornment, 
  Select, 
  MenuItem, 
  Button, 
  IconButton,
  Tooltip,
  Drawer,
  Chip,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  Rating
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import toast from 'react-hot-toast';

import { getUsers, getUserDetails, updateUserStatus } from '../api/usersApi';
import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';
import ConfirmDialog from '../components/common/ConfirmDialog';

const UserManagementPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  const [confirmDialog, setConfirmDialog] = useState({ open: false, type: '', id: null });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    loadData();
  }, [statusFilter, searchQuery]);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await getUsers({
        search: searchQuery,
        status: statusFilter
      });
      setData(response.data);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = async (row) => {
    setIsDetailLoading(true);
    setDrawerOpen(true);
    try {
      const response = await getUserDetails(row.id);
      setSelectedUser(response.data);
    } catch (error) {
      toast.error('Failed to load user details');
      setDrawerOpen(false);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleStatusChange = async () => {
    const { type, id } = confirmDialog;
    setIsProcessing(true);
    const newStatus = type === 'suspend' ? 'Suspended' : 'Active';
    
    try {
      await updateUserStatus(id, newStatus);
      toast.success(`User ${type === 'suspend' ? 'suspended' : 'reactivated'} successfully`);
      if (drawerOpen && selectedUser) {
        setSelectedUser({ ...selectedUser, status: newStatus });
      }
      setConfirmDialog({ open: false });
      await loadData();
    } catch (error) {
      toast.error('Failed to update user status');
    } finally {
      setIsProcessing(false);
    }
  };

  const columns = [
    { 
      id: 'name', 
      label: 'User Name', 
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '1rem' }}>
            {row.name.charAt(0)}
          </Avatar>
          <Typography variant="body2" fontWeight={600}>{row.name}</Typography>
        </Box>
      ) 
    },
    { id: 'email', label: 'Email Address' },
    { id: 'phone', label: 'Phone' },
    { id: 'registeredDate', label: 'Joined Date' },
    { id: 'totalReviews', label: 'Total Reviews' },
    { 
      id: 'status', 
      label: 'Status', 
      render: (row) => <StatusBadge status={row.status} /> 
    },
    { 
      id: 'actions', 
      label: 'Actions', 
      align: 'right',
      render: (row) => (
        <Tooltip title="View Profile">
          <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleRowClick(row); }}>
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )
    }
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Manage client accounts and monitor their activity on the platform.
        </Typography>
      </Box>

      {/* Toolbar */}
      <Card sx={{ mb: 4 }}>
        <Box sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <TextField
            placeholder="Search name, email, or phone..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: { xs: '100%', sm: 300 } }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>,
            }}
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            size="small"
            sx={{ minWidth: 150 }}
          >
            {['All', 'Active', 'Suspended'].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </Select>
        </Box>
        
        <DataTable 
          columns={columns} 
          data={data} 
          loading={loading} 
          onRowClick={handleRowClick}
        />
      </Card>

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: '40vw', minWidth: 400, bgcolor: 'background.paper' } }}
      >
        {!isDetailLoading && selectedUser ? (
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 4, bgcolor: 'background.default', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main', fontSize: '2rem' }}>
                  {selectedUser.name.charAt(0)}
                </Avatar>
                <IconButton onClick={() => setDrawerOpen(false)}><CloseIcon /></IconButton>
              </Box>
              <Typography variant="h5" fontWeight={700} gutterBottom>{selectedUser.name}</Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                <StatusBadge status={selectedUser.status} />
                <Typography variant="body2" color="text.secondary">User ID: {selectedUser.id}</Typography>
              </Box>
              
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                {selectedUser.status === 'Active' ? (
                  <Button 
                    variant="outlined" 
                    color="error" 
                    startIcon={<BlockIcon />}
                    onClick={() => setConfirmDialog({ open: true, type: 'suspend', id: selectedUser.id })}
                  >
                    Suspend User
                  </Button>
                ) : (
                  <Button 
                    variant="contained" 
                    color="success" 
                    startIcon={<CheckCircleOutlineIcon />}
                    onClick={() => setConfirmDialog({ open: true, type: 'reactivate', id: selectedUser.id })}
                  >
                    Reactivate User
                  </Button>
                )}
              </Box>
            </Box>

            <Box sx={{ p: 4, overflowY: 'auto', flexGrow: 1 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>Contact Information</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>{selectedUser.email}</Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>{selectedUser.phone}</Typography>

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>Account Stats</Typography>
              <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
                <Box>
                  <Typography variant="h6">{selectedUser.totalReviews}</Typography>
                  <Typography variant="caption" color="text.secondary">Total Reviews</Typography>
                </Box>
                <Box>
                  <Typography variant="h6">{selectedUser.registeredDate}</Typography>
                  <Typography variant="caption" color="text.secondary">Joined Date</Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />
              
              <Typography variant="subtitle2" color="primary.main" gutterBottom>Recent Reviews</Typography>
              {selectedUser.recentReviews?.length > 0 ? (
                <List disablePadding>
                  {selectedUser.recentReviews.map(review => (
                    <ListItem key={review.id} sx={{ bgcolor: 'background.default', mb: 2, borderRadius: 2, flexDirection: 'column', alignItems: 'flex-start', p: 2, border: '1px solid rgba(255,255,255,0.05)' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1 }}>
                        <Typography variant="body2" fontWeight={600}>{review.providerName}</Typography>
                        <Typography variant="caption" color="text.secondary">{review.date}</Typography>
                      </Box>
                      <Rating value={review.rating} readOnly size="small" sx={{ mb: 1 }} />
                      <Typography variant="body2" color="text.secondary">"{review.text}"</Typography>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">No reviews submitted yet.</Typography>
              )}
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>...</Box>
        )}
      </Drawer>

      <ConfirmDialog 
        open={confirmDialog.open}
        title={confirmDialog.type === 'suspend' ? 'Suspend User?' : 'Reactivate User?'}
        message={
          confirmDialog.type === 'suspend' 
            ? "This will prevent the user from logging in or submitting reviews. Their historic reviews will remain visible." 
            : "This will restore the user's access to the platform."
        }
        confirmText={confirmDialog.type === 'suspend' ? 'Suspend' : 'Reactivate'}
        confirmColor={confirmDialog.type === 'suspend' ? 'error' : 'success'}
        onConfirm={handleStatusChange}
        onCancel={() => setConfirmDialog({ open: false })}
      />
    </Box>
  );
};

export default UserManagementPage;
