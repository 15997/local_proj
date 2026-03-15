import { allProviders } from '../mocks/mockData';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let currentProviders = [...allProviders];

export const getProviders = async (filters = {}) => {
  await delay(600);
  
  let result = [...currentProviders];
  
  // Apply mock filtering
  if (filters.status && filters.status !== 'All') {
    result = result.filter(p => p.status === filters.status);
  }
  if (filters.category && filters.category !== 'All') {
    result = result.filter(p => p.category === filters.category);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.location.toLowerCase().includes(q)
    );
  }
  
  return { data: result };
};

export const getProviderDetails = async (id) => {
  await delay(400);
  const provider = currentProviders.find(p => p.id === id);
  if (!provider) return Promise.reject(new Error('Provider not found'));
  
  // Add mock detailed data
  return {
    data: {
      ...provider,
      email: 'contact@provider.com',
      phone: '+251911000000',
      bio: 'Professional service provider with years of experience in Addis Ababa.',
      services: [
        { id: 1, name: 'Basic Service', price: '500 - 1000 ETB' },
        { id: 2, name: 'Premium Service', price: '2000 - 5000 ETB' }
      ]
    }
  };
};

export const createProvider = async (data) => {
  await delay(1000);
  const newProvider = {
    id: `prv_${Date.now()}`,
    name: data.name,
    category: data.category,
    rating: 0,
    location: data.location || 'Addis Ababa',
    status: 'Verified', // Admins creating directly are auto-verified usually
    registeredDate: new Date().toISOString().split('T')[0]
  };
  currentProviders = [newProvider, ...currentProviders];
  return { data: newProvider };
};

export const updateProviderStatus = async (id, status) => {
  await delay(500);
  const index = currentProviders.findIndex(p => p.id === id);
  if (index > -1) {
    currentProviders[index] = { ...currentProviders[index], status };
    return { data: currentProviders[index] };
  }
  return Promise.reject(new Error('Not found'));
};

export const deleteProvider = async (id) => {
  await delay(500);
  currentProviders = currentProviders.filter(p => p.id !== id);
  return { data: { success: true } };
};

export const bulkActionProviders = async (ids, action) => {
  await delay(1200);
  
  let newStatus = '';
  if (action === 'approve') newStatus = 'Verified';
  if (action === 'suspend') newStatus = 'Suspended';
  
  if (action === 'delete') {
    currentProviders = currentProviders.filter(p => !ids.includes(p.id));
  } else if (newStatus) {
    currentProviders = currentProviders.map(p => 
      ids.includes(p.id) ? { ...p, status: newStatus } : p
    );
  }
  
  return { data: { success: true, count: ids.length } };
};
