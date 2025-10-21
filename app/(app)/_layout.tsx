import { QueryProvider } from '@/providers/QueryProvider'
import { Slot, Stack } from 'expo-router'

export default function Layout() {
  return (
    <QueryProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='(tabs)' />
        <Stack.Screen
          name='video/[videoId]'
          options={{
            presentation: 'card',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        />
        <Stack.Screen
          name='user/settings'
          options={{
            presentation: 'card',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        />
      </Stack>
    </QueryProvider>
  )
}
