import { View, Text, Button } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useVideoDetails } from '@/hooks/useVideoDetails'
import Video from 'react-native-video'

const VideoDetails = () => {
  const { videoId } = useLocalSearchParams<{ videoId: string }>()
  const { data, isLoading, isError } = useVideoDetails(videoId)
  return (
    <View>
      <Video
        source={require('@/assets/video/broadchurch.mp4')}
        style={{ width: '100%', height: 280 }}
      />
      <Text>{data?.snippet.title}</Text>
      <Text>{data?.snippet.description}</Text>
      <Text>{data?.snippet.publishedAt}</Text>
      <Text>{data?.snippet.channelTitle}</Text>
      <Text>{data?.statistics.viewCount}</Text>
      <Text>{data?.statistics.likeCount}</Text>
      <Button title='Go back' onPress={() => router.back()} />
    </View>
  )
}

export default VideoDetails
