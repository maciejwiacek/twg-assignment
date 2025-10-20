import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

interface PrimaryButtonProps {
  title: string
  onPress: () => void
}

const PrimaryButton = ({ title, onPress }: PrimaryButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2B2D42',
    flex: 1,
    width: '100%',
    maxHeight: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
  },
})
