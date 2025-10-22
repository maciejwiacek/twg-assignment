import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'

interface Tab {
  name: string
  component: React.ReactNode
}

interface TabComponentProps {
  tabs: Tab[]
  initialTabIndex?: number
}

const TabComponent = ({ tabs, initialTabIndex = 0 }: TabComponentProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState(initialTabIndex)

  const handleTabPress = (index: number) => {
    setActiveTabIndex(index)
  }

  return (
    <View style={styles.container}>
      {/* Tab Headers */}
      <View style={styles.tabHeaders}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tabHeader}
            onPress={() => handleTabPress(index)}
          >
            <Text
              style={[
                styles.tabTitle,
                activeTabIndex === index && styles.activeTabTitle,
              ]}
            >
              {tab.name}
            </Text>
            <View
              style={[
                styles.underline,
                activeTabIndex === index
                  ? styles.activeUnderline
                  : styles.inactiveUnderline,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <View style={styles.tabContent}>{tabs[activeTabIndex]?.component}</View>
    </View>
  )
}

export default TabComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabHeaders: {
    flexDirection: 'row',
  },
  tabHeader: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 16,
  },
  tabTitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  activeTabTitle: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#2B2D42',
  },
  underline: {
    height: 2,
    width: '100%',
    borderRadius: 1,
  },
  activeUnderline: {
    backgroundColor: '#2B2D42',
  },
  inactiveUnderline: {
    backgroundColor: '#E5E5E5',
  },
  tabContent: {
    flex: 1,
  },
})
