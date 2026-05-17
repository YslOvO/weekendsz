import test from 'node:test'
import assert from 'node:assert/strict'
import { parseSourceAccountText } from '../server/src/sourceParser.mjs'

test('parseSourceAccountText trims blank lines and deduplicates names', () => {
  const result = parseSourceAccountText('深圳万象天地\n\n 欢乐港湾 \r\n深圳万象天地\n壹方城')
  assert.deepEqual(result, ['深圳万象天地', '欢乐港湾', '壹方城'])
})

test('parseSourceAccountText handles empty input', () => {
  assert.deepEqual(parseSourceAccountText(' \n\t'), [])
})
