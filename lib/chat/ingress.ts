// Cheap per-process load shedding, before parsing or external quota calls.
// This supplements the hosting firewall; it is not distributed DDoS protection.
let windowStart = 0
let count = 0
export function allowIngress(now = Date.now()): boolean {
  if (now - windowStart >= 60000) { windowStart = now; count = 0 }
  if (count >= 60) return false
  count++
  return true
}
export async function readChatBody(request: Request, timeoutMs = 5000): Promise<unknown> {
  if (!request.body) throw new Error('Missing body')
  const declared = request.headers.get('content-length')
  if (declared !== null && (!/^\d+$/.test(declared) || Number(declared) > 12000)) throw new Error('Request too large')
  const reader = request.body.getReader()
  const chunks: Uint8Array[] = []
  let size = 0
  let timeout: ReturnType<typeof setTimeout> | undefined
  const expired = new Promise<never>((_, reject) => {
    timeout = setTimeout(() => { reject(new Error('Request timeout')); void reader.cancel().catch(() => {}) }, timeoutMs)
  })
  try {
    while (true) {
      const {done, value} = await Promise.race([reader.read(), expired])
      if (done) break
      size += value.length
      if (size > 12000) throw new Error('Request too large')
      chunks.push(value)
    }
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } finally { clearTimeout(timeout); void reader.cancel().catch(() => {}); reader.releaseLock() }
}
