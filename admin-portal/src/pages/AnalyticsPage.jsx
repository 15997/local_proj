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
  CircularProgress
} from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import toast from 'react-hot-toast';

import { getAnalyticsData } from '../api/analyticsApi';
import MetricCard from '../components/common/MetricCard';
import CategoryPieChart from '../components/charts/CategoryPieChart';
import TrafficLineChart from '../components/charts/TrafficLineChart';

const AnalyticsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30d');

  useEffect(() => {
    loadData();
  }, [dateRange]);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await getAnalyticsData(dateRange);
      setData(response.data);
    } catch (error) {
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (!data) return;
    const csvContent = "data:text/csv;charset=utf-8,Category,Percentage\n" + 
      data.categoryDistribution.map(c => `${c.name},${c.value}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `analytics_report_${dateRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Analytic Report exported successfully');
  };

  if (loading || !data) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Deep data insights covering AI inference confidence, traffic, and category density.
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
            <MenuItem value="ytd">Year to Date</MenuItem>
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

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard 
            title="Total Platform Searches" 
            value={data.kpis.totalSearches.toLocaleString()} 
            change="+12% from last period" // Mock static change indicator
            icon={<SearchIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard 
            title="Avg. AI Confidence" 
            value={`${data.kpis.averageConfidence}%`} 
            change="Stable"
            icon={<ThumbUpAltOutlinedIcon />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard 
            title="Top Searched Category" 
            value={data.kpis.topCategory} 
            change="Consistently #1"
            icon={<CategoryOutlinedIcon />}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard 
            title="Active End-Users" 
            value={data.kpis.activeUsers.toLocaleString()} 
            change="+3% growth"
            icon={<PersonOutlineOutlinedIcon />}
            color="info"
          />
        </Grid>
      </Grid>

      {/* Analytics Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Platform Traffic & API Utilization (Dual Axis)</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Comparing internal RAG search query volume against total raw API networking bounds.
              </Typography>
              <TrafficLineChart data={data.trafficData} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Category Density</Typography>
              <Typography variant="body2" color="text.secondary">
                Distribution of Registered Providers by Business Classification.
              </Typography>
              <CategoryPieChart data={data.categoryDistribution} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsPage;
