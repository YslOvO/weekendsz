import { events, homeSourcePlaceNames, places, reviewSignals } from '@/data/weekendsz'
import type { Event, EventStatus, Place, ReviewSignal, SearchFilters } from '@/types/domain'

export const defaultFilters: SearchFilters = {
  district: '全部',
  type: 'all',
  audience: 'all',
  status: 'all',
  keyword: ''
}

export function getPlaceById(id: string): Place | undefined {
  return places.find((place) => place.id === id)
}

export function getEventById(id: string): Event | undefined {
  return events.find((event) => event.id === id)
}

export function getEventsByPlace(placeId: string): Event[] {
  return events.filter((event) => event.placeId === placeId)
}

export function getHomePlaces(): Place[] {
  const sourceNameSet = new Set(homeSourcePlaceNames)
  return places.filter((place) => sourceNameSet.has(place.name))
}

export function getReviewsForTarget(targetType: ReviewSignal['targetType'], targetId: string): ReviewSignal[] {
  return reviewSignals.filter((review) => review.targetType === targetType && review.targetId === targetId && review.status === 'approved')
}

export function filterPlaces(filters: SearchFilters): Place[] {
  return filterPlaceList(getHomePlaces(), filters)
}

export function filterPlaceList(placeList: Place[], filters: SearchFilters): Place[] {
  const keyword = filters.keyword.trim().toLowerCase()

  return placeList.filter((place) => {
    const placeEvents = getEventsByPlace(place.id)
    const matchesDistrict = filters.district === '全部' || place.district === filters.district
    const matchesType = filters.type === 'all' || place.type === filters.type
    const matchesAudience = filters.audience === 'all' || place.audiences.includes(filters.audience)
    const matchesStatus =
      filters.status === 'all' || placeEvents.some((event) => event.status === (filters.status as EventStatus))
    const searchable = [place.name, place.district, place.summary, ...place.tags, ...place.audiences].join(' ').toLowerCase()
    const matchesKeyword = !keyword || searchable.includes(keyword)

    return matchesDistrict && matchesType && matchesAudience && matchesStatus && matchesKeyword
  })
}

export function topEvents(limit = 5): Event[] {
  return [...events].sort((a, b) => b.heat - a.heat).slice(0, limit)
}

export function topHomeEvents(limit = 5): Event[] {
  const homePlaceIds = new Set(getHomePlaces().map((place) => place.id))
  return events
    .filter((event) => homePlaceIds.has(event.placeId))
    .sort((a, b) => b.heat - a.heat)
    .slice(0, limit)
}

export function parseSourceAccountText(text: string): string[] {
  const normalized = text.replace(/\r/g, '\n')
  const seen = new Set<string>()
  return normalized
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((name) => {
      if (seen.has(name)) return false
      seen.add(name)
      return true
    })
}
