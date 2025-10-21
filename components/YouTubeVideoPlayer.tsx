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

const YouTubeVideoPlayer = () => {
  const videoRef = useRef<VideoRef>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
    if (isPlaying) {
      videoRef.current?.pause()
    } else {
      videoRef.current?.resume()
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
      <View>
        <Video
          source={require('@/assets/video/broadchurch.mp4')}
          style={{ width: '100%', height: 280 }}
          controls={false}
          ref={videoRef}
        />
        {modalVisible && (
          <View style={styles.modal}>
            <VideoPlayerButton
              icon={
                isPlaying ? (
                  <PauseIcon width={24} height={24} />
                ) : (
                  <PlayIcon width={24} height={24} />
                )
              }
              onPress={handlePlay}
            />
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    height: 280,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
})
