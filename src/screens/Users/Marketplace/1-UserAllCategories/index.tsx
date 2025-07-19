import React, { useCallback, useEffect } from 'react'
import { Alert, BackHandler, View } from 'react-native'

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
  BioInfoLetter,
  BodyImageContainer,
} from './styles'

import { FlatList } from 'react-native-gesture-handler'
import { ICachedWorkoutsWithLastUpdatedTimestamp } from '@hooks/authTypes'
import { IWorkoutCategory } from '@src/@types/navigation'
import { BackButton } from '@components/Buttons/BackButton'

export function UserAllCategories() {
  const navigation = useNavigation()

  const {
    workoutsCategories,
    loadWorkouts,
    loadCachedWorkouts,
    saveWorkouts,
    loadWorkoutsCategories,
    contract,
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

  function handlePreferencesStep() {
    // jogar pra dentro do meu treino
    navigation.navigate('userPrefferences')
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
  function handleGoBack() {
    navigation.getParent()!.setOptions({ tabBarStyle: { display: 'flex' } })
    navigation.goBack()
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
        tabBarStyle: { display: 'none' },
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
          <BackButton
            onPress={handleGoBack}
            style={{ position: 'absolute', left: 32, bottom: 32 }}
          />
          <BioInfo>
            <BioInfoLetter>
              {user?.selectedLanguage === 'pt-br' ? `Categorias` : `Categories`}
            </BioInfoLetter>
          </BioInfo>
        </BioInfoWrapper>
      </HeaderImageBackground>
      <BodyImageContainer>
        <BodyImageBackground />

        {!contract?.submissionApproved && (
          <View style={{ height: '100%', paddingTop: 32 }}>
            <FlatList
              contentContainerStyle={{
                padding: 16,
              }}
              data={filteredByActiveWorkoutCategoriesList}
              renderItem={({ item }) => (
                <WorkoutsCategoriesCardList
                  item={item}
                  handleNextStep={handleWorkouts}
                />
              )}
              keyExtractor={(item, i) => i.toString()}
              numColumns={3}
              showsVerticalScrollIndicator={true}
              ItemSeparatorComponent={() => <View style={{ height: 32 }} />}
            />
          </View>
        )}
      </BodyImageContainer>
    </Container>
  )
}
