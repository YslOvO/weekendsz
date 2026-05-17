<script setup lang="ts">
import { ref } from 'vue'
import { activityDrafts, sourceAccounts } from '@/data/weekendsz'
import { approveDraft, importSourceAccounts } from '@/services/api'
import type { ActivityDraft, SourceAccount } from '@/types/domain'

const rawSources = ref('深圳万象天地\n欢乐港湾\n壹方城\n世界之窗')
const importedSources = ref<SourceAccount[]>([...sourceAccounts])
const drafts = ref<ActivityDraft[]>([...activityDrafts])
const importing = ref(false)

async function importText() {
  importing.value = true
  const imported = await importSourceAccounts(rawSources.value)
  importedSources.value = [...imported, ...importedSources.value]
  importing.value = false
}

async function approve(draft: ActivityDraft) {
  const approved = await approveDraft(draft)
  drafts.value = drafts.value.map((item) => (item.id === draft.id ? approved : item))
}

function goBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="page">
    <view class="topbar">
      <view class="brand">
        <text class="brand-title">内容运营台</text>
        <text class="brand-subtitle">公众号/公开网页来源导入、采集任务和人工审核池</text>
      </view>
      <button class="ghost-button" @click="goBack">返回</button>
    </view>

    <view class="admin-layout">
      <view class="admin-panel">
        <text class="eyebrow">来源导入</text>
        <text class="section-title">一行一个公众号或地点</text>
        <textarea v-model="rawSources" class="textarea" placeholder="深圳万象天地&#10;欢乐港湾&#10;壹方城" />
        <button class="primary-button" style="margin-top: 12px;" :disabled="importing" @click="importText">
          {{ importing ? '导入中...' : '生成采集源' }}
        </button>
        <text class="muted" style="display: block; margin-top: 12px;">
          首版只生成采集任务和审核草稿，不自动发布到前台。
        </text>
      </view>

      <view class="admin-panel">
        <text class="eyebrow">采集源</text>
        <view class="admin-list">
          <view v-for="source in importedSources" :key="source.id" class="admin-row">
            <view>
              <text class="admin-title">{{ source.name }}</text>
              <text class="muted">{{ source.type }} · {{ source.enabled ? '启用' : '停用' }}</text>
            </view>
            <text class="status-pill ongoing">任务</text>
          </view>
        </view>
      </view>

      <view class="admin-panel" style="grid-column: 1 / -1;">
        <text class="eyebrow">审核池</text>
        <view class="admin-list">
          <view v-for="draft in drafts" :key="draft.id" class="admin-row">
            <view>
              <text class="admin-title">{{ draft.title }}</text>
              <text class="muted">{{ draft.sourceName }} · {{ draft.placeHint }} · {{ draft.timeHint }}</text>
              <text class="spot-summary" style="display: block; margin-top: 6px;">{{ draft.summary }}</text>
              <view class="admin-actions">
                <button class="ghost-button">编辑</button>
                <button class="primary-button" @click="approve(draft)">审核通过</button>
              </view>
            </view>
            <text class="status-pill" :class="draft.status === 'approved' ? 'ongoing' : 'upcoming'">
              {{ draft.status === 'approved' ? '已通过' : '待审核' }}
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
