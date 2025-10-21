import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useProgressBar } from '@/hooks/useProgressBar'
import { VIDEO_CONFIG, VIDEO_STYLES } from '@/constants/videoPlayer'

interface ProgressBarProps {
  currentTime: number
  totalLength: number
  onSeek: (time: number) => void
}

const ProgressBar = ({
  currentTime,
  totalLength,
  onSeek,
}: ProgressBarProps) => {
  const {
    progressBarRef,
    isDragging,
    dragTime,
    progressBarLayout,
    handleProgressBarLayout,
    panResponder,
  } = useProgressBar(totalLength, onSeek)

  return (
    <View style={styles.progressBarContainer}>
      <View
        ref={progressBarRef}
        style={styles.progressBarTouchable}
        onLayout={handleProgressBarLayout}
        {...panResponder.panHandlers}
        hitSlop={VIDEO_CONFIG.HIT_SLOP}
      >
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${
                  totalLength > 0 && progressBarLayout.width > 0
                    ? ((isDragging ? dragTime : currentTime) / totalLength) *
                      100
                    : 0
                }%`,
              },
            ]}
          />
          <View
            style={[
              styles.progressBarThumb,
              {
                left: `${
                  totalLength > 0 && progressBarLayout.width > 0
                    ? ((isDragging ? dragTime : currentTime) / totalLength) *
                      100
                    : 0
                }%`,
              },
            ]}
          />
        </View>
      </View>
    </View>
  )
}

export default ProgressBar

const styles = StyleSheet.create({
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: VIDEO_CONFIG.PROGRESS_BAR_HEIGHT,
  },
  progressBarTouchable: {
    height: VIDEO_CONFIG.PROGRESS_BAR_HEIGHT,
    justifyContent: 'center',
  },
  progressBarBackground: {
    height: VIDEO_CONFIG.PROGRESS_BAR_HEIGHT,
    backgroundColor: VIDEO_STYLES.PROGRESS_BAR_BG,
    position: 'relative',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: VIDEO_STYLES.PROGRESS_BAR_FILL,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  progressBarThumb: {
    position: 'absolute',
    top: -4,
    width: VIDEO_CONFIG.THUMB_SIZE,
    height: VIDEO_CONFIG.THUMB_SIZE,
    backgroundColor: VIDEO_STYLES.PROGRESS_BAR_FILL,
    borderRadius: 6,
    marginLeft: -6,
  },
})
