import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'brand' | 'clipper';
  walletAddress?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; user?: User }>;
  loginWithWallet: (walletAddress: string, role: 'brand' | 'clipper') => Promise<{ success: boolean; user?: User }>;
  setUser: (user: User | null) => void;
  logout: () => void;
}

// Test credentials
const TEST_USERS = [
  {
    id: '1',
    email: 'brand@test.com',
    password: 'brand123',
    username: 'TestBrand',
    role: 'brand' as const,
  },
  {
    id: '2',
    email: 'clipper@test.com',
    password: 'clipper123',
    username: 'TestClipper',
    role: 'clipper' as const,
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const user = TEST_USERS.find(
          (u) => u.email === email && u.password === password
        );
        
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          set({ user: userWithoutPassword, isAuthenticated: true });
          return { success: true, user: userWithoutPassword };
        }
        
        return { success: false };
      },
      loginWithWallet: async (walletAddress: string, role: 'brand' | 'clipper') => {
        // Simulate wallet authentication
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const user = {
          id: walletAddress.slice(0, 8),
          username: `${role === 'brand' ? 'Brand' : 'Clipper'}_${walletAddress.slice(0, 6)}`,
          email: `${walletAddress.slice(0, 6)}@wallet.eth`,
          role,
          walletAddress,
        };
        
        set({ user, isAuthenticated: true });
        return { success: true, user };
      },
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
