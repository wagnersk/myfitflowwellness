import React, { useCallback, useEffect } from 'react'
import { Alert, BackHandler, Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useRoute, useFocusEffect } from '@react-navigation/native'

import { useNavigation } from '@react-navigation/core'
import { setStatusBarStyle, StatusBar } from 'expo-status-bar'

import { BackCircleButton } from '@components/Buttons/BackCircleButton'
import { BodyImageBackground } from '@components/ImageBackgrounds/BodyImageBackground'
import { CTAButton } from '@components/Buttons/CTAButton'

import { Image } from 'expo-image'

import {
  Container,
  BackButtonWrapper,
  BodyImageContainer,
  PhotoImageWrapper,
  BodyInfo,
  InfoDescriptionWrapper,
  TitleWrapper,
  BodyBottomWrapper,
  BlurViewWrapper,
  SubTitle,
  Wrapper,
  Title,
  TitleWorkout,
} from './styles'
import { useAuth } from '@hooks/auth'
import { IMarketPlacePersonalsDetailNavigation } from '@src/@types/navigation'
import { IPersonal } from '@hooks/authTypes'

export function MarketPlacePersonalsDetail() {
  const navigation = useNavigation()
  const route = useRoute()

  const dataParam = route.params as IMarketPlacePersonalsDetailNavigation
  const {
    createNewContractWithPersonalUpdateUserClientId,
    cancelNewContractWithPersonalUpdateUserClientId,
    isWaitingApiResponse,
    contract,
    user,
    userPersonalTrainerContract,
  } = useAuth()

  function handleGoBack() {
    navigation.getParent()!.setOptions({ tabBarStyle: { display: 'flex' } })
    navigation.goBack()
  }
  /*   dataParam.data.personalTrainerContractId ===
              user?.personalTrainerContractId */

  async function handleChoose(data: IPersonal) {
    contract?.submissionPending
      ? await checkIfAlreadyHavePendingRequest()
      : await choose()

    async function checkIfAlreadyHavePendingRequest() {
      if (!userPersonalTrainerContract) return
      if (!user) return
      const { clientId, personalTrainerContractId } =
        userPersonalTrainerContract
      if (!clientId) return
      if (!personalTrainerContractId) return

      Alert.alert(
        user.selectedLanguage === 'pt-br' ? 'Atenção' : 'Attention',
        user.selectedLanguage === 'pt-br'
          ? 'Você já possui um convite em aberto para outro personal trainer, deseja cancelar o outro personal?'
          : 'You already have an open invitation for another personal trainer, do you want to cancel the other personal?',
        [
          {
            text: user.selectedLanguage === 'pt-br' ? 'Cancelar' : 'Cancel',
            onPress: () => {},
          },
          {
            text: user.selectedLanguage === 'pt-br' ? 'Confirmar' : 'Confirm',
            onPress: async () =>
              await cancelNewContractWithPersonalUpdateUserClientId(
                personalTrainerContractId,
                clientId,
              ).then(async () => {
                // const loadPersonalTrainerClientContract: (contractId: string, clientId: string) => Promise<void>
                // hook que busca dados aqui do contract
              }),
          },
        ],
      )
    }

    async function choose() {
      if (!user) return

      const { personalTrainerContractId } = data

      Alert.alert(
        user.selectedLanguage === 'pt-br'
          ? 'Confirmar Envio de Convite'
          : 'Confirm Invitation Sending',
        user.selectedLanguage === 'pt-br'
          ? 'Deseja realmente enviar o convite para este personal trainer?'
          : 'Do you really want to send the invitation to this personal trainer?',
        [
          {
            text: user.selectedLanguage === 'pt-br' ? 'Cancelar' : 'Cancel',
            onPress: () => {},
          },
          {
            text: user.selectedLanguage === 'pt-br' ? 'Confirmar' : 'Confirm',
            onPress: async () =>
              await createNewContractWithPersonalUpdateUserClientId(
                personalTrainerContractId,
                dataParam.data,
              ).then(async () => {
                navigation.navigate('marketPlacePersonalsList')

                // hook que busca dados aqui do contract
              }),
          },
        ],
      )
    }
  }

  async function handleCancelRequest() {
    return
    if (!user) return
    const { clientId, personalTrainerContractId } = user
    if (!clientId) return
    if (!personalTrainerContractId) return

    Alert.alert(
      user.selectedLanguage === 'pt-br'
        ? 'Confirmar Cancelamento de Convite'
        : 'Confirm Invitation Cancellation',
      user.selectedLanguage === 'pt-br'
        ? 'Tem certeza de que deseja cancelar o convite enviado para este personal trainer?'
        : 'Are you sure you want to cancel the invitation sent to this personal trainer?',
      [
        {
          text: user.selectedLanguage === 'pt-br' ? 'Não' : 'No',
          onPress: () => {},
        },
        {
          text: user.selectedLanguage === 'pt-br' ? 'Confirmar' : 'Confirm',
          onPress: async () =>
            await cancelNewContractWithPersonalUpdateUserClientId(
              personalTrainerContractId,
              clientId,
            ).then(async () => {
              // const loadPersonalTrainerClientContract: (contractId: string, clientId: string) => Promise<void>
              navigation.navigate('marketPlacePersonalsList')

              // hook que busca dados aqui do contract
            }),
        },
      ],
    )
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })
  }, [])
  /* 
      if(personalTrainerContractId,clientId){
        await loadPersonalTrainerClientContract(personalTrainerContractId,clientId)
      }
      */
  //
  const { height } = Dimensions.get('window')

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()!.setOptions({ tabBarStyle: { display: 'none' } })
      setStatusBarStyle('dark')
    }, []),
  )

  const formattedKeywords = dataParam.data.keywords.reduce(
    (acc, item, index) => {
      return acc + (index > 0 ? ', ' : '') + item
    },
    '',
  )

  const buttonTextMessage =
    contract?.submissionPending &&
    dataParam.data.personalTrainerContractId ===
      userPersonalTrainerContract?.personalTrainerContractId
      ? 'Cancelar convite'
      : 'Enviar convite'

  return (
    <Container>
      <StatusBar
        backgroundColor="transparent"
        style="dark"
        translucent
        animated
      />
      <ScrollView>
        <BodyImageContainer>
          <BodyImageBackground />
          <PhotoImageWrapper>
            <Image
              source={{
                uri: dataParam.data.photo,
              }}
              alt=""
              contentFit="cover"
              style={{
                width: '100%',
                height: height / 2.4,
                borderRadius: 8,
                backgroundColor: `gray`,
              }}
              cachePolicy={'memory-disk'}
            />

            <BackButtonWrapper>
              <BackCircleButton onPress={handleGoBack} changeColor />
            </BackButtonWrapper>
          </PhotoImageWrapper>

          <BodyInfo>
            <Wrapper>
              <TitleWrapper>
                <TitleWorkout>
                  {dataParam.data.name}, {dataParam.data.age}
                </TitleWorkout>
              </TitleWrapper>

              <TitleWrapper>
                <Title>Personal Trainer</Title>
              </TitleWrapper>
            </Wrapper>
            <InfoDescriptionWrapper>
              <Title>
                ESPECIALISTA: <SubTitle>{formattedKeywords}</SubTitle>
              </Title>
            </InfoDescriptionWrapper>
            <InfoDescriptionWrapper>
              <SubTitle>{dataParam.data.about}</SubTitle>
            </InfoDescriptionWrapper>
          </BodyInfo>
        </BodyImageContainer>
      </ScrollView>
      <BodyBottomWrapper>
        <BlurViewWrapper
          intensity={30}
          tint="light"
          style={{ paddingLeft: 32, paddingRight: 32 }}
        >
          <CTAButton
            style={{
              marginBottom: 52,
              width: '100%',
              opacity:
                contract?.submissionPending &&
                dataParam.data.personalTrainerContractId ===
                  userPersonalTrainerContract?.personalTrainerContractId
                  ? 0.7
                  : 1,
            }}
            onPress={() => {
              contract?.submissionPending &&
              dataParam.data.personalTrainerContractId ===
                userPersonalTrainerContract?.personalTrainerContractId
                ? handleCancelRequest()
                : handleChoose(dataParam.data)
            }}
            /* bigSize={true} */
            changeColor
            title={buttonTextMessage}
            loading={false}
            enabled={true}
            disabled={isWaitingApiResponse}
          />
        </BlurViewWrapper>
      </BodyBottomWrapper>
    </Container>
  )
}
