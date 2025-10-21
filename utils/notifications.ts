import * as Notifications from 'expo-notifications'

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
})

export const requestNotificationPermissions = async (): Promise<boolean> => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }

    return finalStatus === 'granted'
  } catch (error) {
    console.error('Error requesting notification permissions:', error)
    return false
  }
}

export const scheduleDailyNotification = async (
  hour: number,
  minute: number
): Promise<boolean> => {
  try {
    const hasPermission = await requestNotificationPermissions()
    if (!hasPermission) {
      console.log('Notification permission not granted')
      return false
    }

    await Notifications.cancelAllScheduledNotificationsAsync()

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '📚 Time to Learn!',
        body: 'Ready for your daily learning session?',
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: hour,
        minute: minute,
      },
    })

    console.log(
      `Daily notification scheduled for ${hour}:${minute
        .toString()
        .padStart(2, '0')}`
    )
    return true
  } catch (error) {
    console.error('Error scheduling notification:', error)
    return false
  }
}

export const cancelAllNotifications = async (): Promise<boolean> => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync()
    console.log('All notifications cancelled')
    return true
  } catch (error) {
    console.error('Error cancelling notifications:', error)
    return false
  }
}

export const getScheduledNotifications = async () => {
  try {
    return await Notifications.getAllScheduledNotificationsAsync()
  } catch (error) {
    console.error('Error getting scheduled notifications:', error)
    return []
  }
}
