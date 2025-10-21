// YouTube API Response Types
export interface YouTubeSearchResponse {
  nextPageToken?: string
  prevPageToken?: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: YouTubeSearchItem[]
}

export interface YouTubeSearchItem {
  id: {
    kind: string
    videoId: string
  }
  snippet: {
    publishedAt: string
    title: string
    description: string
    thumbnails: {
      default: { url: string }
      high: { url: string }
    }
    channelTitle: string
  }
}

export interface VideoDetailResponse {
  items: VideoDetailItem[]
}

export interface VideoDetailItem {
  id: string
  snippet: {
    title: string
    description: string
    publishedAt: string
    channelTitle: string
  }
  statistics: {
    viewCount: string
    likeCount: string
  }
}
