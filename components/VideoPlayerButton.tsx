import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

interface VideoPlayerButtonProps {
  icon: React.ReactNode
  size?: 'medium' | 'large'
  onPress: () => void
}

const VideoPlayerButton = ({
  icon,
  size = 'medium',
  onPress,
}: VideoPlayerButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, styles[size]]}
    >
      {icon}
    </TouchableOpacity>
  )
}

export default VideoPlayerButton

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medium: {
    width: 36,
    height: 36,
  },
  large: {
    width: 40,
    height: 40,
  },
})
