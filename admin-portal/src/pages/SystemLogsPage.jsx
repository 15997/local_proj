import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  Typography, 
  TextField, 
  InputAdornment, 
  Select, 
  MenuItem, 
  Chip, 
  Drawer, 
  IconButton,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import toast from 'react-hot-toast';

import { getLogs, getLogDetails, getActionTypes } from '../api/logsApi';
import DataTable from '../components/common/DataTable';

const SystemLogsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [actionTypeFilter, setActionTypeFilter] = useState('All');
  const actionTypes = getActionTypes();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [severityFilter, actionTypeFilter, searchQuery]);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await getLogs({
        search: searchQuery,
        severity: severityFilter,
        actionType: actionTypeFilter
      });
      setData(response.data);
    } catch (error) {
      toast.error('Failed to load system logs');
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = async (row) => {
    setIsDetailLoading(true);
    setDrawerOpen(true);
    try {
      const response = await getLogDetails(row.id);
      setSelectedLog(response.data);
    } catch (error) {
      toast.error('Failed to load log details');
      setDrawerOpen(false);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'INFO': return <InfoOutlinedIcon fontSize="small" sx={{ color: '#6366f1' }} />;
      case 'WARN': return <WarningAmberIcon fontSize="small" sx={{ color: '#f59e0b' }} />;
      case 'ERROR': return <ErrorOutlineIcon fontSize="small" sx={{ color: '#ef4444' }} />;
      default: return null;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'INFO': return 'primary';
      case 'WARN': return 'warning';
      case 'ERROR': return 'error';
      default: return 'default';
    }
  };

  const columns = [
    { 
      id: 'timestamp', 
      label: 'Timestamp', 
      width: '180px',
      render: (row) => (
        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary', whiteSpace: 'nowrap' }}>
          {row.timestamp}
        </Typography>
      )
    },
    { 
      id: 'severity', 
      label: 'Level', 
      width: '100px',
      render: (row) => (
        <Chip 
          icon={getSeverityIcon(row.severity)} 
          label={row.severity} 
          size="small" 
          color={getSeverityColor(row.severity)}
          variant="outlined"
          sx={{ fontWeight: 700, fontSize: '0.7rem', fontFamily: 'monospace' }}
        />
      )
    },
    { 
      id: 'actor', 
      label: 'Actor', 
      width: '160px',
      render: (row) => (
        <Typography variant="body2" sx={{ fontWeight: row.actor === 'SYSTEM' ? 400 : 600, fontStyle: row.actor === 'SYSTEM' ? 'italic' : 'normal' }}>
          {row.actor}
        </Typography>
      )
    },
    { 
      id: 'actionType', 
      label: 'Action Type', 
      width: '200px',
      render: (row) => (
        <Chip 
          label={row.actionType.replace(/_/g, ' ')} 
          size="small" 
          variant="outlined"
          sx={{ fontSize: '0.7rem', fontFamily: 'monospace', borderColor: 'rgba(255,255,255,0.15)' }}
        />
      )
    },
    { 
      id: 'context', 
      label: 'Context',
      render: (row) => (
        <Typography variant="body2" color="text.secondary" sx={{ 
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          whiteSpace: 'nowrap', 
          maxWidth: 400 
        }}>
          {row.context}
        </Typography>
      )
    }
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Complete chronological audit trail of all system and administrator actions.
        </Typography>
      </Box>

      {/* Toolbar */}
      <Card sx={{ mb: 4 }}>
        <Box sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <TextField
            placeholder="Search logs..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: { xs: '100%', sm: 250 } }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>,
            }}
          />
          <Select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            size="small"
            sx={{ minWidth: 130 }}
          >
            {['All', 'INFO', 'WARN', 'ERROR'].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </Select>
          <Select
            value={actionTypeFilter}
            onChange={(e) => setActionTypeFilter(e.target.value)}
            size="small"
            sx={{ minWidth: 220 }}
          >
            {actionTypes.map(a => (
              <MenuItem key={a} value={a}>{a === 'All' ? 'All Action Types' : a.replace(/_/g, ' ')}</MenuItem>
            ))}
          </Select>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
            {data.length} log entries
          </Typography>
        </Box>
        
        <DataTable 
          columns={columns} 
          data={data} 
          loading={loading} 
          onRowClick={handleRowClick}
        />
      </Card>

      {/* Log Detail Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: '45vw', minWidth: 450, bgcolor: 'background.paper' } }}
      >
        {!isDetailLoading && selectedLog ? (
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 3, bgcolor: 'background.default', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6" fontWeight={700}>Log Entry Detail</Typography>
                <Typography variant="caption" color="text.secondary">{selectedLog.id}</Typography>
              </Box>
              <IconButton onClick={() => setDrawerOpen(false)}><CloseIcon /></IconButton>
            </Box>

            <Box sx={{ p: 3, overflowY: 'auto', flexGrow: 1 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 4 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">Timestamp</Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', mt: 0.5 }}>{selectedLog.timestamp}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Severity</Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Chip 
                      icon={getSeverityIcon(selectedLog.severity)} 
                      label={selectedLog.severity} 
                      size="small" 
                      color={getSeverityColor(selectedLog.severity)}
                      variant="outlined"
                      sx={{ fontWeight: 700, fontFamily: 'monospace' }}
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Actor</Typography>
                  <Typography variant="body2" fontWeight={600} sx={{ mt: 0.5 }}>{selectedLog.actor}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Action Type</Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', mt: 0.5 }}>{selectedLog.actionType}</Typography>
                </Box>
              </Box>

              <Typography variant="caption" color="text.secondary">Context</Typography>
              <Typography variant="body1" sx={{ mt: 0.5, mb: 4, lineHeight: 1.8 }}>{selectedLog.context}</Typography>

              <Divider sx={{ mb: 3 }} />

              <Typography variant="subtitle2" color="primary.main" gutterBottom>Raw JSON Payload</Typography>
              <Box sx={{ 
                mt: 1,
                p: 2.5, 
                bgcolor: '#0d1117', 
                borderRadius: 2, 
                border: '1px solid rgba(255,255,255,0.08)',
                overflow: 'auto',
                maxHeight: 300
              }}>
                <pre style={{ 
                  margin: 0, 
                  fontFamily: '"Fira Code", "Consolas", monospace', 
                  fontSize: '0.8rem', 
                  color: '#e6edf3',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all'
                }}>
                  {JSON.stringify(selectedLog.payload, null, 2)}
                </pre>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
            <Typography color="text.secondary">Loading...</Typography>
          </Box>
        )}
      </Drawer>
    </Box>
  );
};

export default SystemLogsPage;
