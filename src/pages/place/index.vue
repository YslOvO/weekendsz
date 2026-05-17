<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import EventCard from '@/components/EventCard.vue'
import ReviewDrawer from '@/components/ReviewDrawer.vue'
import { typeLabels } from '@/data/weekendsz'
import { getEventsByPlace, getPlaceById, getReviewsForTarget } from '@/services/catalog'
import type { Place } from '@/types/domain'

const place = ref<Place | undefined>()
const showReviews = ref(false)

onLoad((query) => {
  place.value = getPlaceById(String(query?.id || 'mixc-world'))
})

const placeEvents = computed(() => (place.value ? getEventsByPlace(place.value.id) : []))
const reviews = computed(() => (place.value ? getReviewsForTarget('place', place.value.id) : []))

function goBack() {
  uni.navigateBack()
}

function goEvent(eventId: string) {
  uni.navigateTo({ url: `/pages/event/index?id=${eventId}` })
}
</script>

<template>
  <view class="page">
    <view v-if="place" class="content-panel">
      <button class="ghost-button" @click="goBack">← 返回地图</button>

      <view class="detail-hero" style="margin-top: 16px;">
        <view>
          <text class="eyebrow">{{ place.district }} · {{ typeLabels[place.type] }}</text>
          <text class="detail-title">{{ place.name }}</text>
          <text class="spot-summary">{{ place.summary }}</text>
          <view class="tag-row">
            <text v-for="tag in place.tags" :key="tag" class="tag">{{ tag }}</text>
          </view>
        </view>
        <view class="detail-visual" />
      </view>

      <view class="detail-grid">
        <view class="info-tile">
          <text class="info-label">地址</text>
          <text class="info-value">{{ place.address }}</text>
        </view>
        <view class="info-tile">
          <text class="info-label">开放时间</text>
          <text class="info-value">{{ place.hours }}</text>
        </view>
        <view class="info-tile">
          <text class="info-label">交通</text>
          <text class="info-value">{{ place.transit }}</text>
        </view>
        <view class="info-tile">
          <text class="info-label">适合人群</text>
          <text class="info-value">{{ place.audiences.join(' / ') }}</text>
        </view>
      </view>

      <view class="section-title">
        当前活动
        <text class="floating-dot" />
      </view>

      <view class="event-list">
        <button v-for="event in placeEvents" :key="event.id" @click="goEvent(event.id)">
          <EventCard :event="event" />
        </button>
      </view>

      <view class="admin-actions">
        <button class="ghost-button" @click="showReviews = true">查看评价线索</button>
      </view>

      <ReviewDrawer :visible="showReviews" :reviews="reviews" @close="showReviews = false" />
    </view>
  </view>
</template>
