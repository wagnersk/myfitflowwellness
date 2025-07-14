import React, { useCallback, useEffect } from 'react'
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
  BioInfoLetter,
  BodyImageContainer,
} from './styles'

import { IPersonal } from '@hooks/authTypes'
import { PersonalsCardList } from '@components/Cards/PersonalsCard/PersonalsCardList'
import { BackButton } from '@components/Buttons/BackButton'

export function MarketPlacePersonalsList() {
  const navigation = useNavigation()

  const { personalsList, loadPersonalsList } = useAuth()

  function handleGoBack() {
    navigation.getParent()!.setOptions({ tabBarStyle: { display: 'flex' } })
    navigation.goBack()
  }

  function handleNextStep(data: IPersonal) {
    navigation.navigate('marketPlacePersonalsDetail', { data })
  }

  useEffect(() => {
    start()

    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })

    async function start() {
      await loadPersonalsList()
    }
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

  return (
    <Container>
      <StatusBar
        backgroundColor="transparent"
        style="light"
        translucent
        animated
      />
      <HeaderImageBackground>
        <BioInfoWrapper>
          <BackButton
            onPress={handleGoBack}
            style={{ position: 'absolute', left: 32, bottom: 40 }}
          />
          <BioInfo>
            <BioInfoLetter>Personals Trainers</BioInfoLetter>
          </BioInfo>
        </BioInfoWrapper>
      </HeaderImageBackground>
      <BodyImageContainer>
        <BodyImageBackground />

        {personalsList && (
          <PersonalsCardList
            data={personalsList}
            handleNextStep={handleNextStep}
          />
        )}
      </BodyImageContainer>
    </Container>
  )
}
