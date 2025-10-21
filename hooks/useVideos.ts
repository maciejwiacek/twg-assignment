import { fetchYouTubeVideos } from '@/api/youtube/client'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useVideos = (query: string, enabled: boolean = true) => {
  const queryKey = ['youtubeInfiniteSearch', query]

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      fetchYouTubeVideos(query, pageParam as string | undefined),
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    initialPageParam: undefined as string | undefined,
    enabled: enabled && !!query,
  })
}
