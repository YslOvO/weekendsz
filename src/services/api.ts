import { activityDrafts, events, places, reviewSignals, sourceAccounts } from '@/data/weekendsz'
import { parseSourceAccountText } from '@/services/catalog'
import type { ActivityDraft, SourceAccount } from '@/types/domain'

const wait = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchMapPayload() {
  await wait()
  return { places, events }
}

export async function fetchAdminPayload() {
  await wait()
  return { sourceAccounts, activityDrafts }
}

export async function importSourceAccounts(rawText: string): Promise<SourceAccount[]> {
  await wait(180)
  const names = parseSourceAccountText(rawText)
  return names.map((name, index) => ({
    id: `src-import-${Date.now()}-${index}`,
    name,
    type: 'wechat',
    enabled: true
  }))
}

export async function approveDraft(draft: ActivityDraft): Promise<ActivityDraft> {
  await wait(160)
  return { ...draft, status: 'approved' }
}

export async function fetchReviewSignals() {
  await wait()
  return reviewSignals
}
