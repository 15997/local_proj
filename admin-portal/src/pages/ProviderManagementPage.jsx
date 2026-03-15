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
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';

import { 
  getProviders, 
  getProviderDetails, 
  createProvider, 
  updateProviderStatus, 
  deleteProvider,
  bulkActionProviders 
} from '../api/providersApi';

import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';
import ConfirmDialog from '../components/common/ConfirmDialog';
import ProviderCreateModal from '../components/common/ProviderCreateModal';

const categories = ['All Categories', 'Plumbing', 'Electrician', 'Cleaning', 'Tutoring', 'Moving', 'Electronics'];
const statuses = ['All Status', 'Verified', 'Pending', 'Rejected', 'Suspended'];

const ProviderManagementPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // Modals & Drawers
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  // Dialogs
  const [confirmDialog, setConfirmDialog] = useState({ open: false, type: '', id: null, title: '', message: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    loadData();
  }, [categoryFilter, statusFilter, searchQuery]);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await getProviders({
        search: searchQuery,
        category: categoryFilter === 'All Categories' ? 'All' : categoryFilter,
        status: statusFilter === 'All Status' ? 'All' : statusFilter
      });
      setData(response.data);
    } catch (error) {
      toast.error('Failed to load providers');
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = async (row) => {
    setIsDetailLoading(true);
    setDrawerOpen(true);
    try {
      const response = await getProviderDetails(row.id);
      setSelectedProvider(response.data);
    } catch (error) {
      toast.error('Failed to load provider details');
      setDrawerOpen(false);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleCreateSubmit = async (formData) => {
    setIsProcessing(true);
    try {
      await createProvider(formData);
      toast.success('Provider created successfully');
      setCreateModalOpen(false);
      await loadData();
    } catch (error) {
      toast.error('Failed to create provider');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedIds.length === 0) return;
    setIsProcessing(true);
    try {
      await bulkActionProviders(selectedIds, action);
      toast.success(`Action applied to ${selectedIds.length} providers`);
      setSelectedIds([]);
      await loadData();
    } catch (error) {
      toast.error('Bulk action failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSingleAction = async (action, id) => {
    setIsProcessing(true);
    try {
      if (action === 'delete') {
        await deleteProvider(id);
        toast.success('Provider deleted permanently');
        setDrawerOpen(false);
      } else {
        await updateProviderStatus(id, action);
        toast.success(`Provider status updated to ${action}`);
        if (drawerOpen && selectedProvider) {
          setSelectedProvider({ ...selectedProvider, status: action });
        }
      }
      setConfirmDialog({ open: false });
      await loadData();
    } catch (error) {
      toast.error('Action failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const columns = [
    { id: 'name', label: 'Provider Name', render: (row) => <Typography variant="body2" fontWeight={600}>{row.name}</Typography> },
    { id: 'category', label: 'Category' },
    { 
      id: 'rating', 
      label: 'Rating',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <StarIcon sx={{ color: '#f59e0b', fontSize: 16 }} />
          <Typography variant="body2">{row.rating > 0 ? row.rating : 'New'}</Typography>
        </Box>
      )
    },
    { id: 'location', label: 'Location' },
    { id: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    { id: 'registeredDate', label: 'Registered' },
    { 
      id: 'actions', 
      label: 'Actions', 
      align: 'right',
      render: (row) => (
        <Tooltip title="View Details">
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
          Manage all verified and pending service providers across the platform.
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => setCreateModalOpen(true)}
        >
          Add Provider
        </Button>
      </Box>

      {/* Toolbar & Filters */}
      <Card sx={{ mb: 4 }}>
        <Box sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <TextField
            placeholder="Search provider name or location..."
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
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            size="small"
            sx={{ minWidth: 150 }}
          >
            {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </Select>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            size="small"
            sx={{ minWidth: 150 }}
          >
            {statuses.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </Select>
          
          <Box sx={{ flexGrow: 1 }} />
          
          {selectedIds.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" color="primary.main" fontWeight={600}>
                {selectedIds.length} Selected
              </Typography>
              <Button size="small" variant="outlined" color="success" onClick={() => handleBulkAction('approve')} disabled={isProcessing}>Approve All</Button>
              <Button size="small" variant="outlined" color="warning" onClick={() => handleBulkAction('suspend')} disabled={isProcessing}>Suspend All</Button>
              <Button size="small" variant="outlined" color="error" onClick={() => handleBulkAction('delete')} disabled={isProcessing}>Delete All</Button>
            </Box>
          )}
        </Box>
        
        <DataTable 
          columns={columns} 
          data={data} 
          loading={loading} 
          onRowClick={handleRowClick}
          enableSelection
          selected={selectedIds}
          onSelectionChange={setSelectedIds}
        />
      </Card>

      {/* Slide-in Detail Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: '40vw', minWidth: 500, bgcolor: 'background.paper' } }}
      >
        {!isDetailLoading && selectedProvider ? (
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            
            {/* Header */}
            <Box sx={{ px: 4, py: 3, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    {selectedProvider.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <StatusBadge status={selectedProvider.status} />
                    <Typography variant="body2" color="text.secondary">• {selectedProvider.category}</Typography>
                    <Typography variant="body2" color="text.secondary">• ID: {selectedProvider.id}</Typography>
                  </Box>
                </Box>
                <IconButton onClick={() => setDrawerOpen(false)}><CloseIcon /></IconButton>
              </Box>

              {/* Action Buttons if Pending */}
              {selectedProvider.status === 'Pending' && (
                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <Button variant="contained" color="success" onClick={() => handleSingleAction('Verified', selectedProvider.id)}>Approve</Button>
                  <Button variant="outlined" color="error" onClick={() => handleSingleAction('Rejected', selectedProvider.id)}>Reject</Button>
                </Box>
              )}
            </Box>

            {/* Tabs */}
            <Tabs 
              value={tabIndex} 
              onChange={(e, v) => setTabIndex(v)} 
              sx={{ px: 2, borderBottom: '1px solid rgba(255,255,255,0.08)' }}
            >
              <Tab label="Profile Info" />
              <Tab label="Services" />
              <Tab label="Documents" />
            </Tabs>

            {/* Tab Content */}
            <Box sx={{ flexGrow: 1, p: 4, overflowY: 'auto' }}>
              
              {tabIndex === 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Bio / Description</Typography>
                    <Typography variant="body1">{selectedProvider.bio || 'No bio provided.'}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Contact Info</Typography>
                    <Typography variant="body1">{selectedProvider.email}</Typography>
                    <Typography variant="body1">{selectedProvider.phone}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Location</Typography>
                    <Typography variant="body1">{selectedProvider.location}</Typography>
                  </Box>
                  {/* Danger Zone */}
                  <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(239, 68, 68, 0.3)' }}>
                    <Typography variant="subtitle2" color="error.main" gutterBottom>Danger Zone</Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      {selectedProvider.status !== 'Suspended' ? (
                        <Button variant="outlined" color="warning" onClick={() => handleSingleAction('Suspended', selectedProvider.id)}>Suspend Account</Button>
                      ) : (
                        <Button variant="outlined" color="success" onClick={() => handleSingleAction('Verified', selectedProvider.id)}>Reactivate Account</Button>
                      )}
                      
                      <Button variant="contained" color="error" onClick={() => {
                        setConfirmDialog({
                          open: true,
                          type: 'delete',
                          id: selectedProvider.id,
                          title: 'Delete Provider Forever?',
                          message: 'This will wipe all their data, services, and reviews permanently. This action cannot be undone.'
                        });
                      }}>Delete Permanently</Button>
                    </Box>
                  </Box>
                </Box>
              )}

              {tabIndex === 1 && (
                <List disablePadding>
                  {selectedProvider.services?.map(s => (
                    <ListItem key={s.id} sx={{ bgcolor: 'background.default', mb: 1, borderRadius: 1, border: '1px solid rgba(255,255,255,0.05)' }}>
                      <ListItemText primary={s.name} secondary={s.price} primaryTypographyProps={{ fontWeight: 600 }} />
                    </ListItem>
                  ))}
                </List>
              )}

              {tabIndex === 2 && (
                <Box>
                  <Card sx={{ bgcolor: 'background.default', borderStyle: 'dashed', textAlign: 'center', p: 4 }}>
                    <Typography color="text.secondary">Trade License Document.pdf</Typography>
                    <Button variant="outlined" sx={{ mt: 2 }}>View Document</Button>
                  </Card>
                </Box>
              )}
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
            <Typography>Loading...</Typography>
          </Box>
        )}
      </Drawer>

      <ProviderCreateModal 
        open={createModalOpen} 
        onClose={() => setCreateModalOpen(false)} 
        onSubmit={handleCreateSubmit} 
        isSubmitting={isProcessing} 
      />

      <ConfirmDialog 
        open={confirmDialog.open}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText="Confirm Action"
        confirmColor="error"
        onConfirm={() => handleSingleAction(confirmDialog.type, confirmDialog.id)}
        onCancel={() => setConfirmDialog({ open: false })}
      />
    </Box>
  );
};

export default ProviderManagementPage;
