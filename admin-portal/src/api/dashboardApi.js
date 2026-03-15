import { 
  dashboardMetrics, 
  userGrowthData, 
  verificationTrendsData, 
  recentActivityLogs,
  pendingActionsQueue
} from '../mocks/mockData';

// Mock delays to mimic actual network requests
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getDashboardSummary = async (dateRange = '30d') => {
  await delay(800);
  
  return {
    data: {
      metrics: dashboardMetrics,
      charts: {
        userGrowth: userGrowthData,
        verificationTrends: verificationTrendsData,
      },
      activity: recentActivityLogs,
      queue: pendingActionsQueue
    }
  };
};
