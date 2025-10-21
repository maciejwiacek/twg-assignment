import { fetchYouTubeVideoDetails } from '@/api/youtube/client'
import { useQuery } from '@tanstack/react-query'

export const useVideoDetails = (videoId: string | undefined) => {
  const queryKey = ['videoDetails', videoId]

  return useQuery({
    queryKey,
    queryFn: () => fetchYouTubeVideoDetails(videoId as string),
    enabled: !!videoId,
    staleTime: 1000 * 60 * 5,
  })
}
