import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  InputAdornment, 
  Chip, 
  Drawer, 
  IconButton, 
  Button, 
  Divider,
  Alert,
  AlertTitle,
  LinearProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import toast from 'react-hot-toast';

import { getStagedEntries, approveStagedEntry, editAndApproveStagedEntry, rejectStagedEntry } from '../api/stagingApi';
import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';
import ConfirmDialog from '../components/common/ConfirmDialog';

const VerificationQueuePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const [confirmDialog, setConfirmDialog] = useState({ open: false, type: '', id: null });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await getStagedEntries();
      setData(response.data);
    } catch (error) {
      toast.error('Failed to load verification queue');
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  const handleActionClick = (type, id) => {
    setConfirmDialog({ open: true, type, id });
  };

  const handleConfirmAction = async () => {
    const { type, id } = confirmDialog;
    setIsProcessing(true);
    
    try {
      if (type === 'approve') {
        await approveStagedEntry(id);
        toast.success('Entry approved & merged to DB');
      } else if (type === 'reject') {
        await rejectStagedEntry(id, 'Admin manually rejected'); // In real app, prompt for reason
        toast.success('Entry rejected successfully');
      }
      
      setDrawerOpen(false);
      setConfirmDialog({ open: false, type: '', id: null });
      await loadData();
    } catch (error) {
      toast.error(`Action failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const getQualityColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  const columns = [
    { 
      id: 'name', 
      label: 'Provider Name', 
      width: '25%',
      render: (row) => (
        <Typography variant="body2" fontWeight={600}>{row.name}</Typography>
      )
    },
    { id: 'category', label: 'Service Type' },
    { 
      id: 'qualityScore', 
      label: 'Data Quality', 
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: 120 }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress 
              variant="determinate" 
              value={row.qualityScore} 
              color={getQualityColor(row.qualityScore)}
              sx={{ height: 6, borderRadius: 5, bgcolor: 'rgba(255,255,255,0.1)' }}
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="caption" color="text.secondary">{row.qualityScore}%</Typography>
          </Box>
        </Box>
      )
    },
    { 
      id: 'sourceUrl', 
      label: 'Source',
      render: (row) => (
        <IconButton size="small" component="a" href={row.sourceUrl} target="_blank" onClick={e => e.stopPropagation()}>
          <OpenInNewIcon fontSize="small" />
        </IconButton>
      )
    },
    { 
      id: 'hasDuplicates', 
      label: 'Match?', 
      render: (row) => row.hasDuplicates ? <WarningAmberIcon color="warning" /> : <Typography variant="body2" color="text.secondary">-</Typography>
    },
    { id: 'dateStaged', label: 'Date Staged' },
    { 
      id: 'status', 
      label: 'Status', 
      render: (row) => <StatusBadge status={row.status} /> 
    },
  ];

  // Filtering Logic
  const filteredData = data.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' ? true : item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Review external data retrieved by the AI to verify accuracy before adding to the directory.
        </Typography>
      </Box>

      <Card sx={{ mb: 4 }}>
        <Box sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <TextField
            placeholder="Search provider name or category..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: 300, '& .MuiOutlinedInput-root': { bgcolor: 'background.default' } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
              <Chip 
                key={status}
                label={status}
                onClick={() => setStatusFilter(status)}
                color={statusFilter === status ? 'primary' : 'default'}
                variant={statusFilter === status ? 'filled' : 'outlined'}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Box>
        </Box>
        
        <DataTable 
          columns={columns} 
          data={filteredData} 
          loading={loading} 
          onRowClick={handleRowClick}
        />
      </Card>

      {/* Side-by-Side Detail Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: '85vw', maxWidth: 1200, bgcolor: 'background.default' } }}
      >
        {selectedItem && (
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            
            {/* Drawer Header */}
            <Box sx={{ px: 3, py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'background.paper', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 2 }}>
                  Review External Data Entry
                  <StatusBadge status={selectedItem.status} />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Staging ID: {selectedItem.id} | Retrieved: {selectedItem.dateStaged}
                </Typography>
              </Box>
              <IconButton onClick={() => setDrawerOpen(false)}><CloseIcon /></IconButton>
            </Box>

            {/* Split Content Area */}
            <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
              
              {/* LEFT Panel: Parsed Data */}
              <Box sx={{ width: '40%', p: 3, overflowY: 'auto', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <Typography variant="subtitle1" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
                  Extracted Information
                </Typography>
                
                <Card sx={{ mb: 3, bgcolor: 'background.paper' }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Business Name</Typography>
                      <Typography variant="body1" fontWeight={600}>{selectedItem.name}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Category</Typography>
                      <Typography variant="body1">{selectedItem.category}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Phone Number</Typography>
                      <Typography variant="body1">{selectedItem.data.phone}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Address</Typography>
                      <Typography variant="body1">{selectedItem.data.address}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Confidence / Quality Score</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={selectedItem.qualityScore} 
                          color={getQualityColor(selectedItem.qualityScore)}
                          sx={{ height: 8, borderRadius: 5, width: '100%', bgcolor: 'rgba(255,255,255,0.1)' }}
                        />
                        <Typography variant="body2" fontWeight={600}>{selectedItem.qualityScore}%</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>

                {selectedItem.hasDuplicates && (
                  <Alert severity="warning" icon={<WarningAmberIcon />} sx={{ mb: 3 }}>
                    <AlertTitle>Potential Duplicate Detected</AlertTitle>
                    This data looks very similar to verified provider <strong>PRV-098 "Reliable Electrical"</strong>.
                    Approving this will merge the data into their existing profile.
                  </Alert>
                )}

                <Divider sx={{ my: 3 }} />

                {/* Actions Footer - Only show if PENDING */}
                {selectedItem.status === 'Pending' ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">Verification Actions</Typography>
                    <Button 
                      variant="contained" 
                      color="success" 
                      fullWidth 
                      startIcon={<CheckCircleOutlineIcon />}
                      onClick={() => handleActionClick('approve', selectedItem.id)}
                      disabled={isProcessing}
                    >
                      {selectedItem.hasDuplicates ? 'Approve & Merge' : 'Approve Application'}
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      fullWidth 
                      startIcon={<EditOutlinedIcon />}
                      disabled={isProcessing}
                      onClick={() => toast('Edit form would open here')}
                    >
                      Edit Data & Approve...
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="error" 
                      fullWidth 
                      startIcon={<CancelOutlinedIcon />}
                      onClick={() => handleActionClick('reject', selectedItem.id)}
                      disabled={isProcessing}
                    >
                      Reject Entry
                    </Button>
                  </Box>
                ) : (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    This entry has already been processed ({selectedItem.status}). No further actions available.
                  </Alert>
                )}
              </Box>

              {/* RIGHT Panel: Source iframe */}
              <Box sx={{ width: '60%', bgcolor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 1, bgcolor: '#e5e7eb', borderBottom: '1px solid #d1d5db', display: 'flex', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#4b5563', flexGrow: 1, px: 2, fontFamily: 'monospace' }}>
                    {selectedItem.sourceUrl}
                  </Typography>
                  <Button size="small" endIcon={<OpenInNewIcon />} href={selectedItem.sourceUrl} target="_blank">Open Externally</Button>
                </Box>
                <Box 
                  sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}
                >
                  {/* Mock iFrame behavior for visualization */}
                  <Typography variant="body1">
                    [ Source Website Cannot Embed in Local Preview: <b>{selectedItem.sourceUrl}</b> ]<br/><br/>
                    In a production environment, this right pane renders an embedded <code>&lt;iframe&gt;</code> rendering the live external page so the administrator can visually cross-verify the scraped source data displayed on the left pane independently.
                  </Typography>
                </Box>
              </Box>

            </Box>
          </Box>
        )}
      </Drawer>

      <ConfirmDialog 
        open={confirmDialog.open}
        title={confirmDialog.type === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
        message={
          confirmDialog.type === 'approve' 
            ? "Are you sure you want to approve this data? It will become publicly searchable on the platform immediately."
            : "Are you sure you want to reject this entry? This action cannot be undone and the data will be deleted."
        }
        confirmText={confirmDialog.type === 'approve' ? 'Approve' : 'Reject'}
        confirmColor={confirmDialog.type === 'approve' ? 'success' : 'error'}
        onConfirm={handleConfirmAction}
        onCancel={() => setConfirmDialog({ open: false, type: '', id: null })}
      />
    </Box>
  );
};

export default VerificationQueuePage;
