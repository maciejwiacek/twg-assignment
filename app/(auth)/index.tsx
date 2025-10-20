import PrimaryButton from '@/components/PrimaryButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import React from 'react'
import { Button, StyleSheet, View } from 'react-native'

const Index = () => {
  const handleSignIn = async () => {
    try {
      await AsyncStorage.setItem('isSignedIn', 'true')
      router.replace('/(app)')
    } catch (error) {
      console.log('Error signing in:', error)
    }
  }

  return (
    <View style={styles.container}>
      <Button title='Sign In' onPress={handleSignIn} />
      <PrimaryButton />
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8D99AE',
  },
})
