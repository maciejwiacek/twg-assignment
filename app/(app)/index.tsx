import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'

const Index = () => {
  const handleLogOut = async () => {
    try {
      await AsyncStorage.setItem('isSignedIn', 'false')
      router.replace('/(auth)')
    } catch (error) {
      console.log('Error logging out:', error)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Authenticated Flow</Text>
      <Button title='Log Out (Dev)' onPress={handleLogOut} />
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
})
