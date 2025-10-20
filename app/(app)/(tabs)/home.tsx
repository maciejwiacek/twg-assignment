import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from '@/components/SearchBar'
import { StyleSheet, View } from 'react-native'
import Gear from '@/assets/icons/settings-icon.svg'
import VideoThumbnail from '@/components/VideoThumbnail'

const Home = () => {
  const [searchText, setSearchText] = useState('')
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          placeholder='Search videos'
        />
        <Gear />
      </View>
      <VideoThumbnail />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
})
