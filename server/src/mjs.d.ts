declare module '*.mjs' {
  export const places: any[]
  export const events: any[]
  export const reviewSignals: any[]
  export const activityDrafts: any[]
  export function parseSourceAccountText(text: string): string[]
}
