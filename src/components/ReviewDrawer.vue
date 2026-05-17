<script setup lang="ts">
import type { ReviewSignal } from '@/types/domain'

defineProps<{
  visible: boolean
  reviews: ReviewSignal[]
}>()

const emit = defineEmits<{
  (event: 'close'): void
}>()
</script>

<template>
  <view v-if="visible" class="modal-mask" @click="emit('close')">
    <view class="review-drawer" @click.stop>
      <view class="drawer-head">
        <view>
          <text class="eyebrow">已脱敏评价线索</text>
          <text class="drawer-title">当前口碑摘要</text>
        </view>
        <button class="icon-button" aria-label="关闭" @click="emit('close')">×</button>
      </view>
      <view v-if="reviews.length" class="review-list">
        <view v-for="review in reviews" :key="review.id" class="review-item">
          <view class="review-source">
            <text>{{ review.sourcePlatform }}</text>
            <text>{{ review.publishedAt }}</text>
          </view>
          <text class="review-summary">{{ review.summary }}</text>
          <view class="tag-row">
            <text v-for="tag in review.tags" :key="tag" class="tag">{{ tag }}</text>
          </view>
        </view>
      </view>
      <view v-else class="empty-state">
        <text>暂无审核通过的评价线索，运营可在后台补充来源链接和摘要。</text>
      </view>
    </view>
  </view>
</template>
