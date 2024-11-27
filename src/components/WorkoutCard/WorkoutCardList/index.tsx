import React from 'react'
import { useWindowDimensions } from 'react-native'
import { WorkoutCardItem } from '../WorkoutCardItem'
import { useTheme } from 'styled-components/native'

import { ListBorderSeparatorComponent } from './styles'

import Animated from 'react-native-reanimated'
import { IFormattedCardExerciseData } from '@hooks/authTypes'

interface DataProps {
  data: IFormattedCardExerciseData[]
  handleNextStep: (item: IFormattedCardExerciseData) => void
}

export function WorkoutCardList({ data, handleNextStep }: DataProps) {
  const { width } = useWindowDimensions()
  const theme = useTheme()

  type ListItemProps = {
    item: IFormattedCardExerciseData
    index: number
  }
  return (
    <Animated.FlatList
      style={{
        width,
        height: '100%',
        marginTop: 40,
        paddingRight: 32,
        paddingLeft: 32,
        borderRadius: 12,
      }}
      contentContainerStyle={{
        borderWidth: 2,
        borderRadius: 12,
        borderColor: theme.COLORS.BLUE_STROKE,
      }}
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(_, index) => index.toString()}
      ItemSeparatorComponent={ListBorderSeparatorComponent}
      renderItem={({ item, index }: ListItemProps) => {
        const isEnd = index === data.length - 1

        return (
          <WorkoutCardItem
            item={item}
            onPress={() => handleNextStep(item)}
            index={index}
            isEnd={isEnd}
          />
        )
      }}
    />
  )
}
