// Mock Data
const mockUsers = [
  { id: 'usr_001', name: 'Abebe Kebede', email: 'abebe.k@example.com', phone: '+251911223344', registeredDate: '2025-10-12', totalReviews: 14, status: 'Active' },
  { id: 'usr_002', name: 'Sara Tolosa', email: 'sara.t@example.com', phone: '+251988776655', registeredDate: '2026-01-05', totalReviews: 3, status: 'Active' },
  { id: 'usr_003', name: 'Dawit Mekonnen', email: 'dawit.m@example.com', phone: '+251900112233', registeredDate: '2026-02-28', totalReviews: 0, status: 'Active' },
  { id: 'usr_004', name: 'Spammy Bot', email: 'spam123@xyz.net', phone: 'Unknown', registeredDate: '2026-03-10', totalReviews: 45, status: 'Suspended' },
  { id: 'usr_005', name: 'Meron Hailu', email: 'meron.h@example.com', phone: '+251944556677', registeredDate: '2025-11-20', totalReviews: 8, status: 'Active' },
];

let currentUsers = [...mockUsers];
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getUsers = async (filters = {}) => {
  await delay(600);
  
  let result = [...currentUsers];
  
  if (filters.status && filters.status !== 'All') {
    result = result.filter(u => u.status === filters.status);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(u => 
      u.name.toLowerCase().includes(q) || 
      u.email.toLowerCase().includes(q) ||
      u.phone.includes(q)
    );
  }
  
  return { data: result };
};

export const getUserDetails = async (id) => {
  await delay(400);
  const user = currentUsers.find(u => u.id === id);
  if (!user) return Promise.reject(new Error('User not found'));
  
  // Add mock extended details (e.g. recent reviews)
  return {
    data: {
      ...user,
      recentReviews: [
        { id: 1, providerName: 'Abel Plumbing Experts', rating: 4, date: '2026-03-10', text: 'Great service, but a bit late.' },
        { id: 2, providerName: 'Ethio Tech Repair', rating: 5, date: '2026-02-15', text: 'Fixed my laptop perfectly.' }
      ]
    }
  };
};

export const updateUserStatus = async (id, status) => {
  await delay(500);
  const index = currentUsers.findIndex(u => u.id === id);
  if (index > -1) {
    currentUsers[index] = { ...currentUsers[index], status };
    return { data: currentUsers[index] };
  }
  return Promise.reject(new Error('User not found'));
};
