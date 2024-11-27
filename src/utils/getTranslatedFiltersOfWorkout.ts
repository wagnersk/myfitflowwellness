import {
  FilterItem,
  FinalDataItem,
  IEquipamentsFilters,
} from '@hooks/authTypes'

export function getTranslatedFiltersOfWorkout(
  cardExerciseFilters: IEquipamentsFilters | undefined,
  SELECTEDLANGUAGE: 'pt-br' | 'us',
) {
  if (!cardExerciseFilters) return []

  const translated = [
    {
      'pt-br': 'barra',
      us: 'bar',
      groupNamePtBr: 'Livre',
      groupNameUs: 'Free',
    },
    {
      'pt-br': 'banco',
      us: 'bench',
      groupNamePtBr: 'Livre',
      groupNameUs: 'Free',
    },
    {
      'pt-br': 'anilha',
      us: 'weight',
      groupNamePtBr: 'Livre',
      groupNameUs: 'Free',
    },
    {
      'pt-br': 'outros',
      us: 'other',
      groupNamePtBr: 'Livre',
      groupNameUs: 'Free',
    },
    {
      'pt-br': 'polia',
      us: 'pulley',
      groupNamePtBr: 'Polia',
      groupNameUs: 'Pulley',
    },
    {
      'pt-br': 'puxadores polia',
      us: 'pulleyHandles',
      groupNamePtBr: 'Polia',
      groupNameUs: 'Pulley',
    },
    {
      'pt-br': 'máquina',
      us: 'machine',
      groupNamePtBr: 'Máquina',
      groupNameUs: 'Machine',
    },
  ]

  const result = Object.entries(cardExerciseFilters).reduce<FilterItem[]>(
    (acc, [key, value]) => {
      const items = value.map((item) => item[SELECTEDLANGUAGE]).join(', ')

      const formattedKey = translated.find((__item) => __item.us === key)

      if (formattedKey) {
        acc.push({
          key: formattedKey[SELECTEDLANGUAGE].toLocaleUpperCase(),
          value: items,
          group:
            SELECTEDLANGUAGE === 'pt-br'
              ? formattedKey.groupNamePtBr
              : formattedKey.groupNameUs,
        })
      }

      return acc // Retorna o acumulador se não encontrar a chave
    },
    [],
  )
  const auxFormattedResult: FinalDataItem[] = []

  result.forEach((v) => {
    const indexAux = auxFormattedResult.findIndex(
      (_aux) => v.group === _aux.group,
    )

    const newGroup = indexAux === -1

    const fdata = { key: v.key, value: v.value }

    if (newGroup) {
      auxFormattedResult.push({
        group: v.group,
        data: [fdata],
      })
    }
    if (!newGroup) {
      const copyAux = auxFormattedResult[indexAux]

      copyAux.data.push(fdata)

      auxFormattedResult[indexAux] = copyAux
    }
  })

  /* return result.trim() // Remove espaços em branco extras no final */
  return auxFormattedResult
}
