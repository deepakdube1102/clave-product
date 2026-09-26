export function formatRelativeTime(iso: string, now = Date.now()): string {
  const minutes = Math.floor((now - new Date(iso).getTime()) / 60_000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} ${days === 1 ? 'day' : 'days'} ago`
  return new Date(iso).toLocaleDateString('en', { day: 'numeric', month: 'short', year: days > 300 ? 'numeric' : undefined })
}

export function postedLabel(daysAgo: number): string {
  if (daysAgo < 1) return 'Today'
  if (daysAgo < 7) return `${daysAgo}d ago`
  if (daysAgo < 30) return `${Math.floor(daysAgo / 7)}w ago`
  return `${Math.floor(daysAgo / 30)}mo ago`
}

export function postedLong(daysAgo: number): string {
  if (daysAgo < 1) return 'today'
  if (daysAgo === 1) return '1 day ago'
  if (daysAgo < 7) return `${daysAgo} days ago`
  const weeks = Math.floor(daysAgo / 7)
  if (daysAgo < 30) return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`
  const months = Math.floor(daysAgo / 30)
  return `${months} ${months === 1 ? 'month' : 'months'} ago`
}
