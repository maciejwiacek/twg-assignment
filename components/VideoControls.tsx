import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import VideoPlayerButton from './VideoPlayerButton'
import PlayIcon from '@/assets/icons/play-icon.svg'
import PauseIcon from '@/assets/icons/pause-icon.svg'
import BackwardIcon from '@/assets/icons/backward-icon.svg'
import ForwardIcon from '@/assets/icons/forward-icon.svg'
import LeftArrowIcon from '@/assets/icons/leftarrow-icon.svg'
import VolumeIcon from '@/assets/icons/volume-icon.svg'
import AirplayIcon from '@/assets/icons/airplay-icon.svg'
import FullscreenIcon from '@/assets/icons/fullscreen-icon.svg'
import { formatTime } from '@/utils/videoUtils'
import { VIDEO_CONFIG, VIDEO_STYLES } from '@/constants/videoPlayer'

interface VideoControlsProps {
  isPlaying: boolean
  currentTime: number
  totalLength: number
  volume: number
  onPlay: () => void
  onBackward: () => void
  onForward: () => void
  onFullscreen: () => void
  onToggleVolume: () => void
}

const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  currentTime,
  totalLength,
  volume,
  onPlay,
  onBackward,
  onForward,
  onFullscreen,
  onToggleVolume,
}) => {
  return (
    <>
      <View style={styles.topControls}>
        <VideoPlayerButton
          icon={<LeftArrowIcon width={24} height={24} />}
          onPress={() => router.back()}
        />
        <View style={styles.rightControls}>
          <VideoPlayerButton
            icon={<VolumeIcon width={24} height={24} />}
            onPress={onToggleVolume}
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
          onPress={onBackward}
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
          onPress={onPlay}
        />
        <VideoPlayerButton
          icon={<ForwardIcon width={24} height={24} />}
          onPress={onForward}
        />
      </View>

      <View style={styles.bottomControls}>
        <Text style={styles.timeDisplay}>
          {formatTime(currentTime)} / {formatTime(totalLength)}
        </Text>
        <TouchableOpacity onPress={onFullscreen}>
          <FullscreenIcon width={24} height={24} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  rightControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: VIDEO_CONFIG.RIGHT_CONTROLS_GAP,
  },
  centerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: VIDEO_CONFIG.CONTROLS_GAP,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
  },
  timeDisplay: {
    color: VIDEO_STYLES.TIME_DISPLAY_COLOR,
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
})

export default VideoControls
