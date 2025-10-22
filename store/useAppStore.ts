import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface Note {
  id: string
  text: string
  timestamp: number
  videoId: string
}

interface AppState {
  isLoggedIn: boolean
  notes: Note[]

  login: () => void
  logout: () => void
  addNote: (videoId: string, noteText: string, timestamp: number) => void
  deleteNote: (noteId: string) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      notes: [],

      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),

      addNote: (videoId, noteText, timestamp) => {
        const newNote: Note = {
          id: new Date().getTime().toString(),
          text: noteText,
          timestamp: timestamp,
          videoId: videoId,
        }
        set((state) => ({
          notes: [...(Array.isArray(state.notes) ? state.notes : []), newNote],
        }))
      },

      deleteNote: (noteId) => {
        set((state) => ({
          notes: (Array.isArray(state.notes) ? state.notes : []).filter(
            (note) => note.id !== noteId
          ),
        }))
      },
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
