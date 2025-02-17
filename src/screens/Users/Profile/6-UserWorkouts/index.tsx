import React, { useEffect, useState } from 'react'
import { ImageBackground, BackHandler, SafeAreaView } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { BackButton } from '@components/Buttons/BackButton'
import { useAuth } from '@hooks/auth'
import backgroundImg from '../../../../../assets/back.png'

import {
  Container,
  Body,
  BodyImageWrapper,
  ImageBackgroundContainer,
  SettingsWrapper,
  ButtonWrapper,
  UserName,
  ListWrapper,
  ContentWrapper,
  IconWrapper,
  CardTitle,
  ContainerWrapper,
  ContainerTittle,
  MonthYearACTMessage,
  ToggleButtonWrapper,
  ToggleButton,
  ToggleButtonText,
  FakeBackgroundWrapper,
  ButtonContainer,
  CardsWrapper,
  ContainerTittleWrapper,
  MonthYearACTMessageText,
  CardSubTittle,
} from './styles'
import { ScrollView } from 'react-native-gesture-handler'
import { IptBrUs } from '@hooks/authTypes'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { PlanCard } from './Components/PlanCard'

export interface IUserSelect {
  id: number
  tittle: IptBrUs
  byWeekNumber?: number
  bySessionRangeNumber?: number[]
  selected: boolean
}

export function UserWorkouts() {
  const { user, isWaitingApiResponse, myWorkout, myWorkoutDataArray } =
    useAuth()
  const [selectedPlan, setSelectedPlan] = useState<'mensal' | 'anual'>('mensal')
  console.log(` myWorkout`, myWorkout?.workoutId)
  console.log(`  myWorkoutDataArray `, myWorkoutDataArray?.workoutId)
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }
  useEffect(() => {
    navigation.getParent()!.setOptions({ tabBarStyle: { display: 'none' } })

    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })
  }, [])

  return (
    <Container>
      <BodyImageWrapper>
        <ImageBackground
          source={backgroundImg}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <ImageBackgroundContainer>
            <SafeAreaProvider style={{ width: `100%` }}>
              <SafeAreaView style={{ flex: 1 }}>
                <SettingsWrapper>
                  <BackButton
                    onPress={handleGoBack}
                    changeColor
                    disabled={isWaitingApiResponse}
                  />
                </SettingsWrapper>

                <Body>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <ListWrapper>
                      <ContainerWrapper>
                        <ContainerTittleWrapper>
                          <ContainerTittle>Meus Treinos</ContainerTittle>
                        </ContainerTittleWrapper>

                        <MonthYearACTMessage>
                          <MonthYearACTMessageText>
                            ATIVOS
                          </MonthYearACTMessageText>
                        </MonthYearACTMessage>

                        <CardsWrapper>
                          <PlanCard
                            type={'neutral'}
                            title={'Plano Free'}
                            description1={
                              'Acesso básico aos treinos. Ideal para quem está começando.'
                            }
                            description2={'Acesso limitado a funcionalidades.'}
                            onPress={() => {}}
                          />
                          <PlanCard
                            type={'positive'}
                            title={
                              user?.selectedLanguage === 'pt-br'
                                ? 'Plano Premium'
                                : 'Premium Plan'
                            }
                            description1={
                              user?.selectedLanguage === 'pt-br'
                                ? 'Acesso completo com treinos personalizados.'
                                : 'Full access with personalized workouts.'
                            }
                            description2={
                              user?.selectedLanguage === 'pt-br'
                                ? 'Suporte 24/7 e todas as funcionalidades.'
                                : '24/7 support and all features.'
                            }
                            onPress={() => {}}
                          />
                        </CardsWrapper>
                      </ContainerWrapper>
                    </ListWrapper>
                  </ScrollView>
                </Body>
              </SafeAreaView>
            </SafeAreaProvider>
          </ImageBackgroundContainer>
        </ImageBackground>
      </BodyImageWrapper>
    </Container>
  )
}
