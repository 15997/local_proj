import { stagedProvidersQueue } from '../mocks/mockData';

// Mock delays to mimic actual network requests
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Keep a local mutable copy of mock data for this session to simulate state changes
let currentStagedData = [...stagedProvidersQueue];

export const getStagedEntries = async () => {
  await delay(600);
  return { data: currentStagedData };
};

export const approveStagedEntry = async (id) => {
  await delay(500);
  const index = currentStagedData.findIndex(item => item.id === id);
  if (index > -1) {
    currentStagedData[index] = { ...currentStagedData[index], status: 'Approved' };
    return { data: currentStagedData[index] };
  }
  return Promise.reject(new Error('Item not found'));
};

export const editAndApproveStagedEntry = async (id, updatedData) => {
  await delay(800);
  const index = currentStagedData.findIndex(item => item.id === id);
  if (index > -1) {
    currentStagedData[index] = { 
      ...currentStagedData[index], 
      ...updatedData,
      status: 'Approved' 
    };
    return { data: currentStagedData[index] };
  }
  return Promise.reject(new Error('Item not found'));
};

export const rejectStagedEntry = async (id, reason) => {
  await delay(500);
  const index = currentStagedData.findIndex(item => item.id === id);
  if (index > -1) {
    currentStagedData[index] = { ...currentStagedData[index], status: 'Rejected' };
    return { data: currentStagedData[index] };
  }
  return Promise.reject(new Error('Item not found'));
};
