import React, { useCallback, useEffect } from 'react'
import { Alert, BackHandler, View, Text } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/core'
import { setStatusBarStyle } from 'expo-status-bar'

import { HeaderImageBackground } from '@components/ImageBackgrounds/HeaderImageBackground'
import { BodyImageBackground } from '@components/ImageBackgrounds/BodyImageBackground'
import { WorkoutsCategoriesCardList } from '@components/Cards/WorkoutsCategoriesCard/WorkoutsCategoriesCardList'
import { useAuth } from '@hooks/auth'

import {
  Container,
  BioInfoWrapper,
  BioInfo,
  Tittle,
  BioInfoLetter,
  BodyImageContainer,
  CategoriesWrapper,
  MyWorkoutWrapper,
  WorkoutInfoHomeCardWrapper,
  BlurViewWrapper,
  CallTeacherButton,
  CallTeacherButtonText,
  CallTeacherWrapper,
  CallTeacherTitleWrapper,
  CallTeacherTitle,
  CallButtonWrapper,
  MyWorkoutTittleWrapper,
} from './styles'
import { FlatList } from 'react-native-gesture-handler'
import { ICachedWorkoutsWithLastUpdatedTimestamp } from '@hooks/authTypes'
import { CTAButton } from '@components/Buttons/CTAButton'
import { Photo } from '@components/Photo'
import { WhatsappButton } from '@components/Buttons/WhatsappButton'
import { IWorkoutCategory } from '@src/@types/navigation'
import { SettingsButton } from '@components/Buttons/SettingsButton'
import { WorkoutsCardItem } from '@components/Cards/WorkoutsCard/WorkoutsCardItem'

export function MarketPlaceHome() {
  const navigation = useNavigation()

  const {
    workoutsCategories,
    loadWorkouts,
    loadCachedWorkouts,
    myWorkout,
    saveWorkouts,
    loadWorkoutsCategories,
    loadPersonalTrainerClientContract,
    cancelNewContractWithPersonalUpdateUserClientId,
    contract,
    personalData,
    user,
  } = useAuth()

  //
  async function handleWorkouts(selectedCategoryData: IWorkoutCategory) {
    const { lastWorkoutUpdatedAt, workoutCategoryId } = selectedCategoryData // acabou de vir da api , vou me basear aqui pra saber o q existe ainda la para replicar aqui

    if (!lastWorkoutUpdatedAt || !workoutCategoryId) return

    await loadCachedWorkouts(workoutCategoryId).then(
      async (_cachedWorkouts) => {
        if (_cachedWorkouts) {
          /*           const cachedWorkoutsLastUpdatedAt =
            _cachedWorkouts.cachedLastWorkoutUpdatedAt.seconds * 1000 +
            _cachedWorkouts.cachedLastWorkoutUpdatedAt.nanoseconds / 1000000 */

          if (lastWorkoutUpdatedAt.toMillis() > _cachedWorkouts.lastUpdatedAt) {
            // testar se funciona bem dentro do if , caso nao isolar em variavel

            await loadSaveWorkoutsAndGoNextScreen(selectedCategoryData)
          } else {
            await nextScreen(_cachedWorkouts, selectedCategoryData)
          }
        }

        if (!_cachedWorkouts) {
          await loadSaveWorkoutsAndGoNextScreen(selectedCategoryData)
        }
      },
    )

    async function loadSaveWorkoutsAndGoNextScreen(
      selectedCategoryData: IWorkoutCategory,
    ) {
      if (!workoutCategoryId) return
      await loadWorkouts(workoutCategoryId).then(
        async (workoutsWithUpdatedAt) => {
          if (!workoutsWithUpdatedAt)
            return Alert.alert(
              user?.selectedLanguage === 'pt-br'
                ? 'Lista de treinos não encontrada'
                : 'Workout list not found',
            )
          if (workoutsWithUpdatedAt.data.length > 0) {
            await saveWorkouts(workoutCategoryId, workoutsWithUpdatedAt)
          }

          const nextScreenData = {
            ...workoutsWithUpdatedAt,
            selectedCategoryData,
          }

          navigation.navigate('marketPlaceWorkoutList', nextScreenData)
        },
      )
    }

    async function nextScreen(
      cachedWorkouts: ICachedWorkoutsWithLastUpdatedTimestamp,
      selectedCategoryData: IWorkoutCategory,
    ) {
      navigation.navigate('marketPlaceWorkoutList', {
        ...cachedWorkouts,
        selectedCategoryData,
      })
    }
  }

  function handleNextScreen() {
    console.log(`Next Screen Pressed`)
    navigation.navigate('marketPlacePersonalsList')
    /* 
    const workoutDataWithSelectedWorkout: WorkoutDataWithSelectedWorkout = {
      workoutId,
      data,
      workoutLength,
      selectedWorkoutExerciseIndex: selectedData?.workoutExerciseIndex,
      muscleGroupsLabel,
      letter,
      cardIndex,
    }
 */
  }
  function handlePreferencesStep() {
    // jogar pra dentro do meu treino
    navigation.navigate('userPrefferences')
  }
  function handleCallTeacherWhatsapp() {
    if (!user) return
    Alert.alert(
      user.selectedLanguage === 'pt-br' ? 'Opa' : 'Oops',
      user.selectedLanguage === 'pt-br'
        ? 'Essa funcionalidade será implementada em breve...'
        : 'This feature will be implemented soon...',
    )
    console.log('Chamar Professor no whatsapp usando a API')
  }

  useEffect(() => {
    startCategories()

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

  const categoryToRemoveIfArentGuest = { 'pt-br': 'convidado', us: 'guest' }

  const categoriesWithoutGuest = workoutsCategories
    ? workoutsCategories.filter(
        (v) =>
          v.workoutCategoryName_insensitive['pt-br'] !==
            categoryToRemoveIfArentGuest['pt-br'] &&
          v.workoutCategoryName_insensitive.us !==
            categoryToRemoveIfArentGuest.us,
      )
    : []

  const categoriesGuestUserOrNo = user?.anonymousUser
    ? workoutsCategories
    : categoriesWithoutGuest

  const filteredByActiveWorkoutCategoriesList = categoriesGuestUserOrNo
    ? categoriesGuestUserOrNo.filter((v) => v.workoutCategoryActive)
    : []

  return (
    <Container>
      <HeaderImageBackground>
        <BioInfoWrapper>
          <BioInfo>
            <BioInfoLetter>
              {contract?.submissionApproved && `Personal Trainer`}
              {!contract?.submissionApproved &&
              user?.selectedLanguage === 'pt-br'
                ? `Treinos`
                : `Workouts`}
            </BioInfoLetter>
          </BioInfo>

          <SettingsButton
            style={{ paddingTop: 32 }}
            onPress={handlePreferencesStep}
          />
        </BioInfoWrapper>
      </HeaderImageBackground>

      <BodyImageContainer>
        <BodyImageBackground />
        <MyWorkoutWrapper>
          <MyWorkoutTittleWrapper>
            <Tittle>Meu treino</Tittle>
          </MyWorkoutTittleWrapper>

          {myWorkout && (
            <WorkoutInfoHomeCardWrapper>
              <WorkoutsCardItem
                handleNextStep={() => handleWorkouts}
                data={myWorkout}
              />
            </WorkoutInfoHomeCardWrapper>
          )}
        </MyWorkoutWrapper>
        {!contract?.submissionApproved && (
          <View style={{ height: '100%' }}>
            <CategoriesWrapper>
              <Tittle>
                {user?.selectedLanguage === 'pt-br'
                  ? `Categorias`
                  : `Categories`}
              </Tittle>
            </CategoriesWrapper>
            <FlatList
              contentContainerStyle={{
                padding: 16,
              }}
              data={filteredByActiveWorkoutCategoriesList}
              renderItem={({ item }) => (
                <WorkoutsCategoriesCardList
                  item={item}
                  handleNextStep={handleWorkouts}
                  isGuestCategory={
                    item.workoutCategoryName_insensitive['pt-br'] ===
                      categoryToRemoveIfArentGuest['pt-br'] &&
                    item.workoutCategoryName_insensitive.us ===
                      categoryToRemoveIfArentGuest.us
                  }
                />
              )}
              keyExtractor={(item, i) => i.toString()}
              numColumns={3}
              showsVerticalScrollIndicator={true}
              ItemSeparatorComponent={() => <View style={{ height: 32 }} />}
            />

            {/* 
        
        obs se aprovou entao mostro as categorias mas n pode escolher nenhuma , apenas ler o texto p 
        valorizar o app



        -> mostrar card de senhado no ipad foto nome idade textoInformacao e tempo de contrato,
        como se o personal acompanhasse e desse feedback toda semana para o aluno

        ou uma IA dar esse feedback


        TODO ->


        desenhar telas de acordo com os requisitos que vou citar no fluxo do ipad
        e progaramar elas para ver as infos das delas do mobile treino/corpo/frequencia 
        adicionar o texto e tempo de contrato 

        mover botao whatsapp para tela criada da foto do personal

        

        alguma info a mais? dps descubro , deixar layouy clean



        ->

        */}
            {/* TODO , ATIVAR PERSONAL */}
            {false && (
              <View>
                <BlurViewWrapper
                  style={{
                    width: '100%',
                    marginTop: 12,
                    marginBottom: 32,
                    paddingLeft: 32,
                    paddingRight: 32,
                  }}
                  intensity={70}
                  tint="light"
                >
                  <CTAButton
                    onPress={handleNextScreen}
                    changeColor={true}
                    title="Quero evoluir mais rápido!"
                    style={{
                      width: '100%',
                      marginTop: 12,
                      marginBottom: 32,
                    }}
                  />
                </BlurViewWrapper>
              </View>
            )}
          </View>
        )}

        {contract?.submissionApproved && user?.selectedLanguage && (
          <View
            style={{
              flex: 1,
              height: '100%',
              padding: 32,
              gap: 32,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                gap: 16,
                alignItems: 'center',
              }}
            >
              <Photo
                defaultText={
                  user?.selectedLanguage === 'pt-br'
                    ? `Não há foto`
                    : `No Photo`
                }
                defaultPhotoBase64={personalData ? personalData.photo : ''}
              />
              <Text
                style={{
                  fontSize: 24,
                }}
              >
                {personalData?.name}, {personalData?.age}
              </Text>
            </View>

            <View>
              <Text>{`TEXTO DO DIA MOTIVACIONAL`}</Text>
            </View>

            <CallTeacherWrapper>
              <CallTeacherTitleWrapper>
                <CallTeacherTitle>Fale com o professor</CallTeacherTitle>
              </CallTeacherTitleWrapper>

              <WhatsappButton onPress={handleCallTeacherWhatsapp} />
            </CallTeacherWrapper>
          </View>
        )}
      </BodyImageContainer>
    </Container>
  )
}
