import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import Search from '@/assets/icons/search-icon.svg'

interface SearchBarProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
}

const SearchBar = ({ value, onChangeText, placeholder }: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <Search />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={'#2b2d423c'}
      />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    borderWidth: 2,
    borderColor: '#2B2D42',
    borderRadius: 16,
    height: 44,
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 8,
  },
  input: {
    color: '#2B2D42',
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
  },
})
