import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const state = set => ({
  user: "",
  isLoggedIn: false,
  isErrorMessage: null,
  isAuthor: false,

  setIsAuthor: (isAuthor) => set({ isAuthor }),
  setIsErrorMessage: (isErrorMessage) => set({ isErrorMessage }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setUser: (user) => set({ user }),
});

export const useUser = create(persist(devtools(state), { name: "userState" }));