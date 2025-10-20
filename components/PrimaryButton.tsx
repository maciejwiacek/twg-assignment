import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const PrimaryButton = () => {
  return (
    <TouchableOpacity>
      <Text style={styles.text}>PrimaryButton</Text>
    </TouchableOpacity>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
  },
})
