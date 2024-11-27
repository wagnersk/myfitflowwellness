import React from 'react'
import { PersonalsCardItem } from '../PersonalsCardItem'

import { Container } from './styles'
import { IPersonal } from '@hooks/authTypes'
import { FlatList, View } from 'react-native'

interface dataProps {
  data: IPersonal[]
  handleNextStep: (data: IPersonal) => void
}

export function PersonalsCardList({ data, handleNextStep }: dataProps) {
  return (
    <Container>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <PersonalsCardItem
            data={item}
            handleNextStep={() => handleNextStep(item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </Container>
  )
}
