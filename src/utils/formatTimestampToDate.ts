export function formatTimestampToDate(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
