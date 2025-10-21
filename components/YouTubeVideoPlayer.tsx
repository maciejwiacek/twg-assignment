import Video, { VideoRef } from 'react-native-video'
import React, { useRef, useState } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
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
  const [isPlaying, setIsPlaying] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [volume, setVolume] = useState(1)
  const [totalLength, setTotalLength] = useState(0)

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

  const handleProgress = (progress) => {
    setTotalLength(progress.seekableDuration)
  }

  return (
    <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
      <View>
        <Video
          source={require('@/assets/video/broadchurch.mp4')}
          style={{ width: '100%', height: 280 }}
          controls={false}
          ref={videoRef}
          volume={volume}
          onProgress={handleProgress}
        />
        {modalVisible && (
          <View style={styles.modal}>
            <View style={styles.topButtons}>
              <VideoPlayerButton
                icon={<LeftArrowIcon width={24} height={24} />}
                onPress={() => {
                  router.back()
                }}
              />
              <View style={styles.volumeAndAirplayButtons}>
                <VideoPlayerButton
                  icon={<VolumeIcon width={24} height={24} />}
                  onPress={() => {
                    setVolume(volume === 1 ? 0 : 1)
                  }}
                />
                <VideoPlayerButton
                  icon={<AirplayIcon width={24} height={24} />}
                  onPress={() => {}}
                />
              </View>
            </View>
            <View style={styles.middleButtons}>
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
            <View style={styles.bottomButtons}>
              <VideoPlayerButton
                icon={<FullscreenIcon width={24} height={24} />}
                onPress={handleFullscreen}
              />
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default YouTubeVideoPlayer

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    height: 280,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  volumeAndAirplayButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  middleButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
})
