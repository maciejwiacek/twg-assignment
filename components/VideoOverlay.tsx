import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'

interface VideoOverlayProps {
  children: React.ReactNode
  onPress: () => void
}

const VideoOverlay = ({ children, onPress }: VideoOverlayProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.videoContainer}>{children}</View>
    </TouchableWithoutFeedback>
  )
}

export default VideoOverlay

const styles = StyleSheet.create({
  videoContainer: {
    position: 'relative',
  },
})
