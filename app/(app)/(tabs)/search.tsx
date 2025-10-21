import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import YouTubeVideoPlayer from '@/components/YouTubeVideoPlayer'

const Search = () => {
  return (
    <SafeAreaView>
      <YouTubeVideoPlayer />
    </SafeAreaView>
  )
}

export default Search
