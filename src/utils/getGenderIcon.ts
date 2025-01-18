export function getGenderIcon(gender: string) {
  if (gender === 'male' || gender === 'masculino') {
    return `gender-male`
  }
  if (gender === 'female' || gender === 'feminino') {
    return `gender-female`
  }
  if (gender === 'ambos' || gender === 'all') {
    return `gender-intersex`
  }
  return `gender-female`
}
