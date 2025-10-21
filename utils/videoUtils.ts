export const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60)
  const seconds = Math.floor(timeInSeconds % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export const calculateTimeFromPosition = (
  locationX: number,
  progressBarWidth: number,
  totalLength: number
): number => {
  if (totalLength === 0 || progressBarWidth === 0) return 0

  // Clamp the position between 0 and progressBarWidth
  const clampedX = Math.max(0, Math.min(locationX, progressBarWidth))
  const percentage = clampedX / progressBarWidth
  return percentage * totalLength
}

export const calculateTimeFromAbsolutePosition = (
  pageX: number,
  progressBarLayout: { x: number; width: number },
  totalLength: number
): number => {
  if (totalLength === 0 || progressBarLayout.width === 0) return 0

  const relativeX = pageX - progressBarLayout.x
  const clampedX = Math.max(0, Math.min(relativeX, progressBarLayout.width))
  const percentage = clampedX / progressBarLayout.width
  return percentage * totalLength
}
