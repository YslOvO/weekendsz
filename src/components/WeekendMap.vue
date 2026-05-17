<script setup lang="ts">
import mapImage from '@/assets/map/shenzhen-handdrawn-map.png'
import type { Place } from '@/types/domain'

defineProps<{
  places: Place[]
  selectedId?: string
}>()

const emit = defineEmits<{
  (event: 'select', place: Place): void
}>()
</script>

<template>
  <view class="map-frame">
    <image class="map-image" :src="mapImage" mode="aspectFill" />
    <view class="map-overlay">
      <button
        v-for="place in places"
        :key="place.id"
        class="map-pin"
        :class="{ selected: selectedId === place.id, quiet: place.status === 'quiet' }"
        :style="{ left: `${place.mapPoint.x}%`, top: `${place.mapPoint.y}%` }"
        :aria-label="place.name"
        @click="emit('select', place)"
      >
        <text class="pin-dot" />
        <text class="pin-label">{{ place.name }}</text>
      </button>
    </view>
  </view>
</template>
