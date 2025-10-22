import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from '@/components/SearchBar'
import BigThumbnail from '@/components/BigThumbnail'
import { debounce } from '@/utils/debounce'
import { useVideos } from '@/hooks/useVideos'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const { initialSearchText = '' } = useLocalSearchParams<{
    initialSearchText?: string
  }>()
  const [searchText, setSearchText] = useState('')
  const [debouncedSearchText, setDebouncedSearchText] = useState('')
  const { data, isLoading, isError, fetchNextPage, hasNextPage, refetch } =
    useVideos(debouncedSearchText)
  const videos = data?.pages.flatMap((page) => page.items)
  const totalResults = data?.pages[0].pageInfo.totalResults || 0
  const resultsFetched = !isLoading && !isError && searchText.length > 0

  const debouncedSetSearch = useMemo(
    () => debounce(setDebouncedSearchText, 500),
    []
  )

  const handleSearch = (text: string) => {
    setSearchText(text)
    debouncedSetSearch(text)
  }

  useEffect(() => {
    setSearchText(initialSearchText as string)
    setDebouncedSearchText(initialSearchText as string)
    refetch()
  }, [initialSearchText])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
          <SearchBar
            value={searchText}
            onChangeText={handleSearch}
            focused={searchText === ''}
            placeholder='Search videos'
          />
        </View>

        {isError && searchText.length > 0 && !isLoading && (
          <Text style={styles.resultsText}>
            Error fetching results. Please try again.
          </Text>
        )}

        {isLoading && searchText.length > 0 && (
          <ActivityIndicator size='large' style={{ flex: 1, marginTop: 16 }} />
        )}

        {searchText.length === 0 && (
          <Text style={styles.resultsText}>
            Enter a search term to get started.
          </Text>
        )}

        {resultsFetched && (
          <>
            <Text style={styles.resultsText}>
              {data?.pages[0].pageInfo.totalResults || 0} results for: "
              <Text style={styles.searchText}>{searchText}</Text>"
            </Text>

            <FlatList
              showsVerticalScrollIndicator={false}
              data={videos || []}
              keyExtractor={(item) => item.id.videoId}
              renderItem={({ item }) => (
                <BigThumbnail
                  videoId={item.id.videoId}
                  channelName={item.snippet.channelTitle}
                  title={item.snippet.title}
                  date={item.snippet.publishedAt}
                  image={item.snippet.thumbnails.high.url}
                />
              )}
              onEndReached={() => {
                if (hasNextPage) {
                  fetchNextPage()
                }
              }}
              onEndReachedThreshold={0.5}
            />
          </>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    paddingBottom: 16,
  },
  resultsText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 10,
    color: '#2B2D42',
    paddingBottom: 16,
  },
  searchText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 10,
    color: '#2B2D42',
  },
})
