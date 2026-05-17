<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import ReviewDrawer from '@/components/ReviewDrawer.vue'
import { statusLabels } from '@/data/weekendsz'
import { getEventById, getPlaceById, getReviewsForTarget } from '@/services/catalog'
import type { Event, Place } from '@/types/domain'

const event = ref<Event | undefined>()
const place = ref<Place | undefined>()
const showReviews = ref(false)

onLoad((query) => {
  event.value = getEventById(String(query?.id || 'evt-happy-harbor-sunset'))
  place.value = event.value ? getPlaceById(event.value.placeId) : undefined
})

const reviews = computed(() => (event.value ? getReviewsForTarget('event', event.value.id) : []))

function goBack() {
  uni.navigateBack()
}

function formatDate(value: string) {
  const date = new Date(value)
  return `${date.getMonth() + 1}月${date.getDate()}日 ${String(date.getHours()).padStart(2, '0')}:00`
}
</script>

<template>
  <view class="page">
    <view v-if="event && place" class="content-panel">
      <button class="ghost-button" @click="goBack">← 返回上一层</button>

      <view class="story-layout" style="margin-top: 16px;">
        <view class="story-panel">
          <text class="eyebrow">{{ place.name }}</text>
          <text class="detail-title">{{ event.title }}</text>
          <text class="status-pill" :class="event.status">{{ statusLabels[event.status] }}</text>
          <view class="tag-row">
            <text v-for="tag in event.tags" :key="tag" class="tag">{{ tag }}</text>
          </view>
          <view class="detail-grid">
            <view class="info-tile">
              <text class="info-label">举办时间</text>
              <text class="info-value">{{ formatDate(event.startsAt) }} - {{ formatDate(event.endsAt) }}</text>
            </view>
            <view class="info-tile">
              <text class="info-label">地点</text>
              <text class="info-value">{{ event.location }}</text>
            </view>
            <view class="info-tile">
              <text class="info-label">参与方式</text>
              <text class="info-value">{{ event.participation }}</text>
            </view>
            <view class="info-tile">
              <text class="info-label">费用</text>
              <text class="info-value">{{ event.fee }}</text>
            </view>
          </view>
        </view>

        <view class="story-panel">
          <text class="section-title">活动介绍</text>
          <text class="spot-summary">{{ event.intro }}</text>
          <text class="section-title">周末玩法</text>
          <text class="spot-summary">{{ event.detail }}</text>
          <view class="admin-actions">
            <button class="primary-button" @click="showReviews = true">
              查看口碑摘要
              <text class="floating-dot" />
            </button>
          </view>
        </view>
      </view>

      <ReviewDrawer :visible="showReviews" :reviews="reviews" @close="showReviews = false" />
    </view>
  </view>
</template>
