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
