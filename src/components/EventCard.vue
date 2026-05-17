<script setup lang="ts">
import { statusLabels } from '@/data/weekendsz'
import type { Event } from '@/types/domain'

defineProps<{
  event: Event
  compact?: boolean
}>()

function formatDate(value: string) {
  const date = new Date(value)
  return `${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, '0')}:00`
}
</script>

<template>
  <view class="event-card" :class="{ compact }">
    <view class="event-main">
      <view>
        <text class="event-title">{{ event.title }}</text>
        <text class="event-time">{{ formatDate(event.startsAt) }} - {{ formatDate(event.endsAt) }}</text>
      </view>
      <text class="status-pill" :class="event.status">{{ statusLabels[event.status] }}</text>
    </view>
    <text class="event-intro">{{ event.intro }}</text>
    <view class="event-meta">
      <text>热度 {{ event.heat }}</text>
      <text>{{ event.fee }}</text>
      <text>{{ event.location }}</text>
    </view>
  </view>
</template>
