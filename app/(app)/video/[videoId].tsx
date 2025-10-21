import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useVideoDetails } from '@/hooks/useVideoDetails'
import PersonIcon from '@/assets/icons/person-icon.svg'
import ViewsIcon from '@/assets/icons/views-icon.svg'
import LikesIcon from '@/assets/icons/likes-icon.svg'
import YouTubeVideoPlayer from '@/components/YouTubeVideoPlayer'

const VideoDetails = () => {
  const { videoId } = useLocalSearchParams<{ videoId: string }>()
  const { data, isLoading, isError } = useVideoDetails(videoId)
  return (
    <View>
      <YouTubeVideoPlayer />
      <ScrollView style={styles.infoContainer}>
        <Text style={styles.title}>{data?.snippet.title}</Text>
        <View style={styles.authorContainer}>
          <PersonIcon />
          <Text style={styles.channelName}>{data?.snippet.channelTitle}</Text>
        </View>
        <Text style={styles.sectionHeader}>Description</Text>
        <Text style={styles.description}>{data?.snippet.description}</Text>
        <Text style={styles.sectionHeader}>Statistics</Text>
        <View style={styles.statsContainerWrapper}>
          <View style={styles.statsContainer}>
            <ViewsIcon width={20} height={20} fill='none' stroke='white' />
            <Text style={styles.statsValue}>
              {data?.statistics.viewCount} views
            </Text>
          </View>
          <View style={styles.statsContainer}>
            <LikesIcon width={20} height={20} />
            <Text style={styles.statsValue}>
              {data?.statistics.likeCount} likes
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default VideoDetails

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#2B2D42',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 16,
  },
  channelName: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    color: '#2B2D42',
  },
  infoContainer: {
    padding: 20,
  },
  statsContainerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsContainer: {
    backgroundColor: 'pink',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 32,
    borderRadius: 8,
    paddingHorizontal: 12,
    width: 150,
  },
  sectionHeader: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 10,
  },
  description: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#2B2D42',
  },
  statsValue: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 10,
    color: 'white',
  },
})
