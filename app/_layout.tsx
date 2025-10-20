import { Stack, useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const RootLayout = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null)

  const checkSignInStatus = async () => {
    try {
      const signedIn = await AsyncStorage.getItem('isSignedIn')
      setIsSignedIn(signedIn === 'true')
    } catch (error) {
      console.error('Error reading sign-in status:', error)
      setIsSignedIn(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      checkSignInStatus()
    }, [])
  )

  if (isSignedIn === null) {
    return null
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='(auth)' />
      <Stack.Screen name='(app)' />
    </Stack>
  )
}

export default RootLayout
