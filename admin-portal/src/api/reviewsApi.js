const mockReviews = [
  { id: 'rev_1', author: 'Abebe K.', provider: 'Ethio Tech Repair', rating: 5, date: '2026-03-12', text: 'Excellent service! Will hire again.', status: 'Published' },
  { id: 'rev_2', author: 'Sara T.', provider: 'Abel Plumbing', rating: 1, date: '2026-03-14', text: 'Horrible experience. The plumber cursed at me over the phone.', status: 'Flagged' },
  { id: 'rev_3', author: 'Dawit M.', provider: 'Spammy Movers', rating: 1, date: '2026-03-13', text: 'This looks like a scam listing.', status: 'Flagged' },
  { id: 'rev_4', author: 'Meron H.', provider: 'Clean House Services', rating: 4, date: '2026-03-10', text: 'Pretty good cleaning, arrived on time.', status: 'Published' },
  { id: 'rev_5', author: 'Anonymous', provider: 'Unknown', rating: 1, date: '2026-03-01', text: 'This is spam dfhjsdfhkjs', status: 'Hidden' },
];

let currentReviews = [...mockReviews];
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getReviews = async (filters = {}) => {
  await delay(600);
  
  let result = [...currentReviews];
  
  if (filters.status && filters.status !== 'All') {
    result = result.filter(r => r.status === filters.status);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(r => 
      r.author.toLowerCase().includes(q) || 
      r.provider.toLowerCase().includes(q) ||
      r.text.toLowerCase().includes(q)
    );
  }
  
  return { data: result };
};

export const moderateReview = async (id, status) => {
  await delay(500);
  const index = currentReviews.findIndex(r => r.id === id);
  if (index > -1) {
    currentReviews[index] = { ...currentReviews[index], status };
    return { data: currentReviews[index] };
  }
  return Promise.reject(new Error('Review not found'));
};

export const deleteReview = async (id) => {
  await delay(500);
  currentReviews = currentReviews.filter(r => r.id !== id);
  return { data: { success: true } };
};
