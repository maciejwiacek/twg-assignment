import { View, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Search from '@/assets/icons/search-icon.svg'
import BigThumbnail from './BigThumbnail'

interface SearchBarProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  focused?: boolean
  onPress?: () => void
  focusable?: boolean
}

const SearchBar = ({
  value,
  onChangeText,
  placeholder,
  focused = false,
  onPress,
  focusable = true,
}: SearchBarProps) => {
  const inputRef = useRef<TextInput>(null)

  useEffect(() => {
    if (inputRef.current && focused) {
      inputRef.current.focus()
    }
  }, [focused])

  return (
    <View style={styles.container}>
      <Search />
      <TextInput
        onPress={onPress}
        editable={focusable}
        ref={inputRef}
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
    flex: 1,
    maxWidth: '90%',
  },
})
