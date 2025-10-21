import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { formatDate } from '@/utils/formatDate'

interface VideoThumbnailProps {
  videoId: string
  title: string
  date: string
  image: string
}

const VideoThumbnail = ({
  videoId,
  title,
  date,
  image,
}: VideoThumbnailProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: '/(app)/video/[videoId]',
          params: { videoId },
        })
      }
    >
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.date}>{formatDate(date)}</Text>
    </TouchableOpacity>
  )
}

export default VideoThumbnail

const styles = StyleSheet.create({
  container: {
    maxWidth: 180,
    gap: 8,
  },
  image: {
    width: 180,
    aspectRatio: 16 / 9,
    borderRadius: 16,
  },
  title: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    lineHeight: 16,
    color: '#2B2D42',
  },
  date: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 10,
    color: '#2B2D42',
    textAlign: 'right',
  },
})
