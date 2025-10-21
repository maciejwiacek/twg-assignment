import { useRef, useState } from 'react'
import { VideoRef, OnProgressData } from 'react-native-video'

export const useVideoPlayer = () => {
  const videoRef = useRef<VideoRef>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(1)
  const [totalLength, setTotalLength] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

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

  const handleSeek = (time: number) => {
    videoRef.current?.seek(time)
    setCurrentTime(time)
  }

  const toggleVolume = () => {
    setVolume(volume === 1 ? 0 : 1)
  }

  return {
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
  }
}
