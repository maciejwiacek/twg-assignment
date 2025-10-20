import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

interface VideoThumbnailProps {
  title: string
  date: string
  image: string
}

const VideoThumbnail = ({ title, date, image }: VideoThumbnailProps) => {
  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }

  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
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
