export function getTrimmedName(length: number, name?: string) {
  if (!name) {
    return
  }

  const trimmedName =
    name?.length > length ? name?.substring(0, length - 3) + '...' : name

  return trimmedName
}
