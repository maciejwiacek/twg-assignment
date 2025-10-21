import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native'

interface TimePickerModalProps {
  visible: boolean
  initialHour: number
  initialMinute: number
  onConfirm: (hour: number, minute: number) => void
  onCancel: () => void
}

const TimePickerModal: React.FC<TimePickerModalProps> = ({
  visible,
  initialHour,
  initialMinute,
  onConfirm,
  onCancel,
}) => {
  const [tempHour, setTempHour] = useState(initialHour)
  const [tempMinute, setTempMinute] = useState(initialMinute)

  useEffect(() => {
    if (visible) {
      setTempHour(initialHour)
      setTempMinute(initialMinute)
    }
  }, [visible, initialHour, initialMinute])

  const generateHourOptions = () => {
    const hours = []
    for (let i = 0; i < 24; i++) {
      hours.push(i)
    }
    return hours
  }

  const generateMinuteOptions = () => {
    const minutes = []
    for (let i = 0; i < 60; i += 5) {
      minutes.push(i)
    }
    return minutes
  }

  const handleConfirm = () => {
    onConfirm(tempHour, tempMinute)
  }

  const handleCancel = () => {
    onCancel()
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType='slide'
      onRequestClose={handleCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Set Reminder Time</Text>

          <View style={styles.timePickerContainer}>
            {/* Hour Picker */}
            <View style={styles.pickerColumn}>
              <Text style={styles.pickerLabel}>Hour</Text>
              <ScrollView
                style={styles.pickerScroll}
                showsVerticalScrollIndicator={false}
              >
                {generateHourOptions().map((hour) => (
                  <TouchableOpacity
                    key={hour}
                    style={[
                      styles.pickerOption,
                      tempHour === hour && styles.pickerOptionSelected,
                    ]}
                    onPress={() => setTempHour(hour)}
                  >
                    <Text
                      style={[
                        styles.pickerOptionText,
                        tempHour === hour && styles.pickerOptionTextSelected,
                      ]}
                    >
                      {hour.toString().padStart(2, '0')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Minute Picker */}
            <View style={styles.pickerColumn}>
              <Text style={styles.pickerLabel}>Minute</Text>
              <ScrollView
                style={styles.pickerScroll}
                showsVerticalScrollIndicator={false}
              >
                {generateMinuteOptions().map((minute) => (
                  <TouchableOpacity
                    key={minute}
                    style={[
                      styles.pickerOption,
                      tempMinute === minute && styles.pickerOptionSelected,
                    ]}
                    onPress={() => setTempMinute(minute)}
                  >
                    <Text
                      style={[
                        styles.pickerOptionText,
                        tempMinute === minute &&
                          styles.pickerOptionTextSelected,
                      ]}
                    >
                      {minute.toString().padStart(2, '0')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.modalButtonCancel}
              onPress={handleCancel}
            >
              <Text style={styles.modalButtonCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonConfirm}
              onPress={handleConfirm}
            >
              <Text style={styles.modalButtonConfirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    color: '#2B2D42',
    textAlign: 'center',
    marginBottom: 24,
  },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  pickerColumn: {
    flex: 1,
    alignItems: 'center',
  },
  pickerLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#2B2D42',
    marginBottom: 12,
  },
  pickerScroll: {
    height: 200,
    width: '100%',
  },
  pickerOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 2,
    alignItems: 'center',
  },
  pickerOptionSelected: {
    backgroundColor: '#4CAF50',
  },
  pickerOptionText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#2B2D42',
  },
  pickerOptionTextSelected: {
    fontFamily: 'Poppins_600SemiBold',
    color: 'white',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButtonCancel: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
  },
  modalButtonCancelText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#666666',
  },
  modalButtonConfirm: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  modalButtonConfirmText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: 'white',
  },
})

export default TimePickerModal
