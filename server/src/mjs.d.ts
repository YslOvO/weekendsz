declare module './mockData.mjs' {
  export const places: Array<Record<string, unknown>>
  export const events: Array<Record<string, unknown>>
  export const reviewSignals: Array<Record<string, unknown>>
  export const activityDrafts: Array<Record<string, unknown>>
}

declare module './sourceParser.mjs' {
  export function parseSourceAccountText(text: string): string[]
}
