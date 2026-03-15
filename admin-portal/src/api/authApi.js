import axiosInstance from './axiosInstance';

// Mock authentication API logic
export const loginAdmin = async (credentials) => {
  // Simulate network delay for realistic loading states
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock checking credentials
  const { email, password } = credentials;
  
  if (email === 'admin@addis.com' && password === 'Admin1234!') {
    return {
      data: {
        token: 'mock-jwt-token-ey1234567890',
        admin: {
          id: 'adm_001',
          name: 'Super Admin',
          email: 'admin@addis.com',
          role: 'Administrator'
        }
      }
    };
  } else {
    // Simulate failing 401 response
    return Promise.reject({
      response: {
        status: 401,
        data: {
          detail: 'Invalid email or password'
        }
      }
    });
  }
  
  // When real API is ready, simply uncomment this:
  // return axiosInstance.post('/api/v1/auth/login', credentials);
};
