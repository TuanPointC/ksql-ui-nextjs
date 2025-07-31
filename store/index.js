import { create } from 'zustand'
import { persist } from 'zustand/middleware'


const initialEndpoints = process.env.KSQL_ENDPOINTS
  ? process.env.KSQL_ENDPOINTS.split(',')
  : [];

export const useEndpointStore = create((set) => ({
  endpoints: initialEndpoints,
  currentEndpoint: initialEndpoints[0] || '',
  setCurrentEndpoint: (endpoint) => set({ currentEndpoint: endpoint })
}));


export const useCommandStore = create(
  persist(
    (set) => ({
      commands: [],
      addCommands: (command) =>
        set((state) => ({ commands: [...state.commands, command] })),
      clearCommands: () => set({ commands: [] }),
      removeCommand: (command) =>
        set((state) => ({
          commands: state.commands.filter((c) => c !== command),
        })),
    }),
    {
      name: 'command-store',
      getStorage: () => localStorage,
    }
  )
)


export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          document.documentElement.setAttribute('data-theme', newTheme);
          return { theme: newTheme };
        }),
    }),
    {
      name: 'theme-storage', // Key for localStorage
    }
  )
);
