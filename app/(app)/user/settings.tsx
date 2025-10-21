import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import LeftArrowIcon from '@/assets/icons/leftarrow-icon.svg'
import PersonIcon from '@/assets/icons/person-icon.svg'
import NotificationIcon from '@/assets/icons/notification-icon.svg'
import ClockIcon from '@/assets/icons/clock-icon.svg'
import {
  scheduleDailyNotification,
  cancelAllNotifications,
  getScheduledNotifications,
} from '@/utils/notifications'
import TimePickerModal from '@/components/TimePickerModal'

const Settings = () => {
  const [isRemindersEnabled, setIsRemindersEnabled] = useState(false)
  const [notificationHour, setNotificationHour] = useState(12)
  const [notificationMinute, setNotificationMinute] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)

  useEffect(() => {
    checkExistingNotifications()
  }, [])

  const checkExistingNotifications = async () => {
    try {
      const scheduledNotifications = await getScheduledNotifications()
      if (scheduledNotifications.length > 0) {
        setIsRemindersEnabled(true)
        // Extract time from the first notification if available
        const firstNotification = scheduledNotifications[0]
        if (firstNotification.trigger && 'hour' in firstNotification.trigger) {
          setNotificationHour(firstNotification.trigger.hour || 12)
          setNotificationMinute(firstNotification.trigger.minute || 0)
        }
      }
    } catch (error) {
      console.error('Error checking existing notifications:', error)
    }
  }

  const handleRemindersChange = async (value: boolean) => {
    setIsLoading(true)

    try {
      if (value) {
        // Enable notifications
        const success = await scheduleDailyNotification(
          notificationHour,
          notificationMinute
        )
        if (success) {
          setIsRemindersEnabled(true)
          Alert.alert(
            'Notifications Enabled',
            `Daily learning reminders will be sent at ${notificationHour}:${notificationMinute
              .toString()
              .padStart(2, '0')}`
          )
        } else {
          Alert.alert(
            'Permission Required',
            'Please enable notification permissions in your device settings to receive learning reminders.'
          )
        }
      } else {
        // Disable notifications
        const success = await cancelAllNotifications()
        if (success) {
          setIsRemindersEnabled(false)
          Alert.alert(
            'Notifications Disabled',
            'Learning reminders have been turned off.'
          )
        }
      }
    } catch (error) {
      console.error('Error managing notifications:', error)
      Alert.alert(
        'Error',
        'Failed to update notification settings. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const showTimePickerModal = () => {
    setShowTimePicker(true)
  }

  const handleTimeConfirm = async (hour: number, minute: number) => {
    setNotificationHour(hour)
    setNotificationMinute(minute)
    setShowTimePicker(false)

    // If notifications are currently enabled, reschedule with new time
    if (isRemindersEnabled) {
      const success = await scheduleDailyNotification(hour, minute)
      if (success) {
        Alert.alert(
          'Time Updated',
          `Learning reminders will now be sent at ${hour}:${minute
            .toString()
            .padStart(2, '0')}`
        )
      }
    }
  }

  const handleTimeCancel = () => {
    setShowTimePicker(false)
  }

  const formatTime = (hour: number, minute: number) => {
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`
  }

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
          <View style={styles.timeSection}>
            <Text style={styles.clockText}>Repeat everyday at:</Text>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={showTimePickerModal}
            >
              <ClockIcon width={24} height={24} />
              <Text style={styles.timeText}>
                {formatTime(notificationHour, notificationMinute)}
              </Text>
            </TouchableOpacity>

            <Switch
              value={isRemindersEnabled}
              onValueChange={handleRemindersChange}
              disabled={isLoading}
              trackColor={{ false: '#E5E5E5', true: '#4CAF50' }}
              thumbColor={isRemindersEnabled ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </View>

        <Text style={styles.reminderText}>
          {isRemindersEnabled
            ? `You will receive friendly reminders to study at ${formatTime(
                notificationHour,
                notificationMinute
              )}`
            : 'Enable notifications to receive daily learning reminders'}
        </Text>
      </View>

      <TimePickerModal
        visible={showTimePicker}
        initialHour={notificationHour}
        initialMinute={notificationMinute}
        onConfirm={handleTimeConfirm}
        onCancel={handleTimeCancel}
      />
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
  timeSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#2B2D42',
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
    color: '#2B2D42',
  },
})
