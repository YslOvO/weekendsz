<script setup lang="ts">
import { computed, ref } from 'vue'
import EventCard from '@/components/EventCard.vue'
import FilterBar from '@/components/FilterBar.vue'
import WeekendMap from '@/components/WeekendMap.vue'
import { typeLabels } from '@/data/weekendsz'
import { defaultFilters, filterPlaces, getEventsByPlace, topEvents } from '@/services/catalog'
import type { Place, SearchFilters } from '@/types/domain'

const filters = ref<SearchFilters>({ ...defaultFilters })
const selectedPlace = ref<Place | undefined>()
const visiblePlaces = computed(() => filterPlaces(filters.value))
const selectedEvents = computed(() => (selectedPlace.value ? getEventsByPlace(selectedPlace.value.id) : topEvents(3)))

function selectPlace(place: Place) {
  selectedPlace.value = place
}

function goPlace(placeId: string) {
  uni.navigateTo({ url: `/pages/place/index?id=${placeId}` })
}

function goAdmin() {
  uni.navigateTo({ url: '/pages/admin/index' })
}
</script>

<template>
  <view class="page">
    <view class="topbar">
      <view class="brand">
        <text class="brand-title">WeekendSZ</text>
        <text class="brand-subtitle">深圳周末去哪玩 · 活动地图 / 商场快闪 / 亲子轻出游</text>
      </view>
      <view class="top-actions">
        <button class="ghost-button" aria-label="进入运营台" @click="goAdmin">运营台</button>
      </view>
    </view>

    <view class="hero-layout">
      <WeekendMap :places="visiblePlaces" :selected-id="selectedPlace?.id" @select="selectPlace" />

      <view class="side-panel">
        <FilterBar v-model="filters" />

        <view v-if="selectedPlace" class="spot-card">
          <text class="eyebrow">{{ selectedPlace.district }} · {{ typeLabels[selectedPlace.type] }}</text>
          <text class="spot-title">{{ selectedPlace.name }}</text>
          <text class="spot-summary">{{ selectedPlace.summary }}</text>
          <view class="metric-row">
            <view class="metric">
              <text class="metric-value">{{ selectedPlace.heat }}</text>
              <text class="metric-label">热度</text>
            </view>
            <view class="metric">
              <text class="metric-value">{{ selectedPlace.eventCount }}</text>
              <text class="metric-label">活动</text>
            </view>
            <view class="metric">
              <text class="metric-value">{{ selectedPlace.audiences.length }}</text>
              <text class="metric-label">人群</text>
            </view>
          </view>
          <view class="tag-row">
            <text v-for="tag in selectedPlace.tags" :key="tag" class="tag">{{ tag }}</text>
          </view>
          <button class="primary-button" style="margin-top: 16px;" @click="goPlace(selectedPlace.id)">
            查看详情
          </button>
        </view>

        <view v-else class="spot-card">
          <text class="eyebrow">地图浏览</text>
          <text class="spot-title">{{ visiblePlaces.length }} 个周末点位</text>
          <text class="spot-summary">点击地图上的红点查看摘要，再进入景点页查看活动和口碑线索。</text>
        </view>

        <view class="spot-card">
          <text class="eyebrow">本周热门</text>
          <view class="event-list">
            <EventCard v-for="event in selectedEvents" :key="event.id" :event="event" compact />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
