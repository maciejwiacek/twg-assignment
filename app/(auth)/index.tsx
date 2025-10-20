import PrimaryButton from '@/components/PrimaryButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import React from 'react'
import { Linking, StyleSheet, Text, View } from 'react-native'
import Logo from '@/assets/logo.svg'
import Icon from '@/assets/app-icon.svg'

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
      <Logo />
      <Icon />
      <View style={styles.bottomContainer}>
        <Text style={styles.subheading}>
          Welcome to the best{'\n'}YouTube-based learning application.
        </Text>
        <PrimaryButton title='Sign In' onPress={handleSignIn} />
        <Text style={styles.privacyText}>
          By continuing you agree with{'\n'}
          <Text
            style={styles.privacyLink}
            onPress={() => Linking.openURL('https://yourwebsite.com/terms')}
          >
            Terms and Conditions
          </Text>{' '}
          and{' '}
          <Text
            style={styles.privacyLink}
            onPress={() => Linking.openURL('https://yourwebsite.com/terms')}
          >
            Privacy Policy
          </Text>
        </Text>
      </View>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#8D99AE',
    paddingHorizontal: 30,
    paddingVertical: 60,
  },
  bottomContainer: {
    alignItems: 'center',
    width: '100%',
    gap: 20,
  },
  subheading: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 22,
    lineHeight: 24,
    color: 'white',
  },
  privacyText: {
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    lineHeight: 16,
    color: 'white',
  },
  privacyLink: {
    color: '#2B2D42',
    textDecorationLine: 'underline',
  },
})
