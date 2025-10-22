import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native'
import React from 'react'

interface PrimaryButtonProps {
  title: string
  onPress: () => void
  style?: StyleProp<ViewStyle>
}

const PrimaryButton = ({ title, onPress, style }: PrimaryButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2B2D42',
    width: '100%',
    height: 48,
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
