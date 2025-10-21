import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import React from 'react'
import VideoThumbnail from './VideoThumbnail'
import { useVideos } from '@/hooks/useVideos'

interface VideoCategoryProps {
  category: string
}

const VideoCategory = ({ category }: VideoCategoryProps) => {
  const { data, isLoading, isError } = useVideos(category)
  const videos = data?.pages.flatMap((page) => page.items)

  if (isLoading) {
    return <ActivityIndicator size='large' style={{ flex: 1 }} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{category}</Text>
        <Text style={styles.showMore} onPress={() => console.log('Show more')}>
          Show more
        </Text>
      </View>
      <FlatList
        data={videos || []}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        keyExtractor={(item) => item.id.videoId}
        renderItem={({ item }) => (
          <VideoThumbnail
            title={item.snippet.title}
            date={item.snippet.publishedAt}
            image={item.snippet.thumbnails.high.url}
          />
        )}
      />
      <View style={styles.divider} />
    </View>
  )
}

export default VideoCategory

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingVertical: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#2B2D42',
  },
  showMore: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#2B2D42',
    textDecorationLine: 'underline',
  },
  flatListContent: {
    gap: 16,
    marginLeft: 16,
  },
  divider: {
    height: 2,
    backgroundColor: '#2B2D42',
  },
})
