import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Select, 
  MenuItem, 
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress
} from '@mui/material';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { getDashboardSummary } from '../api/dashboardApi';
import MetricCard from '../components/common/MetricCard';
import UserGrowthChart from '../components/charts/UserGrowthChart';
import VerificationTrendsChart from '../components/charts/VerificationTrendsChart';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30d');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getDashboardSummary(dateRange);
        setData(response.data);
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [dateRange]);

  const handleExport = () => {
    // Mock CSV export logic
    const csvContent = "data:text/csv;charset=utf-8,Metric,Value\nTotal Clients," + 
      data?.metrics.totalClients + "\nTotal Providers," + data?.metrics.totalProviders;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `dashboard_report_${dateRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Report exported successfully');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success': return 'success';
      case 'Staged': return 'primary';
      case 'Flagged': return 'error';
      case 'Deleted': return 'default';
      default: return 'default';
    }
  };

  const getUrgencyIcon = (urgency) => {
    return <ErrorOutlineIcon color={urgency === 'High' ? 'error' : urgency === 'Medium' ? 'warning' : 'info'} />;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data) return null;

  return (
    <Box sx={{ pb: 4 }}>
      {/* Top Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Overview of platform activity and key performance indicators.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            size="small"
            sx={{ minWidth: 150, bgcolor: 'background.paper' }}
          >
            <MenuItem value="7d">Last 7 Days</MenuItem>
            <MenuItem value="30d">Last 30 Days</MenuItem>
            <MenuItem value="custom">Custom Range</MenuItem>
          </Select>
          <Button 
            variant="outlined" 
            startIcon={<FileDownloadOutlinedIcon />}
            onClick={handleExport}
            sx={{ bgcolor: 'background.paper' }}
          >
            Export CSV
          </Button>
        </Box>
      </Box>

      {/* Row 1: KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard 
            title="Total Clients" 
            value={data.metrics.totalClients.toLocaleString()} 
            change={data.metrics.clientsGrowth}
            icon={<PeopleOutlineIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard 
            title="Verified Providers" 
            value={data.metrics.totalProviders.toLocaleString()} 
            change={data.metrics.providersGrowth}
            icon={<VerifiedUserOutlinedIcon />}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard 
            title="Pending Verifications" 
            value={data.metrics.pendingVerifications} 
            change="urgent action required"
            icon={<PendingActionsOutlinedIcon />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard 
            title="Flagged Reviews" 
            value={data.metrics.flaggedReviews} 
            change="needs moderation"
            icon={<FlagOutlinedIcon />}
            color="error"
          />
        </Grid>
      </Grid>

      {/* Row 2: Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Platform Growth</Typography>
              <UserGrowthChart data={data.charts.userGrowth} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Verification Trends</Typography>
              <VerificationTrendsChart data={data.charts.verificationTrends} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Row 3: Tables & Lists */}
      <Grid container spacing={3}>
        {/* Recent Activity */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ p: 3, pb: 1 }}>
                <Typography variant="h6">Recent Activity</Typography>
              </Box>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Actor</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.activity.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>{row.time}</TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{row.actor}</TableCell>
                      <TableCell>{row.action}</TableCell>
                      <TableCell>
                        <Chip 
                          label={row.status} 
                          size="small" 
                          color={getStatusColor(row.status)}
                          variant={row.status === 'Deleted' ? 'outlined' : 'filled'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Actions Tracker */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Action Required Queue</Typography>
              <List sx={{ pt: 1 }}>
                {data.queue.map((item) => (
                  <ListItem 
                    key={item.id} 
                    disablePadding 
                    sx={{ mb: 2 }}
                    secondaryAction={
                      <IconButton edge="end" size="small" onClick={() => navigate(item.link)}>
                        <ArrowForwardIosIcon fontSize="small" />
                      </IconButton>
                    }
                  >
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        width: '100%',
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: 'background.default',
                        border: '1px solid rgba(255,255,255,0.05)',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {getUrgencyIcon(item.urgency)}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.title} 
                        secondary={`${item.type} Priority: ${item.urgency}`}
                        primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                        secondaryTypographyProps={{ variant: 'caption' }}
                      />
                    </Box>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
