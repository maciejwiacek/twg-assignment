import { Stack, useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import { ActivityIndicator } from 'react-native'
import { useAppStore } from '@/store/useAppStore'

const RootLayout = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null)
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })
  const isLoggedIn = useAppStore((state) => state.isLoggedIn)

  if (isLoggedIn === null || !fontsLoaded) {
    return <ActivityIndicator size='large' style={{ flex: 1 }} />
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLoggedIn === false}>
        <Stack.Screen name='(auth)' />
      </Stack.Protected>
      <Stack.Protected guard={isLoggedIn === true}>
        <Stack.Screen name='(app)' />
      </Stack.Protected>
    </Stack>
  )
}

export default RootLayout
