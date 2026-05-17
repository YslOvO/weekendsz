<script setup lang="ts">
import { districts, statusLabels, typeLabels } from '@/data/weekendsz'
import type { SearchFilters } from '@/types/domain'

const props = defineProps<{
  modelValue: SearchFilters
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: SearchFilters): void
}>()

const audiences = ['all', '情侣', '亲子', '学生', '上班族']

function patch(value: Partial<SearchFilters>) {
  emit('update:modelValue', { ...props.modelValue, ...value })
}
</script>

<template>
  <view class="filter-panel">
    <view class="search-row">
      <text class="search-icon">⌕</text>
      <input
        class="search-input"
        placeholder="搜索商场、景区、亲子、免费"
        :value="modelValue.keyword"
        @input="patch({ keyword: ($event.detail.value || '') })"
      />
    </view>

    <scroll-view class="chip-scroll" scroll-x>
      <button
        v-for="district in districts"
        :key="district"
        class="chip"
        :class="{ active: modelValue.district === district }"
        @click="patch({ district })"
      >
        {{ district }}
      </button>
    </scroll-view>

    <scroll-view class="chip-scroll" scroll-x>
      <button
        v-for="(label, type) in typeLabels"
        :key="type"
        class="chip compact"
        :class="{ active: modelValue.type === type }"
        @click="patch({ type })"
      >
        {{ label }}
      </button>
    </scroll-view>

    <view class="segmented">
      <button
        v-for="audience in audiences"
        :key="audience"
        class="segment"
        :class="{ active: modelValue.audience === audience }"
        @click="patch({ audience })"
      >
        {{ audience === 'all' ? '人群' : audience }}
      </button>
    </view>

    <view class="segmented status">
      <button
        v-for="(label, status) in statusLabels"
        :key="status"
        class="segment"
        :class="{ active: modelValue.status === status }"
        @click="patch({ status })"
      >
        {{ label }}
      </button>
    </view>
  </view>
</template>
