const mockAnalytics30d = {
  kpis: {
    totalSearches: 45280,
    averageConfidence: 88.5,
    topCategory: 'Plumbing',
    activeUsers: 3410
  },
  categoryDistribution: [
    { name: 'Plumbing', value: 35 },
    { name: 'Electrician', value: 25 },
    { name: 'Cleaning', value: 20 },
    { name: 'Tutoring', value: 10 },
    { name: 'Moving', value: 5 },
    { name: 'Other', value: 5 }
  ],
  trafficData: [
    { date: '01', searches: 1200, apiRequests: 15000 },
    { date: '05', searches: 1400, apiRequests: 16500 },
    { date: '10', searches: 1600, apiRequests: 18000 },
    { date: '15', searches: 1300, apiRequests: 16000 },
    { date: '20', searches: 1800, apiRequests: 21000 },
    { date: '25', searches: 2100, apiRequests: 25000 },
    { date: '30', searches: 2400, apiRequests: 28000 }
  ]
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getAnalyticsData = async (timeRange = '30d') => {
  await delay(800);
  
  // In a real app, filtering logic would alter output based on timeRange
  return { data: mockAnalytics30d };
};
