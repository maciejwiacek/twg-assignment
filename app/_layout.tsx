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

const RootLayout = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null)
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  const checkSignInStatus = async () => {
    try {
      const signedIn = await AsyncStorage.getItem('isSignedIn')
      console.log('signedIn:', signedIn)
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

  if (isSignedIn === null || !fontsLoaded) {
    return <ActivityIndicator size='large' style={{ flex: 1 }} />
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isSignedIn === false}>
        <Stack.Screen name='(auth)' />
      </Stack.Protected>
      <Stack.Protected guard={isSignedIn === true}>
        <Stack.Screen name='(app)' />
      </Stack.Protected>
    </Stack>
  )
}

export default RootLayout
