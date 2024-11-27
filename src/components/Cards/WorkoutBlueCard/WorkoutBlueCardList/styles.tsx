import styled from 'styled-components/native'
import { FlatList, FlatListProps } from 'react-native'

interface ExercicesProps {
  id: string
  serie: string
  name: string
  dia: string
  data: string
}

export const ItemSeparatorComponent = styled.View`
  height: 16px;
`

export const ListFooterComponent = styled.View`
  height: 320px;
`

export const WorkoutBlueCardList = styled(
  FlatList as new (
    props: FlatListProps<ExercicesProps>,
  ) => FlatList<ExercicesProps>,
)``
