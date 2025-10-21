import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Video from 'react-native-video'
import { useVideoPlayer } from '@/hooks/useVideoPlayer'
import VideoOverlay from './VideoOverlay'
import VideoControls from './VideoControls'
import ProgressBar from './ProgressBar'
import { VIDEO_CONFIG, VIDEO_STYLES } from '@/constants/videoPlayer'

const YouTubeVideoPlayer = () => {
  const [modalVisible, setModalVisible] = useState(false)

  const {
    videoRef,
    isPlaying,
    volume,
    totalLength,
    currentTime,
    handlePlay,
    handleFullscreen,
    handleBackward,
    handleForward,
    handleProgress,
    handleSeek,
    toggleVolume,
  } = useVideoPlayer()

  return (
    <VideoOverlay onPress={() => setModalVisible(!modalVisible)}>
      <Video
        source={require('@/assets/video/broadchurch.mp4')}
        style={styles.video}
        controls={false}
        ref={videoRef}
        volume={volume}
        onProgress={handleProgress}
      />

      {modalVisible && (
        <View style={styles.controlsOverlay}>
          <VideoControls
            isPlaying={isPlaying}
            currentTime={currentTime}
            totalLength={totalLength}
            volume={volume}
            onPlay={handlePlay}
            onBackward={handleBackward}
            onForward={handleForward}
            onFullscreen={handleFullscreen}
            onToggleVolume={toggleVolume}
          />

          <ProgressBar
            currentTime={currentTime}
            totalLength={totalLength}
            onSeek={handleSeek}
          />
        </View>
      )}
    </VideoOverlay>
  )
}

export default YouTubeVideoPlayer

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: VIDEO_CONFIG.VIDEO_HEIGHT,
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: VIDEO_STYLES.CONTROLS_OVERLAY_BG,
    justifyContent: 'space-between',
    padding: VIDEO_CONFIG.CONTROLS_PADDING,
  },
})
