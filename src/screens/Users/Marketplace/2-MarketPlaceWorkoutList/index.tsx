import React, { useCallback, useEffect } from 'react'
import { BackHandler } from 'react-native'

import { useFocusEffect, useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/core'
import { setStatusBarStyle } from 'expo-status-bar'
import { FlatList } from 'react-native-gesture-handler'

import { BackButton } from '@components/Buttons/BackButton'
import { HeaderImageBackground } from '@components/ImageBackgrounds/HeaderImageBackground'
import { BodyImageBackground } from '@components/ImageBackgrounds/BodyImageBackground'
import { WorkoutsCardList } from '@components/Cards/WorkoutsCard/WorkoutsCardList'

import {
  Container,
  BioInfoWrapper,
  BioInfo,
  BioInfoLetter,
  BodyImageContainer,
  BioInfoSubtitle,
} from './styles'
import { IMyfitflowWorkoutInUse } from '@hooks/authTypes'
import { IMarketPlaceWorkoutListNavigation } from '@src/@types/navigation'
import { useAuth } from '@hooks/auth'

export function MarketPlaceWorkoutList() {
  const { user } = useAuth()

  const selectedLanguage = user?.selectedLanguage
  const navigation = useNavigation()

  const route = useRoute()

  const dataParams = route.params as IMarketPlaceWorkoutListNavigation

  function handleGoBack() {
    navigation.getParent()!.setOptions({ tabBarStyle: { display: 'flex' } })
    navigation.goBack()
  }

  async function handleNextStep(data: IMyfitflowWorkoutInUse) {
    const newDataWithCategoryNameFromProps = {
      data,
    }
    const enableSyncDataAndShare = false

    navigation.navigate('marketPlaceWorkoutDetail', {
      ...newDataWithCategoryNameFromProps,
      enableSyncDataAndShare,
    })
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })
  }, [])

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()!.setOptions({
        tabBarStyle: { display: 'none' },
        tabBarHideOnKeyboard: false,
      })
      setStatusBarStyle('light')
    }, []),
  )

  const filteredByActiveWorkoutList = dataParams
    ? dataParams.data.filter((v) => v.workoutActive)
    : []
  return (
    <Container>
      <HeaderImageBackground>
        <BioInfoWrapper>
          <BackButton
            onPress={handleGoBack}
            style={{ position: 'absolute', left: 32, bottom: 32 }}
          />
          {selectedLanguage && (
            <BioInfo>
              <BioInfoLetter>
                {user?.selectedLanguage === 'pt-br' ? `Treinos` : `Workouts`}
              </BioInfoLetter>
              <BioInfoSubtitle>
                {user?.selectedLanguage === 'pt-br'
                  ? `Categorias`
                  : `Categories`}
                :{' '}
                {
                  dataParams.selectedCategoryData.workoutCategoryName[
                    selectedLanguage
                  ]
                }
              </BioInfoSubtitle>
            </BioInfo>
          )}
        </BioInfoWrapper>
      </HeaderImageBackground>
      <BodyImageContainer>
        <BodyImageBackground />
        <FlatList
          data={filteredByActiveWorkoutList}
          renderItem={({ item, index }) => (
            <WorkoutsCardList
              index={index}
              item={item}
              handleNextStep={handleNextStep}
            />
          )}
          keyExtractor={(item, i) => i.toString()}
          showsVerticalScrollIndicator={true} // Para mostrar a barra de rolagem vertical
        />
      </BodyImageContainer>
    </Container>
  )
}
