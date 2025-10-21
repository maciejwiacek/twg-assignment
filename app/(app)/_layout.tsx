import { QueryProvider } from '@/providers/QueryProvider'
import { Slot } from 'expo-router'

export default function Layout() {
  return (
    <QueryProvider>
      <Slot />
    </QueryProvider>
  )
}
