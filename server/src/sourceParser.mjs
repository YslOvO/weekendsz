export function parseSourceAccountText(text) {
  const normalized = String(text || '').replace(/\r/g, '\n')
  const seen = new Set()

  return normalized
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((name) => {
      if (seen.has(name)) return false
      seen.add(name)
      return true
    })
}
