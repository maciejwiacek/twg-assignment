import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import LeftArrowIcon from '@/assets/icons/leftarrow-icon.svg'
import PersonIcon from '@/assets/icons/person-icon.svg'
import NotificationIcon from '@/assets/icons/notification-icon.svg'
import ClockIcon from '@/assets/icons/clock-icon.svg'

const Settings = () => {
  const [isRemindersEnabled, setIsRemindersEnabled] = useState(false)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <LeftArrowIcon width={32} height={32} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>
      <View style={styles.profileContainer}>
        <PersonIcon width={48} height={48} />
        <Text style={styles.name}>John Doe</Text>
      </View>
      <View style={styles.settingsContainer}>
        <View style={styles.settingsHeader}>
          <NotificationIcon width={24} height={24} />
          <Text style={styles.settingsTitle}>Learning reminders</Text>
        </View>

        <View style={styles.settingsContent}>
          <Text style={styles.clockText}>Repeat everyday at:</Text>
          <View style={styles.clockContainer}>
            <ClockIcon width={24} height={24} />
            <Text style={styles.clockText}>12:00</Text>
          </View>
          <Switch
            value={isRemindersEnabled}
            onValueChange={setIsRemindersEnabled}
            trackColor={{ false: '#8D99AE', true: '#2B2D42' }}
            thumbColor={isRemindersEnabled ? '#8D99AE' : '#8D99AE'}
          />
        </View>

        <Text style={styles.reminderText}>
          You will receive friendly reminder to remember to study
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 16,
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: '#2B2D42',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 40,
  },
  name: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: '#2B2D42',
  },
  settingsContainer: {
    gap: 12,
  },
  settingsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingsTitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#2B2D42',
  },
  clockText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#2B2D42',
  },
  reminderText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 10,
  },
})
