import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      admin: null,
      isAuthenticated: false,

      login: (token, adminData) =>
        set({
          token: token,
          admin: adminData,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          token: null,
          admin: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'admin-auth-storage', // name of the item in the storage (must be unique)
    }
  )
);

export default useAuthStore;
