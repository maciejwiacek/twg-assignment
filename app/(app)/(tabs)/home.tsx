import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from '@/components/SearchBar'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Gear from '@/assets/icons/settings-icon.svg'
import VideoCategory from '@/components/VideoCategory'
import { router } from 'expo-router'

const Home = () => {
  const [searchText, setSearchText] = useState('')

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <SearchBar
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          placeholder='Search videos'
        />
        <TouchableOpacity onPress={() => router.push('/user/settings')}>
          <Gear />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VideoCategory category='React Native' />
        <VideoCategory category='React' />
        <VideoCategory category='TypeScript' />
        <VideoCategory category='JavaScript' />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
})
