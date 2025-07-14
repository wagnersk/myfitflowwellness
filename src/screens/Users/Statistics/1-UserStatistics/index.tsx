import React, { useCallback, useEffect, useState } from 'react'
import { BackHandler } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/core'
import { setStatusBarStyle, StatusBar } from 'expo-status-bar'

import { HeaderImageBackground } from '@components/ImageBackgrounds/HeaderImageBackground'
import { BodyImageBackground } from '@components/ImageBackgrounds/BodyImageBackground'
import { useAuth } from '@hooks/auth'

import {
  Container,
  BioInfoWrapper,
  BioInfo,
  Tittle,
  BioInfoLetter,
  BodyImageContainer,
  CategoriesWrapper,
  SelectButton,
  SelectButtonWrapper,
  WorkoutsWrapper,
  BodyWrapper,
  FrequencyWrapper,
} from './styles'
/* import { WorkoutsStatistic } from './Components/StatisticWorkoutsComponent'
import { BodyStatistic } from './Components/StatisticBodyComponent' */
/* import { BodyStatistic } from './Components/BodyStatistic' */

export function UserStatistics() {
  const navigation = useNavigation()

  const { loadWorkoutsCategories, user } = useAuth()

  type ISelectedComponent = {
    componentInFocus: 'frequência' | 'treinos' | 'corpo'
  }
  const [selectComponent, setSelectComponent] = useState<ISelectedComponent>({
    componentInFocus: 'treinos',
  })
  useEffect(() => {
    // startCategories()

    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })

    async function startCategories() {
      await loadWorkoutsCategories()
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()!.setOptions({
        tabBarStyle: { display: 'flex' },
        tabBarHideOnKeyboard: false,
      })
      setStatusBarStyle('light')
    }, []),
  )

  return (
    <Container>
      <StatusBar
        backgroundColor="transparent"
        style="dark"
        translucent
        animated
      />
      <HeaderImageBackground>
        <BioInfoWrapper>
          <BioInfo>
            <BioInfoLetter>Estatísticas</BioInfoLetter>
          </BioInfo>
        </BioInfoWrapper>
      </HeaderImageBackground>
      <BodyImageContainer>
        <BodyImageBackground />

        <SelectButtonWrapper>
          <SelectButton
            onPress={() => {
              setSelectComponent({ componentInFocus: 'treinos' })
            }}
            selected={selectComponent.componentInFocus === 'treinos'}
          >
            <Tittle>
              {user?.selected === 'pt-br' ? 'Treinos' : 'Workouts'}
            </Tittle>
          </SelectButton>
          <SelectButton
            onPress={() => {
              setSelectComponent({ componentInFocus: 'corpo' })
            }}
            selected={selectComponent.componentInFocus === 'corpo'}
          >
            <Tittle>Corpo</Tittle>
          </SelectButton>

          <SelectButton
            onPress={() => {
              setSelectComponent({ componentInFocus: 'frequência' })
            }}
            selected={selectComponent.componentInFocus === 'frequência'}
          >
            <Tittle>Frequência</Tittle>
          </SelectButton>
        </SelectButtonWrapper>
        {/*     {selectComponent.componentInFocus === 'treinos' && (
          <WorkoutsStatistic />
        )}
 */}
        {/* 
        {selectComponent.componentInFocus === 'corpo' && <BodyStatistic />} */}
        {/* 
        {selectComponent.componentInFocus === 'frequência' && (
          <FrequencyWrapper />
        )} */}
      </BodyImageContainer>
    </Container>
  )
}
