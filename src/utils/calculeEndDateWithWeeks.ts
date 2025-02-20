import { format, addWeeks } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDateToDDMMYYYY(date: Date): string {
  return format(date, 'dd/MM/yyyy', { locale: ptBR })
}

export function addWeeksToTimestamp(timestamp: number, weeks: number): number {
  const date = new Date(timestamp)
  const futureDate = addWeeks(date, weeks)
  return futureDate.getTime()
}
