import { useState, useRef } from 'react'
import { PanResponder, GestureResponderEvent } from 'react-native'
import { calculateTimeFromAbsolutePosition } from '@/utils/videoUtils'

export const useProgressBar = (
  totalLength: number,
  onSeek: (time: number) => void
) => {
  const progressBarRef = useRef<any>(null)
  const [progressBarWidth, setProgressBarWidth] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragTime, setDragTime] = useState(0)
  const [progressBarLayout, setProgressBarLayout] = useState({ x: 0, width: 0 })

  const handleProgressBarLayout = (event: any) => {
    const { x, width } = event.nativeEvent.layout
    setProgressBarLayout({ x, width })
    setProgressBarWidth(width)
  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (event) => {
      const { pageX } = event.nativeEvent
      const newTime = calculateTimeFromAbsolutePosition(
        pageX,
        progressBarLayout,
        totalLength
      )
      setDragTime(newTime)
      setIsDragging(true)
    },
    onPanResponderMove: (event) => {
      const { pageX } = event.nativeEvent
      const newTime = calculateTimeFromAbsolutePosition(
        pageX,
        progressBarLayout,
        totalLength
      )
      setDragTime(newTime)
    },
    onPanResponderRelease: () => {
      onSeek(dragTime)
      setIsDragging(false)
    },
    onPanResponderTerminate: () => {
      setIsDragging(false)
    },
  })

  return {
    progressBarRef,
    progressBarWidth,
    isDragging,
    dragTime,
    progressBarLayout,
    handleProgressBarLayout,
    panResponder,
  }
}
