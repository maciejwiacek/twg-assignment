import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { formatDate } from '@/utils/formatDate'
import { router } from 'expo-router'

interface BigThumbnailProps {
  videoId: string
  channelName: string
  title: string
  date: string
  image: string
}

const BigThumbnail = ({
  videoId,
  channelName,
  title,
  date,
  image,
}: BigThumbnailProps) => {
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
      <Text numberOfLines={1} style={styles.channelName}>
        {channelName}
      </Text>
      <Text numberOfLines={2} style={styles.title}>
        {title}
      </Text>
      <Text style={styles.date}>{formatDate(date)}</Text>
    </TouchableOpacity>
  )
}

export default BigThumbnail

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 16,
  },
  channelName: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 12,
    color: '#2B2D42',
  },
  title: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    lineHeight: 16,
    color: '#2B2D42',
  },
  date: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#2B2D42',
    textAlign: 'right',
  },
})
