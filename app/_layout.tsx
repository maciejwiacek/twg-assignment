import { Stack } from 'expo-router'

const RootLayout = () => {
  const isSignedIn = false

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
