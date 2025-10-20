import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import VideoThumbnail from './VideoThumbnail'

const VIDEOS = [
  {
    title: 'JavaScript Full Course for free 🌐 Dupa dupa dupa',
    date: '2019-12-09T19:15:01Z',
    image: 'https://i.ytimg.com/vi/lfmg-EJ8gm4/default.jpg',
  },
  {
    title: 'JavaScript Full Course for free 🌐 Dupa dupa dupa',
    date: '2019-12-09T19:15:01Z',
    image: 'https://i.ytimg.com/vi/lfmg-EJ8gm4/default.jpg',
  },
  {
    title: 'JavaScript Full Course for free 🌐 Dupa dupa dupa',
    date: '2019-12-09T19:15:01Z',
    image: 'https://i.ytimg.com/vi/lfmg-EJ8gm4/default.jpg',
  },

  {
    title: 'JavaScript Full Course for free 🌐 Dupa dupa dupa',
    date: '2019-12-09T19:15:01Z',
    image: 'https://i.ytimg.com/vi/lfmg-EJ8gm4/default.jpg',
  },
]

const VideoCategory = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>React Native</Text>
        <Text style={styles.showMore} onPress={() => console.log('Show more')}>
          Show more
        </Text>
      </View>
      <FlatList
        data={VIDEOS}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <VideoThumbnail
            title={item.title}
            date={item.date}
            image={item.image}
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
