import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface Note {
  text: string
  timestamp: string
}

interface AppState {
  isLoggedIn: boolean
  notes: { [videoId: string]: Note }

  login: () => void
  logout: () => void
  addOrUpdateNote: (videoId: string, noteText: string) => void
  getNoteForVideo: (videoId: string) => Note | undefined
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      notes: {},

      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),

      addOrUpdateNote: (videoId, noteText) => {
        const newNote: Note = {
          text: noteText,
          timestamp: new Date().toISOString(),
        }
        set((state) => ({
          notes: {
            ...state.notes,
            [videoId]: newNote,
          },
        }))
      },

      getNoteForVideo: (videoId) => get().notes[videoId],
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        notes: state.notes,
      }),
    }
  )
)
