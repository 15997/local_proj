export const dashboardMetrics = {
  totalClients: 4256,
  clientsGrowth: '+12% this month',
  totalProviders: 843,
  providersGrowth: '+5% this month',
  pendingVerifications: 14,
  flaggedReviews: 3
};

// Data for User Growth Line Chart
export const userGrowthData = [
  { day: '01', clients: 4000, providers: 800 },
  { day: '05', clients: 4050, providers: 805 },
  { day: '10', clients: 4100, providers: 812 },
  { day: '15', clients: 4150, providers: 820 },
  { day: '20', clients: 4200, providers: 831 },
  { day: '25', clients: 4230, providers: 838 },
  { day: '30', clients: 4256, providers: 843 }
];

// Data for Verification Trends Bar Chart
export const verificationTrendsData = [
  { week: 'Week 1', approved: 20, rejected: 5, pending: 10 },
  { week: 'Week 2', approved: 25, rejected: 8, pending: 5 },
  { week: 'Week 3', approved: 30, rejected: 10, pending: 15 },
  { week: 'Week 4', approved: 15, rejected: 2, pending: 14 },
];

export const recentActivityLogs = [
  { id: 1, time: '10:45 AM', actor: 'System Auto', action: 'Scraped 4 new plumbing profiles', status: 'Staged' },
  { id: 2, time: '09:30 AM', actor: 'Super Admin', action: 'Approved provider: Addis Pipes', status: 'Success' },
  { id: 3, time: '08:15 AM', actor: 'Abebe Kebede', action: 'Submitted a 1-star review', status: 'Flagged' },
  { id: 4, time: 'Yesterday', actor: 'Super Admin', action: 'Rejected 3 spam profiles', status: 'Deleted' },
  { id: 5, time: 'Yesterday', actor: 'System Auto', action: 'Weekly DB backup generated', status: 'Success' },
];

export const pendingActionsQueue = [
  { id: 1, type: 'Verification', title: '14 Staged Profiles await review', urgency: 'High', link: '/verification-queue' },
  { id: 2, type: 'Review', title: '3 Reviews flagged for language', urgency: 'Medium', link: '/reviews' },
  { id: 3, type: 'System', title: 'Provider DB storage at 85%', urgency: 'Low', link: '/analytics' },
];

// Page 2: External Data Verification Mock Source
export const stagedProvidersQueue = [
  { 
    id: 'stg_101', 
    name: 'Reliable Electricals', 
    category: 'Electrician', 
    sourceUrl: 'https://yellowpages.et/reliable-elec', 
    qualityScore: 88, 
    status: 'Pending', 
    dateStaged: '2026-03-14',
    hasDuplicates: true,
    data: {
      phone: '+251911223344',
      address: 'Bole Medhane Alem, Addis Ababa',
    }
  },
  { 
    id: 'stg_102', 
    name: 'Clean House Services', 
    category: 'Cleaning', 
    sourceUrl: 'https://addislist.com/cleanhouse', 
    qualityScore: 95, 
    status: 'Pending', 
    dateStaged: '2026-03-14',
    hasDuplicates: false,
    data: {
      phone: '+251922334455',
      address: 'Piazza, Addis Ababa',
    }
  },
  { 
    id: 'stg_103', 
    name: 'Rapid Repair Plumbing', 
    category: 'Plumbing', 
    sourceUrl: 'https://google.com/maps/...', 
    qualityScore: 45, // low score warning
    status: 'Rejected', 
    dateStaged: '2026-03-12',
    hasDuplicates: false,
    data: {
      phone: 'Unverified',
      address: 'Unknown',
    }
  }
];

export const allProviders = [
  {
    id: 'prv_001',
    name: 'Abel Plumbing Experts',
    category: 'Plumbing',
    rating: 4.8,
    location: 'Bole, Addis Ababa',
    status: 'Verified',
    registeredDate: '2026-01-15'
  },
  {
    id: 'prv_002',
    name: 'Selamawit Tutoring',
    category: 'Tutoring',
    rating: 0,
    location: 'Arada, Addis Ababa',
    status: 'Pending',
    registeredDate: '2026-03-14'
  },
  {
    id: 'prv_003',
    name: 'Ethio Tech Repair',
    category: 'Electronics',
    rating: 4.2,
    location: 'Merkato, Addis Ababa',
    status: 'Verified',
    registeredDate: '2026-02-10'
  },
  {
    id: 'prv_004',
    name: 'Spammy Movers',
    category: 'Moving',
    rating: 1.0,
    location: 'Unknown',
    status: 'Suspended',
    registeredDate: '2025-11-05'
  }
];
