import cors from '@fastify/cors'
import Fastify from 'fastify'
import { activityDrafts, events, places, reviewSignals } from './mockData.mjs'
import { parseSourceAccountText } from './sourceParser.mjs'

const server = Fastify({ logger: true })

await server.register(cors, {
  origin: true
})

server.get('/health', async () => ({
  ok: true,
  service: 'WeekendSZ API'
}))

server.get('/api/places', async (request) => {
  const query = request.query as { district?: string; type?: string; keyword?: string }
  const keyword = (query.keyword || '').trim().toLowerCase()

  return places.filter((place) => {
    const districtOk = !query.district || query.district === '全部' || place.district === query.district
    const typeOk = !query.type || query.type === 'all' || place.type === query.type
    const keywordOk = !keyword || [place.name, place.district, ...place.tags].join(' ').toLowerCase().includes(keyword)
    return districtOk && typeOk && keywordOk
  })
})

server.get('/api/places/:id', async (request) => {
  const { id } = request.params as { id: string }
  const place = places.find((item) => item.id === id)
  if (!place) return { error: 'PLACE_NOT_FOUND' }

  return {
    ...place,
    events: events.filter((event) => event.placeId === id)
  }
})

server.get('/api/events/:id', async (request) => {
  const { id } = request.params as { id: string }
  const event = events.find((item) => item.id === id)
  if (!event) return { error: 'EVENT_NOT_FOUND' }

  return {
    ...event,
    reviews: reviewSignals.filter((review) => review.targetType === 'event' && review.targetId === id && review.status === 'approved')
  }
})

server.post('/api/admin/source-import', async (request) => {
  const body = request.body as { text?: string }
  const names = parseSourceAccountText(body.text || '')

  return {
    count: names.length,
    sources: names.map((name, index) => ({
      id: `src-${Date.now()}-${index}`,
      name,
      type: 'wechat',
      enabled: true
    }))
  }
})

server.get('/api/admin/drafts', async () => activityDrafts)

server.post('/api/admin/drafts/:id/approve', async (request) => {
  const { id } = request.params as { id: string }
  const draft = activityDrafts.find((item) => item.id === id)
  if (!draft) return { error: 'DRAFT_NOT_FOUND' }

  return { ...draft, status: 'approved' }
})

const port = Number(process.env.PORT || 8787)
const host = process.env.HOST || '0.0.0.0'

await server.listen({ port, host })
