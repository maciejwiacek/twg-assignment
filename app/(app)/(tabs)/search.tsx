import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from '@/components/SearchBar'
import BigThumbnail from '@/components/BigThumbnail'

const Search = () => {
  const [searchText, setSearchText] = useState('')

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
          <SearchBar
            value={searchText}
            onChangeText={setSearchText}
            placeholder='Search videos'
          />
        </View>
        <Text style={styles.resultsText}>
          1157 results for: "<Text style={styles.searchText}>{searchText}</Text>
          "
        </Text>
        <FlatList
          data={[{ id: '1' }, { id: '2' }, { id: '3' }]}
          renderItem={({ item }) => <BigThumbnail />}
        />
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
