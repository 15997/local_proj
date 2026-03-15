const mockLogs = [
  { id: 'log_001', timestamp: '2026-03-14 21:45:12', severity: 'INFO', actor: 'admin@addis.com', actionType: 'PROVIDER_APPROVED', context: 'Provider "Abel Plumbing Experts" was approved and verified.', payload: { providerId: 'prov_003', previousStatus: 'Pending', newStatus: 'Verified' } },
  { id: 'log_002', timestamp: '2026-03-14 21:30:05', severity: 'WARN', actor: 'admin@addis.com', actionType: 'USER_SUSPENDED', context: 'User "Spammy Bot" suspended for violating review policies.', payload: { userId: 'usr_004', reason: 'Spam behavior', reviewsHidden: 45 } },
  { id: 'log_003', timestamp: '2026-03-14 20:15:44', severity: 'INFO', actor: 'admin@addis.com', actionType: 'REVIEW_HIDDEN', context: 'Review rev_2 on "Abel Plumbing" was hidden from public view.', payload: { reviewId: 'rev_2', providerName: 'Abel Plumbing' } },
  { id: 'log_004', timestamp: '2026-03-14 19:00:11', severity: 'ERROR', actor: 'SYSTEM', actionType: 'RAG_PIPELINE_FAILURE', context: 'External data retrieval failed for query "electrician near bole". Timeout after 30s.', payload: { query: 'electrician near bole', errorCode: 'TIMEOUT', durationMs: 30000 } },
  { id: 'log_005', timestamp: '2026-03-14 18:45:30', severity: 'INFO', actor: 'admin@addis.com', actionType: 'STAGING_APPROVED', context: 'Staged entry "Ethio Clean House" approved and merged into main database.', payload: { stagingId: 'stg_005', mergedInto: 'prov_012' } },
  { id: 'log_006', timestamp: '2026-03-14 17:30:00', severity: 'INFO', actor: 'admin@addis.com', actionType: 'ADMIN_LOGIN', context: 'Administrator logged in successfully from 192.168.1.100.', payload: { ip: '192.168.1.100', userAgent: 'Mozilla/5.0' } },
  { id: 'log_007', timestamp: '2026-03-14 16:22:18', severity: 'WARN', actor: 'SYSTEM', actionType: 'DUPLICATE_DETECTED', context: 'Potential duplicate detected: "Abel Plumbing" matches staged entry with 92% similarity.', payload: { existingId: 'prov_003', stagedId: 'stg_008', similarity: 0.92 } },
  { id: 'log_008', timestamp: '2026-03-14 15:10:55', severity: 'INFO', actor: 'admin@addis.com', actionType: 'PROVIDER_CREATED', context: 'New provider "Sunrise Tutoring" manually created by administrator.', payload: { providerId: 'prov_015', category: 'Tutoring' } },
  { id: 'log_009', timestamp: '2026-03-14 14:05:33', severity: 'ERROR', actor: 'SYSTEM', actionType: 'DATABASE_CONNECTION_LOST', context: 'PostgreSQL connection pool exhausted. Reconnecting...', payload: { pool: 'main', maxConnections: 20, activeConnections: 20 } },
  { id: 'log_010', timestamp: '2026-03-14 12:00:00', severity: 'INFO', actor: 'SYSTEM', actionType: 'DAILY_BACKUP', context: 'Automated daily backup completed successfully. Size: 245MB.', payload: { backupSize: '245MB', duration: '12s', destination: 's3://backups/2026-03-14.sql.gz' } },
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getLogs = async (filters = {}) => {
  await delay(600);
  
  let result = [...mockLogs];
  
  if (filters.severity && filters.severity !== 'All') {
    result = result.filter(l => l.severity === filters.severity);
  }
  if (filters.actionType && filters.actionType !== 'All') {
    result = result.filter(l => l.actionType === filters.actionType);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(l => 
      l.actor.toLowerCase().includes(q) || 
      l.context.toLowerCase().includes(q) ||
      l.actionType.toLowerCase().includes(q)
    );
  }
  
  return { data: result };
};

export const getLogDetails = async (id) => {
  await delay(300);
  const log = mockLogs.find(l => l.id === id);
  if (!log) return Promise.reject(new Error('Log not found'));
  return { data: log };
};

// Extract unique action types for filter dropdown
export const getActionTypes = () => {
  return ['All', ...new Set(mockLogs.map(l => l.actionType))];
};
