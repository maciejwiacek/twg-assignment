import {
  VideoDetailItem,
  VideoDetailResponse,
  YouTubeSearchResponse,
} from './types'
import axios from 'axios'

const YOUTUBE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY!
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3'

export const fetchYouTubeVideos = async (
  query: string,
  pageToken?: string
): Promise<YouTubeSearchResponse> => {
  if (!query) {
    throw new Error('Search query is required')
  }

  const params = new URLSearchParams({
    part: 'snippet',
    q: query,
    key: YOUTUBE_API_KEY,
    type: 'video',
  })

  if (pageToken) {
    params.append('pageToken', pageToken)
  }

  const url = `${YOUTUBE_API_BASE}/search?${params.toString()}`

  const { data } = await axios.get<YouTubeSearchResponse>(url)

  return data
}

export const fetchYouTubeVideoDetails = async (
  videoId: string
): Promise<VideoDetailItem> => {
  const params = new URLSearchParams({
    part: 'snippet,contentDetails,statistics',
    id: videoId,
    key: YOUTUBE_API_KEY,
  })

  const url = `${YOUTUBE_API_BASE}/videos?${params.toString()}`

  const { data } = await axios.get<VideoDetailResponse>(url)

  return data.items[0]
}
