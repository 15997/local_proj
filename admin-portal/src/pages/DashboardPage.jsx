import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Select,
  MenuItem,
  Card,
  CardContent,
  Avatar
} from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PeopleIcon from '@mui/icons-material/PeopleAlt';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import MetricCard from '../components/common/MetricCard';
import UserGrowthChart from '../components/charts/UserGrowthChart';
import MonthlyActiveUsersChart from '../components/charts/MonthlyActiveUsersChart';
import VerificationTrendsChart from '../components/charts/VerificationTrendsChart';
import ServiceDistributionDonut from '../components/charts/ServiceDistributionDonut';
import EngagementHeatmap from '../components/charts/EngagementHeatmap';
import GlobalReachMap from '../components/charts/GlobalReachMap';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const DashboardPage = () => {
  const [dateRange, setDateRange] = useState('30d');

  const kpiData = {
    '30d': {
      clients: "14,285", clientsChange: "+12.4%",
      verified: "3,120", verifiedChange: "+8.1%",
      pending: "142", pendingChange: "-2.4%",
      flagged: "28", flaggedChange: "+15%"
    },
    '7d': {
      clients: "3,450", clientsChange: "+4.2%",
      verified: "840", verifiedChange: "+2.1%",
      pending: "45", pendingChange: "-1.1%",
      flagged: "6", flaggedChange: "-5%"
    }
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Metric,Value\nTotal Clients,14285\nVerified Providers,3120\nPending,142\nFlagged Reviews,28";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `dashboard_export_${dateRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const currentKPIs = kpiData[dateRange];

  return (
    <Box sx={{ width: '100%', boxSizing: 'border-box' }}>
      
      {/* Top Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3, gap: 2 }}>
        <Select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          size="small"
          sx={{ 
            minWidth: 160, 
            bgcolor: '#141b2d', 
            color: '#f9fafb',
            borderRadius: 2,
            border: '1px solid rgba(255,255,255,0.05)',
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '& .MuiSelect-icon': { color: '#9ca3af' }
          }}
        >
          <MenuItem value="30d">Last 30 Days</MenuItem>
          <MenuItem value="7d">Last 7 Days</MenuItem>
        </Select>
        <Button 
          variant="outlined" 
          startIcon={<FileDownloadOutlinedIcon />}
          onClick={handleExportCSV}
          sx={{ 
            bgcolor: '#141b2d', 
            color: '#f9fafb',
            border: '1px solid rgba(255,255,255,0.05)',
            textTransform: 'none',
            borderRadius: 2,
            px: 2,
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
            }
          }}
        >
          Export CSV
        </Button>
      </Box>

      {/* Row 1: KPI Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, mb: 3 }}>
        <MetricCard 
          title="TOTAL CLIENTS" 
          value={currentKPIs.clients} 
          change={currentKPIs.clientsChange}
          icon={<PeopleIcon />}
          color="#6366f1"
        />
        <MetricCard 
          title="VERIFIED PROVIDERS" 
          value={currentKPIs.verified} 
          change={currentKPIs.verifiedChange}
          icon={<VerifiedUserIcon />}
          color="#8b5cf6"
        />
        <MetricCard 
          title="PENDING" 
          value={currentKPIs.pending} 
          change={currentKPIs.pendingChange}
          icon={<AssignmentIcon />}
          color="#10b981"
          isNegative={true}
        />
        <MetricCard 
          title="FLAGGED REVIEWS" 
          value={currentKPIs.flagged} 
          change={currentKPIs.flaggedChange}
          icon={<WarningAmberIcon />}
          color="#ef4444"
          isNegative={true}
        />
      </Box>

      {/* Row 2: Charts */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
        <Card sx={{ bgcolor: '#141b2d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
          <CardContent sx={{ p: 3, pb: '16px !important', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Box>
                <Typography variant="h6" sx={{ color: '#f9fafb', fontWeight: 600, fontSize: '1.1rem' }}>Platform Growth</Typography>
                <Typography variant="caption" sx={{ color: '#6b7280' }}>Quarterly aggregate of new user registrations</Typography>
              </Box>
              <Box sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: '#9ca3af', px: 1.5, py: 0.5, borderRadius: 1, fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                Last 6 Months
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, mt: 2 }}>
              <UserGrowthChart />
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ bgcolor: '#141b2d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
          <CardContent sx={{ p: 3, pb: '16px !important', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Box>
                <Typography variant="h6" sx={{ color: '#f9fafb', fontWeight: 600, fontSize: '1.1rem' }}>Monthly Active Users (MAU)</Typography>
                <Typography variant="caption" sx={{ color: '#6b7280' }}>Live tracker of platform engagement levels</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#c084fc' }} />
                <Typography variant="caption" sx={{ color: '#9ca3af' }}>Current Year</Typography>
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, mt: 2 }}>
              <MonthlyActiveUsersChart />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Row 3 */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
        <Card sx={{ bgcolor: '#141b2d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ color: '#f9fafb', fontWeight: 600, fontSize: '1.1rem', mb: 3 }}>Verification Trends</Typography>
            <VerificationTrendsChart />
          </CardContent>
        </Card>
        <Card sx={{ bgcolor: '#141b2d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ color: '#f9fafb', fontWeight: 600, fontSize: '1.1rem', mb: 2 }}>Service Distribution</Typography>
            <ServiceDistributionDonut />
          </CardContent>
        </Card>
      </Box>

      {/* Row 4 */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
        <Card sx={{ bgcolor: '#141b2d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ color: '#f9fafb', fontWeight: 600, fontSize: '1.1rem' }}>Engagement Heatmap</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.65rem', letterSpacing: '1px' }}>DENSITY:</Typography>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '2px', bgcolor: 'rgba(99, 102, 241, 0.2)' }} />
                  <Box sx={{ width: 8, height: 8, borderRadius: '2px', bgcolor: 'rgba(99, 102, 241, 0.5)' }} />
                  <Box sx={{ width: 8, height: 8, borderRadius: '2px', bgcolor: 'rgba(99, 102, 241, 0.8)' }} />
                  <Box sx={{ width: 8, height: 8, borderRadius: '2px', bgcolor: '#6366f1' }} />
                </Box>
              </Box>
            </Box>
            <EngagementHeatmap />
          </CardContent>
        </Card>
        <Card sx={{ bgcolor: '#141b2d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ color: '#f9fafb', fontWeight: 600, fontSize: '1.1rem' }}>Global Reach</Typography>
            <Typography variant="caption" sx={{ color: '#6b7280' }}>User distribution by region</Typography>
            <Box sx={{ mt: 2, height: 180 }}>
              <GlobalReachMap />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Row 5: Lists */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
          <Card sx={{ bgcolor: '#141b2d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#f9fafb', fontWeight: 600, fontSize: '1.1rem' }}>Recent Activity</Typography>
                <Typography variant="caption" sx={{ color: '#6366f1', fontWeight: 600, cursor: 'pointer' }}>View All</Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Avatar sx={{ bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', width: 32, height: 32 }}>
                    <CheckCircleOutlineIcon sx={{ fontSize: 18 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#f9fafb' }}>
                      <span style={{ fontWeight: 600 }}>Morgan Freeman</span> completed verification
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.7rem' }}>2 MINUTES AGO</Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Avatar sx={{ bgcolor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', width: 32, height: 32 }}>
                    <SettingsIcon sx={{ fontSize: 18 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#f9fafb' }}>
                      <span style={{ fontWeight: 600 }}>System</span> updated terms of service
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.7rem' }}>45 MINUTES AGO</Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Avatar sx={{ bgcolor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', width: 32, height: 32 }}>
                    <ErrorOutlineIcon sx={{ fontSize: 18 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#f9fafb' }}>
                      <span style={{ fontWeight: 600 }}>Security</span> detected failed login attempt
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.7rem' }}>1 HOUR AGO</Typography>
                  </Box>
                </Box>
              </Box>

            </CardContent>
          </Card>

          <Card sx={{ bgcolor: '#141b2d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#f9fafb', fontWeight: 600, fontSize: '1.1rem' }}>Action Required Queue</Typography>
                <Box sx={{ px: 1, py: 0.25, borderRadius: 1, bgcolor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.5px' }}>
                  4 PRIORITY
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: 2, bgcolor: '#1a2235', borderLeft: '3px solid #ef4444' }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#f9fafb', fontWeight: 600 }}>Review ID: #88192</Typography>
                    <Typography variant="caption" sx={{ color: '#6b7280' }}>Flagged for suspicious content</Typography>
                  </Box>
                  <Box sx={{ width: 28, height: 28, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowForwardIosIcon sx={{ fontSize: 12, color: '#9ca3af' }} />
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: 2, bgcolor: '#1a2235', borderLeft: '3px solid #6366f1' }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#f9fafb', fontWeight: 600 }}>KYC Verification</Typography>
                    <Typography variant="caption" sx={{ color: '#6b7280' }}>User: Sarah Jenkins - Photo mismatch</Typography>
                  </Box>
                  <Box sx={{ width: 28, height: 28, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowForwardIosIcon sx={{ fontSize: 12, color: '#9ca3af' }} />
                  </Box>
                </Box>

              </Box>
            </CardContent>
          </Card>
      </Box>
    </Box>
  );
};

export default DashboardPage;
