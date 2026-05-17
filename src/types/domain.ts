export type PlaceType = 'mall' | 'landmark' | 'park' | 'market' | 'family' | 'coast'
export type EventStatus = 'ongoing' | 'upcoming' | 'ended'
export type ReviewStatus = 'pending' | 'approved' | 'rejected'
export type SourceType = 'wechat' | 'official_site' | 'public_page' | 'review_link'

export interface MapPoint {
  x: number
  y: number
}

export interface Place {
  id: string
  name: string
  district: string
  type: PlaceType
  address: string
  hours: string
  transit: string
  summary: string
  cover: string
  mapPoint: MapPoint
  heat: number
  eventCount: number
  tags: string[]
  audiences: string[]
  status: 'active' | 'quiet'
}

export interface Event {
  id: string
  placeId: string
  title: string
  startsAt: string
  endsAt: string
  location: string
  status: EventStatus
  intro: string
  detail: string
  participation: string
  fee: string
  heat: number
  tags: string[]
  sourceUrl: string
}

export interface ReviewSignal {
  id: string
  targetType: 'place' | 'event'
  targetId: string
  sourcePlatform: '小红书' | '大众点评' | '公众号' | '官网'
  sourceUrl: string
  publishedAt: string
  summary: string
  sentiment: 'positive' | 'mixed' | 'negative'
  tags: string[]
  status: ReviewStatus
}

export interface SourceAccount {
  id: string
  name: string
  type: SourceType
  url?: string
  enabled: boolean
  lastFetchedAt?: string
}

export interface ActivityDraft {
  id: string
  sourceName: string
  title: string
  placeHint: string
  timeHint: string
  summary: string
  status: ReviewStatus
  sourceUrl: string
}

export interface SearchFilters {
  district: string
  type: string
  audience: string
  status: string
  keyword: string
}
