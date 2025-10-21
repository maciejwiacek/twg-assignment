import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { formatDate } from '@/utils/formatDate'
import { router } from 'expo-router'

const BigThumbnail = () => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push('/video/X8ipUgXH6jw')}
    >
      <Image
        source={{ uri: 'https://i.ytimg.com/vi/X8ipUgXH6jw/hqdefault.jpg' }}
        style={styles.image}
      />
      <Text numberOfLines={1} style={styles.channelName}>
        Fireship
      </Text>
      <Text numberOfLines={2} style={styles.title}>
        React Native vs Flutter - I built the same chat app with both
      </Text>
      <Text style={styles.date}>{formatDate('2021-10-04T14:58:18Z')}</Text>
    </TouchableOpacity>
  )
}

export default BigThumbnail

const styles = StyleSheet.create({
  container: {
    gap: 8,
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
