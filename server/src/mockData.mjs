export const places = [
  {
    id: 'mixc-world',
    name: '深圳万象天地',
    district: '南山',
    type: 'mall',
    heat: 96,
    eventCount: 3,
    tags: ['逛街', '展览', '拍照'],
    mapPoint: { x: 36, y: 47 }
  },
  {
    id: 'happy-harbor',
    name: '欢乐港湾',
    district: '宝安',
    type: 'coast',
    heat: 93,
    eventCount: 3,
    tags: ['滨海', '夜景', '亲子'],
    mapPoint: { x: 27, y: 44 }
  },
  {
    id: 'window-world',
    name: '世界之窗',
    district: '南山',
    type: 'landmark',
    heat: 90,
    eventCount: 2,
    tags: ['景区', '演艺', '亲子'],
    mapPoint: { x: 42, y: 47 }
  }
]

export const events = [
  {
    id: 'evt-happy-harbor-sunset',
    placeId: 'happy-harbor',
    title: '湾区日落音乐市集',
    startsAt: '2026-05-22T16:00:00+08:00',
    endsAt: '2026-05-24T22:00:00+08:00',
    status: 'upcoming',
    heat: 95,
    tags: ['市集', '音乐', '日落']
  },
  {
    id: 'evt-window-night-show',
    placeId: 'window-world',
    title: '世界之窗夜场奇遇季',
    startsAt: '2026-05-01T18:00:00+08:00',
    endsAt: '2026-06-02T22:30:00+08:00',
    status: 'ongoing',
    heat: 90,
    tags: ['夜场', '演艺', '亲子']
  }
]

export const reviewSignals = [
  {
    id: 'rev-happy-harbor-1',
    targetType: 'event',
    targetId: 'evt-happy-harbor-sunset',
    sourcePlatform: '小红书',
    sourceUrl: 'https://example.com/review/happy-harbor',
    summary: '近期用户更推荐傍晚到达，日落与摩天轮同框位置热度最高，停车高峰期排队明显。',
    status: 'approved'
  }
]

export const activityDrafts = [
  {
    id: 'draft-001',
    sourceName: '深圳万象天地',
    title: '周末街区插画艺术周招募',
    placeHint: '深圳万象天地',
    timeHint: '5月18日-5月31日',
    summary: '公众号公开文章提到街区插画展、盖章路线和限定周边兑换信息。',
    status: 'pending',
    sourceUrl: 'https://example.com/draft/mixc'
  }
]
