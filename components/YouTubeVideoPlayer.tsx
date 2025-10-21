import Video, { OnProgressData, VideoRef } from 'react-native-video'
import React, { useRef, useState, useEffect } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  GestureResponderEvent,
  PanResponder,
} from 'react-native'
import VideoPlayerButton from './VideoPlayerButton'
import PlayIcon from '@/assets/icons/play-icon.svg'
import PauseIcon from '@/assets/icons/pause-icon.svg'
import BackwardIcon from '@/assets/icons/backward-icon.svg'
import ForwardIcon from '@/assets/icons/forward-icon.svg'
import LeftArrowIcon from '@/assets/icons/leftarrow-icon.svg'
import VolumeIcon from '@/assets/icons/volume-icon.svg'
import AirplayIcon from '@/assets/icons/airplay-icon.svg'
import FullscreenIcon from '@/assets/icons/fullscreen-icon.svg'
import { router } from 'expo-router'

const YouTubeVideoPlayer = () => {
  const videoRef = useRef<VideoRef>(null)
  const progressBarRef = useRef<View>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [volume, setVolume] = useState(1)
  const [totalLength, setTotalLength] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [progressBarWidth, setProgressBarWidth] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragTime, setDragTime] = useState(0)

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
    if (isPlaying) {
      videoRef.current?.pause()
    } else {
      videoRef.current?.resume()
    }
  }

  const handleFullscreen = () => {
    videoRef.current?.presentFullscreenPlayer()
  }

  const handleBackward = async () => {
    try {
      const currentTime = await videoRef.current?.getCurrentPosition()
      if (currentTime) {
        await videoRef.current?.seek(currentTime - 10)
      }
    } catch (error) {
      console.error('Error seeking backward:', error)
    }
  }

  const handleForward = async () => {
    try {
      const currentTime = await videoRef.current?.getCurrentPosition()
      if (currentTime) {
        await videoRef.current?.seek(currentTime + 10)
      }
    } catch (error) {
      console.error('Error seeking forward:', error)
    }
  }

  const handleProgress = (progress: OnProgressData) => {
    setTotalLength(progress.seekableDuration)
    setCurrentTime(progress.currentTime)
  }

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const calculateTimeFromPosition = (locationX: number) => {
    if (totalLength === 0 || progressBarWidth === 0) return 0

    // Clamp the position between 0 and progressBarWidth
    const clampedX = Math.max(0, Math.min(locationX, progressBarWidth))
    const percentage = clampedX / progressBarWidth
    return percentage * totalLength
  }

  const handleProgressBarPress = (event: GestureResponderEvent) => {
    if (totalLength === 0 || progressBarWidth === 0) return

    const { locationX } = event.nativeEvent
    const newTime = calculateTimeFromPosition(locationX)
    videoRef.current?.seek(newTime)
    setCurrentTime(newTime)
  }

  const [progressBarLayout, setProgressBarLayout] = useState({ x: 0, width: 0 })

  const handleProgressBarLayout = (event: any) => {
    const { x, width } = event.nativeEvent.layout
    setProgressBarLayout({ x, width })
    setProgressBarWidth(width)
  }

  const calculateTimeFromAbsolutePosition = (pageX: number) => {
    if (totalLength === 0 || progressBarLayout.width === 0) return 0

    const relativeX = pageX - progressBarLayout.x
    const clampedX = Math.max(0, Math.min(relativeX, progressBarLayout.width))
    const percentage = clampedX / progressBarLayout.width
    return percentage * totalLength
  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (event) => {
      const { pageX } = event.nativeEvent
      const newTime = calculateTimeFromAbsolutePosition(pageX)
      setDragTime(newTime)
      setIsDragging(true)
    },
    onPanResponderMove: (event) => {
      const { pageX } = event.nativeEvent
      const newTime = calculateTimeFromAbsolutePosition(pageX)
      setDragTime(newTime)
    },
    onPanResponderRelease: () => {
      videoRef.current?.seek(dragTime)
      setCurrentTime(dragTime)
      setIsDragging(false)
    },
    onPanResponderTerminate: () => {
      setIsDragging(false)
    },
  })

  return (
    <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
      <View style={styles.videoContainer}>
        <Video
          source={require('@/assets/video/broadchurch.mp4')}
          style={styles.video}
          controls={false}
          ref={videoRef}
          volume={volume}
          onProgress={handleProgress}
        />

        {/* Controls overlay */}
        {modalVisible && (
          <View style={styles.controlsOverlay}>
            <View style={styles.topControls}>
              <VideoPlayerButton
                icon={<LeftArrowIcon width={24} height={24} />}
                onPress={() => router.back()}
              />
              <View style={styles.rightControls}>
                <VideoPlayerButton
                  icon={<VolumeIcon width={24} height={24} />}
                  onPress={() => setVolume(volume === 1 ? 0 : 1)}
                />
                <VideoPlayerButton
                  icon={<AirplayIcon width={24} height={24} />}
                  onPress={() => {}}
                />
              </View>
            </View>

            <View style={styles.centerControls}>
              <VideoPlayerButton
                icon={<BackwardIcon width={24} height={24} />}
                onPress={handleBackward}
              />
              <VideoPlayerButton
                size='large'
                icon={
                  isPlaying ? (
                    <PauseIcon width={24} height={24} />
                  ) : (
                    <PlayIcon width={24} height={24} />
                  )
                }
                onPress={handlePlay}
              />
              <VideoPlayerButton
                icon={<ForwardIcon width={24} height={24} />}
                onPress={handleForward}
              />
            </View>

            <View style={styles.bottomControls}>
              <Text style={styles.timeDisplay}>
                {formatTime(currentTime)} / {formatTime(totalLength)}
              </Text>
              <TouchableOpacity onPress={handleFullscreen}>
                <FullscreenIcon width={24} height={24} />
              </TouchableOpacity>
            </View>

            {/* Progress bar inside modal */}
            <View style={styles.progressBarContainer}>
              <View
                ref={progressBarRef}
                style={styles.progressBarTouchable}
                onLayout={handleProgressBarLayout}
                {...panResponder.panHandlers}
                hitSlop={{ top: 20, bottom: 20, left: 0, right: 0 }}
              >
                <View style={styles.progressBarBackground}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${
                          totalLength > 0 && progressBarLayout.width > 0
                            ? ((isDragging ? dragTime : currentTime) /
                                totalLength) *
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
                            ? ((isDragging ? dragTime : currentTime) /
                                totalLength) *
                              100
                            : 0
                        }%`,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default YouTubeVideoPlayer

const styles = StyleSheet.create({
  videoContainer: {
    position: 'relative',
  },
  video: {
    width: '100%',
    height: 280,
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'space-between',
    padding: 16,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  rightControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  centerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
  },
  timeDisplay: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  progressBarTouchable: {
    height: 4,
    justifyContent: 'center',
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    position: 'relative',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FF0000',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  progressBarThumb: {
    position: 'absolute',
    top: -4,
    width: 12,
    height: 12,
    backgroundColor: '#FF0000',
    borderRadius: 6,
    marginLeft: -6,
  },
})
