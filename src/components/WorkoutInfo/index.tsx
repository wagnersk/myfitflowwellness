import React from 'react'

import { Container, Title, Description } from './styles'
import { useAuth } from '@hooks/auth'

interface Props {
  title: string | number
  description?: string | number
  descriptionArray?: string[]
  descriptionSequenceArray?: {
    id: number
    label: string
  }[]
}

export function WorkoutInfo({
  title,
  descriptionArray,
  descriptionSequenceArray,
  description,
}: Props) {
  const { user } = useAuth()

  function formatName(nameArray?: string[] | undefined) {
    if (nameArray === undefined) return
    if (!user) return
    const selectedLanguage = user.selectedLanguage

    let formattedName = ''

    nameArray?.forEach((nameArray) => {
      if (nameArray === 'freeEquipament') {
        formattedName = selectedLanguage === 'pt-br' ? 'Livre' : 'Free'
        return
      }

      if (nameArray === 'pulleyEquipament') {
        formattedName = selectedLanguage === 'pt-br' ? 'Polia' : 'Pulley'
        return
      }
      if (nameArray === 'machineEquipament') {
        formattedName = selectedLanguage === 'pt-br' ? 'Máquina' : 'Machine'
      }

      formattedName = nameArray
    })

    return formattedName
  }

  return (
    <Container>
      <Title>{title}: </Title>
      <Description>{description && description}</Description>

      <Description>
        {
          formatName(descriptionArray)
          /*    descriptionArray && descriptionArray.map((v) => !!v && ), */
        }
      </Description>

      <Description>
        {
          descriptionSequenceArray &&
            descriptionSequenceArray
              .reduce((acc, curr) => {
                return acc + `${curr.id + 1} - ${curr.label}, `
              }, '')
              .slice(0, -2) // Remove a última vírgula

          /*   {formattedSequence} */
        }
      </Description>
    </Container>
  )
}
