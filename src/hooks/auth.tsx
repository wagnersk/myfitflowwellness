/* eslint-disable camelcase */
import React, { createContext, useContext, useState, useEffect } from 'react'
import { Alert } from 'react-native'

import { firebaseApp, auth } from '../../firebase-config'

import { addDays, format, set } from 'date-fns'

import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  collection,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  getDocs,
  serverTimestamp,
  query,
  getFirestore,
  addDoc,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore'

import {
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  UserCredential,
} from 'firebase/auth'

import {
  ICachedWorkoutsWithLastUpdatedTimestamp,
  AuthContextData,
  AuthProviderProps,
  ICachedExerciseHistoryData,
  IFormattedCardExerciseData,
  IGraphicsValues,
  IWorkoutInfo,
  IWorkoutsData,
  SignInProps,
  IStatisticsItens,
  IUserWorkoutsLog,
  ICachedVideoTable,
  IWeightDoneLog,
  IWorkoutCardLogData,
  IWorkoutLog,
  IPersonal,
  IContract,
  IUserFormProps,
  IGoalSelectData,
  IMuscleSelectData,
  IUserGoal,
  IUserSessionsByWeek,
  IUserTimeBySession,
  IUserMuscleFocus,
  IFrequencybyweekSelectData,
  ITimeBySessionSelectData,
  ICachedExerciseList,
  IFreeSelectData,
  IPulleySelectData,
  IMachineSelectData,
  IMyfitflowWorkoutInUse,
  IUnconfirmedUserData,
  IPremiumUserContract,
  IWorkoutExercisesFirebase,
  ICachedCardExerciseData,
  IMyWorkouts,
  IMyWorkoutsData,
} from './authTypes'

import {
  IFreeSelectItem,
  IMachineSelectItem,
  IptBrUs,
  IPulleySelectItem,
} from './selectOptionsDataFirebaseTypes'
import { IWorkoutCategory } from '@src/@types/navigation'
import {
  addWeeksToTimestamp,
  formatDateToDDMMYYYY,
} from '@utils/calculeEndDateWithWeeks'

const db = getFirestore(firebaseApp)

const USER_SIGNIN_COLLECTION = '@myfitflow:signin'

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<SignInProps | null>(null)

  const [contract, setContract] = useState<IContract | null>(null)

  const [premiumUserContract, setPremiumUserContract] =
    useState<IPremiumUserContract | null>(null)

  const [personalsList, setPersonalsList] = useState<IPersonal[] | null>(null)
  const [workouts, setWorkouts] =
    useState<ICachedWorkoutsWithLastUpdatedTimestamp | null>(null)
  const [workoutsCategories, setWorkoutsCategories] = useState<
    IWorkoutCategory[] | null
  >([])

  const [myWorkout, setMyWorkout] = useState<IMyWorkouts | null>(null)
  const [myWorkoutDataArray, setMyWorkoutDataArray] =
    useState<IMyWorkoutsData | null>(null)

  const [graphicsValues, setGraphicsValues] = useState<
    IGraphicsValues[] | null
  >(null)

  const [statisticsItens, setStatisticsItens] = useState<
    IStatisticsItens[] | null
  >(null)
  const [personalData, setPersonalData] = useState<IPersonal | null>(null)
  const [cachedVideoTable, setCachedVideoTable] = useState<
    ICachedVideoTable[] | null
  >(null)

  const [cachedUserWorkoutsLog, setCachedUserWorkoutsLog] =
    useState<IUserWorkoutsLog | null>(null)

  const [cachedExerciseHistoryData, setCachedExerciseHistoryData] =
    useState<ICachedExerciseHistoryData | null>(null)

  const [weightProgression, setWeightProgression] = useState<
    ICachedExerciseHistoryData[] | null
  >(null)

  const [cachedWorkoutsExercises, setCachedWorkoutsExercises] =
    useState<ICachedExerciseList | null>(null)

  const [isLogging, setIsLogging] = useState(false)
  const [isWaitingApiResponse, setIsWaitingApiResponse] = useState(false)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(false)

  async function firebaseAnonymousSignUp(selectedLanguage: 'pt-br' | 'us') {
    setIsWaitingApiResponse(true)
    await signInAnonymously(auth)
      .then(async (account) => {
        const usersRef = collection(db, 'anonymousUsers')
        const updatedTime = serverTimestamp()

        const muscleFocus = {
          createdAt: updatedTime,
          updatedAt: updatedTime,
          muscleSelectedData: [
            {
              'pt-br': `equilibrado`,
              us: `balanced`,
            },
          ],
        }

        const freeData: IFreeSelectData = {
          createdAt: updatedTime,
          updatedAt: updatedTime,
          data: {
            barSelectData: [
              {
                bar_insensitive: { 'pt-br': 'todos', us: 'all' },
              },
            ],
            benchSelectData: [
              {
                bench_insensitive: { 'pt-br': 'todos', us: 'all' },
              },
            ],
            otherSelectData: [
              {
                other_insensitive: { 'pt-br': 'todos', us: 'all' },
              },
            ],
            weightSelectData: [
              {
                weight_insensitive: { 'pt-br': 'todos', us: 'all' },
              },
            ],
          },
        }

        const pulleyData: IPulleySelectData = {
          createdAt: updatedTime,
          updatedAt: updatedTime,
          data: {
            pulleyHandlerSelectData: [
              {
                pulleyHandler_insensitive: { 'pt-br': 'todos', us: 'all' },
              },
            ],
            pulleySelectData: [
              {
                pulley_insensitive: { 'pt-br': 'todos', us: 'all' },
              },
            ],
          },
        }

        const machineData: IMachineSelectData = {
          createdAt: updatedTime,
          updatedAt: updatedTime,
          data: {
            machineSelectData: [
              {
                machine_insensitive: { 'pt-br': 'todos', us: 'all' },
              },
            ],
          },
        }

        await setDoc(doc(usersRef, account.user.uid), {
          anabol: null,
          birthdate: null,
          clientId: null,
          createdAt: updatedTime,
          email: null,
          freeData,
          goal: null,
          gym: null,
          id: account.user.uid,
          isNewUser: true,
          machineData,
          muscleFocus,
          name: null,
          name_insensitive: null,
          personalPlanActive: false,
          photoBase64: '',
          premiumPlanActive: false,
          anonymousUser: true,
          pulleyData,
          restrictions: null,
          selectedLanguage,
          sessionsByWeek: null,
          submissionPending: false,
          timeBySession: null,
          updatedAt: updatedTime,
          whatsappNumber: null,
          whenStartedAtGym: '',
          personalTrainerContractId: null,
          personalTrainerId: null,
        })
          .then(() => {
            Alert.alert(
              user?.selectedLanguage === 'pt-br'
                ? 'Conta anônima criada com sucesso!'
                : 'Anonymous account created successfully!',
            )
            firebaseAnonymousSignIn(account.user.uid)
          })
          .catch((error) => {
            console.log(error.code)
          })
      })
      .catch((error) => {
        const { code } = error
        console.log(`code`, code)
        setIsWaitingApiResponse(false)

        Alert.alert(
          selectedLanguage === 'pt-br' ? 'Erro' : 'Error',
          selectedLanguage === 'pt-br'
            ? 'Não foi possível criar a conta anônima.'
            : 'Could not create an anonymous account.',
        )
      })
      .finally(() => {
        setIsWaitingApiResponse(false)
      })
  }

  async function firebaseAnonymousSignIn(uid: string) {
    setIsLogging(true)

    const userDocRef = doc(db, 'anonymousUsers', uid)
    const docSnap = await getDoc(userDocRef)

    if (docSnap.exists()) {
      const userData = docSnap.data() as SignInProps

      await AsyncStorage.setItem(
        USER_SIGNIN_COLLECTION,
        JSON.stringify(userData),
      )
      setUser(userData)

      loadLoginInitialCachedWorkoutsData(uid)
      setIsLogging(false)
    } else {
      Alert.alert(
        user?.selectedLanguage === 'pt-br'
          ? 'Login realizado'
          : 'Login successful',
        user?.selectedLanguage === 'pt-br'
          ? 'Porém não foi possível buscar os dados de perfil do usuário'
          : 'However, it was not possible to fetch the user profile data',
      )
    }
  }

  async function firebaseCreateUserAndSendEmailVerification(
    email: string,
    password: string,
  ) {
    setIsWaitingApiResponse(true)

    const sucess = createUserWithEmailAndPassword(auth, email, password)
      .then(async (account) => {
        await sendEmailVerification(account.user)
        Alert.alert(
          'Verificação de Email',
          'Um email de verificação foi enviado. Por favor, verifique seu email antes de continuar.',
        )
        return account.user.uid
      })

      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert(
            user?.selectedLanguage === 'pt-br'
              ? 'E-mail não disponível'
              : 'Email not available',
            user?.selectedLanguage === 'pt-br'
              ? 'Escolha outro e-mail para cadastrar!'
              : 'Choose another email to register!',
          )
          return null
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert(
            user?.selectedLanguage === 'pt-br'
              ? 'E-mail inválido!'
              : 'Invalid email!',
          )
          return null
        }

        if (error.code === 'auth/weak-password') {
          Alert.alert(
            user?.selectedLanguage === 'pt-br'
              ? 'A senha deve no mínimo 6 dígitos.'
              : 'The password must be at least 6 characters long.',
          )
          return null
        }
        return null
      })
      .finally(async () => {
        await signOut(auth)
        setIsWaitingApiResponse(false)
      })

    return sucess
  }

  async function saveNewUserTempUnconfirmedData(
    data: IUnconfirmedUserData,
    newUnconfirmedUserId: string,
  ) {
    if (!newUnconfirmedUserId) return

    const storageNewUnconfirmedKey = `@myfitflow:userlocaldata-unconfirmedUserData-${newUnconfirmedUserId}`

    if (data) {
      await AsyncStorage.setItem(storageNewUnconfirmedKey, JSON.stringify(data))
    }
  }

  async function loadNewUserTempUnconfirmedData(newUnconfirmedUserId: string) {
    if (!newUnconfirmedUserId) return null

    const storageNewUnconfirmedKey = `@myfitflow:userlocaldata-unconfirmedUserData-${newUnconfirmedUserId}`

    const userLocalData = await AsyncStorage.getItem(storageNewUnconfirmedKey)

    if (userLocalData) {
      const cachedUserLocalData = JSON.parse(
        userLocalData,
      ) as IUnconfirmedUserData
      return cachedUserLocalData
    } else {
      return null
    }
  }

  async function firebaseSignIn(
    email: string,
    password: string,
    selectedLanguage: 'pt-br' | 'us',
  ) {
    setIsLogging(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(async (account) => {
        const userDocRef = doc(db, 'users', account.user.uid)
        const docSnap = await getDoc(userDocRef)

        if (!account.user.emailVerified) {
          Alert.alert(
            'Verificação de Email',
            'Seu email não está verificado. Por favor, verifique seu email antes de continuar.',
          )
          await signOut(auth)
          setIsLogging(true)
        }

        if (docSnap.exists()) {
          const {
            anabol,
            birthdate,
            clientId,
            createdAt,
            email,
            freeData,
            goal,
            gym,
            id,
            isNewUser,
            machineData,
            muscleFocus,
            name,
            name_insensitive,
            premiumContractId,
            photoBase64,
            premiumPlanActive,

            pulleyData,
            restrictions,
            selectedLanguage,

            sessionsByWeek,
            submissionPending,
            timeBySession,
            updatedAt,
            whatsappNumber,
            whenStartedAtGym,

            personalTrainerContractId,
            personalTrainerId,
          } = docSnap.data() as SignInProps

          const userData: SignInProps = {
            anabol,
            birthdate,
            clientId,
            createdAt,
            email,
            freeData,
            goal,
            gym,
            id,
            isNewUser,
            machineData,
            muscleFocus,
            name,
            name_insensitive,
            photoBase64,
            premiumPlanActive,
            premiumContractId,

            pulleyData,
            restrictions,
            selectedLanguage,

            sessionsByWeek,
            submissionPending,
            timeBySession,
            updatedAt,
            whatsappNumber,
            whenStartedAtGym,

            personalTrainerContractId,
            personalTrainerId,

            anonymousUser: false,
          }
          await AsyncStorage.setItem(
            USER_SIGNIN_COLLECTION,
            JSON.stringify(userData),
          )

          setUser(userData)

          loadLoginInitialCachedWorkoutsData(id)
        } else {
          let userData: IUnconfirmedUserData | null =
            await loadNewUserTempUnconfirmedData(account.user.uid)

          if (!userData) {
            userData = {
              email,
              password,
              name: '',
              birthdate: '',
              selectedLanguage,
            }
          }

          await firebaseSignUpWithUserAndPopulateDatabase(
            account.user.uid,
            email,
            password,
            userData.name,
            userData.birthdate,
            userData.selectedLanguage,
          )
        }
      })
      .catch((error) => {
        const { code } = error

        if (code === 'auth/too-many-requests') {
          setIsLogging(false)

          return Alert.alert(
            selectedLanguage === 'pt-br' ? 'Login' : 'Login',
            selectedLanguage === 'pt-br'
              ? 'Você excedeu o limite de tentativas de autenticação. Por favor, aguarde um tempo antes de tentar novamente.'
              : 'You have exceeded the authentication attempt limit. Please wait a while before trying again.',
          )
        }
        if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
          setIsLogging(false)

          return Alert.alert(
            selectedLanguage === 'pt-br' ? 'Login' : 'Login',
            selectedLanguage === 'pt-br'
              ? 'E-mail e/ou senha inválida.'
              : 'Invalid email and/or password.',
          )
        } else {
          setIsLogging(false)
          console.log(`code`, code)
          return Alert.alert(
            selectedLanguage === 'pt-br' ? 'Login' : 'Login',
            selectedLanguage === 'pt-br'
              ? 'Não foi possível realizar o login.'
              : 'Login could not be completed.',
          )
        }
      })
      .finally(() => {
        setIsLogging(false)
      })
  }

  async function firebaseSignUpWithUserAndPopulateDatabase(
    accountUserUid: string,
    email: string,
    password: string,
    name: string,
    birthdate: string,
    selectedLanguage: 'pt-br' | 'us',
  ) {
    setIsWaitingApiResponse(true)

    const usersRef = collection(db, 'users')
    const updatedTime = serverTimestamp()

    const muscleFocus = {
      createdAt: updatedTime,
      updatedAt: updatedTime,
      muscleSelectedData: [
        {
          'pt-br': `equilibrado`,
          us: `balanced`,
        },
      ],
    }

    const freeData: IFreeSelectData = {
      createdAt: updatedTime,
      updatedAt: updatedTime,
      data: {
        barSelectData: [
          {
            bar_insensitive: { 'pt-br': 'todos', us: 'all' },
          },
        ],
        benchSelectData: [
          {
            bench_insensitive: { 'pt-br': 'todos', us: 'all' },
          },
        ],
        otherSelectData: [
          {
            other_insensitive: { 'pt-br': 'todos', us: 'all' },
          },
        ],
        weightSelectData: [
          {
            weight_insensitive: { 'pt-br': 'todos', us: 'all' },
          },
        ],
      },
    }

    const pulleyData: IPulleySelectData = {
      createdAt: updatedTime,
      updatedAt: updatedTime,
      data: {
        pulleyHandlerSelectData: [
          {
            pulleyHandler_insensitive: { 'pt-br': 'todos', us: 'all' },
          },
        ],
        pulleySelectData: [
          {
            pulley_insensitive: { 'pt-br': 'todos', us: 'all' },
          },
        ],
      },
    }

    const machineData: IMachineSelectData = {
      createdAt: updatedTime,
      updatedAt: updatedTime,
      data: {
        machineSelectData: [
          {
            machine_insensitive: { 'pt-br': 'todos', us: 'all' },
          },
        ],
      },
    }

    const premiumContractId =
      await createNewContractWithPremiumPersonalUpdateUserClientId(
        accountUserUid,
      )

    if (!premiumContractId) {
      Alert.alert(
        selectedLanguage === 'pt-br'
          ? 'erro premium bonus'
          : 'erro premium bonus',
      )
      return
    }

    const userDataCreate = {
      anabol: null,
      birthdate,
      clientId: null,
      createdAt: updatedTime,
      email,
      freeData,
      goal: null,
      gym: null,
      id: accountUserUid,
      isNewUser: true,
      machineData,
      muscleFocus,
      name,
      name_insensitive: name.toLocaleLowerCase().trim(),
      personalPlanActive: false,
      photoBase64: '',
      premiumContractId,
      pulleyData,
      restrictions: null,
      selectedLanguage,
      sessionsByWeek: null,
      submissionPending: false,
      timeBySession: null,
      updatedAt: updatedTime,
      whatsappNumber: null,
      whenStartedAtGym: '',
      personalTrainerContractId: null,
      personalTrainerId: null,
    }

    await setDoc(doc(usersRef, accountUserUid), userDataCreate)
      .then(() => {
        Alert.alert(
          selectedLanguage === 'pt-br'
            ? 'Conta criada com sucesso!'
            : 'Account created successfully!',
        )

        firebaseSignIn(email, password, selectedLanguage)
      })
      .catch((error) => {
        console.log(error.code)
      })
      .finally(() => {
        setIsWaitingApiResponse(false)
      })
  }

  async function firebaseSignOut() {
    await signOut(auth)
    /*         await AsyncStorage.removeItem(USER_SIGNIN_COLLECTION);
          await AsyncStorage.removeItem(WORKOUTSINFO_COLLECTION); */
    // saber o q isso ta excluindo se falta algo aqui
    AsyncStorage.getAllKeys().then((keys) => AsyncStorage.multiRemove(keys))

    setUser(null)
    setMyWorkout(null)
    setMyWorkoutDataArray(null)
    setCachedUserWorkoutsLog(null)
    setCachedExerciseHistoryData(null)
    setWeightProgression(null)
    setGraphicsValues(null)
    setStatisticsItens(null)
  }

  async function firebaseForgotPassword(email: string) {
    if (!email) {
      return Alert.alert(
        user?.selectedLanguage === 'pt-br'
          ? 'Redefinir senha'
          : 'Reset Password',
        user?.selectedLanguage === 'pt-br'
          ? 'Informe o e-mail.'
          : 'Please provide the email.',
      )
    }

    sendPasswordResetEmail(auth, email)
      .then(() =>
        Alert.alert(
          user?.selectedLanguage === 'pt-br'
            ? 'Redefinir senha'
            : 'Reset Password',
          user?.selectedLanguage === 'pt-br'
            ? 'Enviamos um link no seu e-mail para redefinir sua senha.'
            : 'We have sent a link to your email to reset your password.',
        ),
      )
      .catch(() =>
        Alert.alert(
          user?.selectedLanguage === 'pt-br'
            ? 'Redefinir senha'
            : 'Reset Password',
          user?.selectedLanguage === 'pt-br'
            ? 'Não foi possível enviar o e-mail para redefinir a senha.'
            : 'Could not send the email to reset the password.',
        ),
      )
  }

  async function updateUserForm(data: IUserFormProps) {
    setIsWaitingApiResponse(true)
    const userRef = collection(db, 'users')

    const {
      photoBase64,
      name,
      birthdate,
      whatsappNumber,
      gym,
      anabol,
      whenStartedAtGym,
      restrictions,
    } = data

    if (!user) return
    const { id } = user

    // criar uma condicao no comeco , que se envviar o path da antiga foto , apagar do storage ela
    const updatedAt = serverTimestamp()

    await updateDoc(doc(userRef, id), {
      anabol,
      birthdate,
      gym,
      name,
      photoBase64,
      restrictions,
      whatsappNumber,
      whenStartedAtGym,
      updatedAt,
    })
      .catch((err) => {
        console.error(err)
      })
      .then(async () => {
        if (!user) {
          return
        }

        const updatedUser = {
          ...user,
          anabol,
          birthdate,
          gym,
          name,
          photoBase64,
          restrictions,
          whatsappNumber,
          whenStartedAtGym,
          updatedAt,
        }

        if (updatedUser) {
          await AsyncStorage.setItem(
            USER_SIGNIN_COLLECTION,
            JSON.stringify(updatedUser),
          ).then(() => {
            setUser(updatedUser)
          })
        }
      })

      .finally(() => {
        setIsWaitingApiResponse(false)
        Alert.alert(
          user?.selectedLanguage === 'pt-br'
            ? 'Dados alterados com sucesso!'
            : 'Data changed successfully!',
        )
      })
  }

  async function updateUserSelectedLanguage(language: 'pt-br' | 'us') {
    setIsWaitingApiResponse(true)
    const userRef = collection(db, 'users')

    if (!user) return
    const { id } = user

    // criar uma condicao no comeco , que se envviar o path da antiga foto , apagar do storage ela
    const updatedAt = serverTimestamp()

    await updateDoc(doc(userRef, id), {
      selectedLanguage: language,
      updatedAt,
    })
      .catch((err) => {
        console.error(err)
      })
      .then(async () => {
        if (!user) {
          return
        }

        const updatedUser = {
          ...user,
          selectedLanguage: language,
          updatedAt,
        }

        if (updatedUser) {
          await AsyncStorage.setItem(
            USER_SIGNIN_COLLECTION,
            JSON.stringify(updatedUser),
          ).then(() => {
            setUser(updatedUser)
          })
        }
      })
      .finally(() => {
        setIsWaitingApiResponse(false)
        Alert.alert(
          user?.selectedLanguage === 'pt-br'
            ? 'Dados alterados com sucesso!'
            : 'Data changed successfully!',
        )
      })
  }

  async function updateLocalCacheAnonymousUserSelectedLanguage(
    language: 'pt-br' | 'us',
  ) {
    if (!user) {
      return
    }

    const updatedUser = {
      ...user,
      selectedLanguage: language,
    }

    if (updatedUser) {
      await AsyncStorage.setItem(
        USER_SIGNIN_COLLECTION,
        JSON.stringify(updatedUser),
      )
        .then(() => {
          setUser(updatedUser)
        })
        .finally(() => {
          setIsWaitingApiResponse(false)
        })
    }

    // criar uma condicao no comeco , que se envviar o path da antiga foto , apagar do storage ela

    Alert.alert(
      user?.selectedLanguage === 'pt-br'
        ? 'Dados alterados com sucesso!'
        : 'Data changed successfully!',
    )
  }

  async function updateUserGoalPreffer(userGoal: IUserGoal) {
    if (!user) return
    const { createdAt, goalSelectedData, updatedAt } = userGoal
    let fgoal: IUserGoal = {}
    if (user.goal) {
      fgoal = {
        goalSelectedData,
        updatedAt,
      }
    }

    if (!user.goal) {
      fgoal = {
        goalSelectedData,
        updatedAt,
        createdAt,
      }
    }

    setIsWaitingApiResponse(true)
    const userRef = collection(db, 'users')

    const { id } = user

    await updateDoc(doc(userRef, id), {
      goal: fgoal,
      updatedAt,
    })
      .catch((err) => {
        console.error(err)
      })
      .then(async () => {
        if (!user || !updatedAt) {
          return
        }

        const updatedUser = { ...user, goal: { ...fgoal }, updatedAt }
        if (fgoal) {
          await AsyncStorage.setItem(
            USER_SIGNIN_COLLECTION,
            JSON.stringify(updatedUser),
          ).then(() => {
            setUser(updatedUser)
          })
        }
      })
      .finally(() => {
        setIsWaitingApiResponse(false)
        Alert.alert(
          user?.selectedLanguage === 'pt-br'
            ? 'Dados alterados com sucesso!'
            : 'Data changed successfully!',
        )
      })
  }

  async function updateUserGoalFocusMusclePreffer(
    mucleFocus: IUserMuscleFocus,
  ) {
    if (!user) return
    const { createdAt, muscleSelectedData, updatedAt } = mucleFocus
    let fmuscleFocus: IUserMuscleFocus = {}
    if (user.goal) {
      fmuscleFocus = {
        muscleSelectedData,
        updatedAt,
      }
    }

    if (!user.goal) {
      fmuscleFocus = {
        muscleSelectedData,
        updatedAt,
        createdAt,
      }
    }

    setIsWaitingApiResponse(true)
    const userRef = collection(db, 'users')

    const { id } = user

    await updateDoc(doc(userRef, id), {
      muscleFocus: fmuscleFocus,
      updatedAt,
    })
      .catch((err) => {
        console.error(err)
      })
      .then(async () => {
        if (!user || !updatedAt) {
          return
        }

        const updatedUser = {
          ...user,
          muscleFocus: { ...fmuscleFocus },
          updatedAt,
        }
        if (fmuscleFocus) {
          await AsyncStorage.setItem(
            USER_SIGNIN_COLLECTION,
            JSON.stringify(updatedUser),
          ).then(() => {
            setUser(updatedUser)
          })
        }
      })
      .finally(() => {
        setIsWaitingApiResponse(false)
        Alert.alert(
          user?.selectedLanguage === 'pt-br'
            ? 'Dados alterados com sucesso!'
            : 'Data changed successfully!',
        )
      })
  }

  async function updateUserFrequencyByWeekPreffer(
    userSessionsByWeek: IUserSessionsByWeek,
  ) {
    if (!user) return
    const {
      createdAt,
      sessionsByWeekSelectedData,
      sessionsByWeekNumber,
      updatedAt,
    } = userSessionsByWeek

    let fbyweek: IUserSessionsByWeek = {}
    if (user.sessionsByWeek) {
      fbyweek = {
        sessionsByWeekSelectedData,
        sessionsByWeekNumber,
        updatedAt,
      }
    }

    if (!user.sessionsByWeek) {
      fbyweek = {
        sessionsByWeekSelectedData,
        sessionsByWeekNumber,
        updatedAt,
        createdAt,
      }
    }

    setIsWaitingApiResponse(true)
    const userRef = collection(db, 'users')

    const { id } = user

    await updateDoc(doc(userRef, id), {
      sessionsByWeek: fbyweek,
      updatedAt,
    })
      .catch((err) => {
        console.error(err)
      })
      .then(async () => {
        if (!user || !updatedAt) {
          setIsWaitingApiResponse(false)
          return
        }

        const updatedUser = {
          ...user,
          sessionsByWeek: { ...fbyweek },
          updatedAt,
        }
        if (fbyweek) {
          await AsyncStorage.setItem(
            USER_SIGNIN_COLLECTION,
            JSON.stringify(updatedUser),
          ).then(() => {
            setUser(updatedUser)
          })
        }
      })
      .finally(() => {
        setIsWaitingApiResponse(false)
        Alert.alert(
          user?.selectedLanguage === 'pt-br'
            ? 'Dados alterados com sucesso!'
            : 'Data changed successfully!',
        )
      })
  }

  async function updateUserTimeBySessionPreffer(
    userTimeBySession: IUserTimeBySession,
  ) {
    if (!user) return
    const {
      createdAt,
      timeBySessionByWeekRangeNumber,
      timeBySessionSelectedData,
      updatedAt,
    } = userTimeBySession

    let fbysession: IUserTimeBySession = {}
    if (user.sessionsByWeek) {
      fbysession = {
        timeBySessionByWeekRangeNumber,
        timeBySessionSelectedData,
        updatedAt,
      }
    }

    if (!user.sessionsByWeek) {
      fbysession = {
        timeBySessionByWeekRangeNumber,
        timeBySessionSelectedData,
        updatedAt,
        createdAt,
      }
    }

    setIsWaitingApiResponse(true)
    const userRef = collection(db, 'users')

    const { id } = user

    await updateDoc(doc(userRef, id), {
      timeBySession: fbysession,
      updatedAt,
    })
      .catch((err) => {
        console.error(err)
      })
      .then(async () => {
        if (!user || !updatedAt) {
          setIsWaitingApiResponse(false)
          return
        }

        const updatedUser = {
          ...user,
          timeBySession: { ...fbysession },
          updatedAt,
        }
        if (fbysession) {
          await AsyncStorage.setItem(
            USER_SIGNIN_COLLECTION,
            JSON.stringify(updatedUser),
          ).then(() => {
            setUser(updatedUser)
          })
        }
      })
      .finally(() => {
        setIsWaitingApiResponse(false)
        Alert.alert(
          user?.selectedLanguage === 'pt-br'
            ? 'Dados alterados com sucesso!'
            : 'Data changed successfully!',
        )
      })
  }

  async function fetchMuscleOptionData() {
    const muscleSelectDataRef = doc(db, 'selectOptionsData', `muscle`)

    const docSnapshot = await getDoc(muscleSelectDataRef)

    if (docSnapshot.exists()) {
      const initialData = docSnapshot.data() as IMuscleSelectData

      return initialData
    } else {
      return null
    }
  }

  async function fetchGoalOptionData() {
    const muscleSelectDataRef = doc(db, 'selectOptionsData', `goal`)

    const docSnapshot = await getDoc(muscleSelectDataRef)

    if (docSnapshot.exists()) {
      const initialData = docSnapshot.data() as IGoalSelectData
      return initialData
    } else {
      return null
    }
  }

  async function fetchFrequencyByWeekOptionData() {
    const muscleSelectDataRef = doc(db, 'selectOptionsData', `frequencybyweek`)
    /** OG  workoutId
 LOG  2B4bjSpS8ulI67l2qjMA */
    const docSnapshot = await getDoc(muscleSelectDataRef)

    if (docSnapshot.exists()) {
      const initialData = docSnapshot.data() as IFrequencybyweekSelectData
      return initialData
    } else {
      return null
    }
  }

  async function fetchTimeBySessionOptionData() {
    const muscleSelectDataRef = doc(db, 'selectOptionsData', `timebysession`)

    const docSnapshot = await getDoc(muscleSelectDataRef)

    if (docSnapshot.exists()) {
      const initialData = docSnapshot.data() as ITimeBySessionSelectData
      return initialData
    } else {
      return null
    }
  }

  async function fetchFreeOptionData() {
    const freeSelectDataRef = doc(db, 'selectOptionsData', `free`)

    const docSnapshot = await getDoc(freeSelectDataRef)
    if (docSnapshot.exists()) {
      const initialData = docSnapshot.data() as IFreeSelectData
      return initialData
    } else {
      return null
    }
  }

  async function updateUserFreePreffer(data: IFreeSelectItem) {
    if (!user) return

    const servertimestamp = serverTimestamp()

    let freeData: IFreeSelectData = {}

    if (user.pulleyData) {
      freeData = {
        data,
        updatedAt: servertimestamp,
      }
    }

    if (!user.pulleyData) {
      freeData = {
        data,
        updatedAt: servertimestamp,
        createdAt: servertimestamp,
      }
    }
    if (!freeData) return

    const userRef = collection(db, 'users')
    const { id } = user

    setIsWaitingApiResponse(true)

    await updateDoc(doc(userRef, id), {
      freeData,
      updatedAt: servertimestamp,
    })
      .catch((err) => {
        console.error(err)
        setIsWaitingApiResponse(false)
      })
      .then(async () => {
        if (!user) {
          setIsWaitingApiResponse(false)
          return
        }

        const updatedUser = {
          ...user,
          freeData,
          updatedAt: servertimestamp,
        }
        await AsyncStorage.setItem(
          USER_SIGNIN_COLLECTION,
          JSON.stringify(updatedUser),
        ).then(() => {
          setUser(updatedUser)
        })
      })
      .finally(() => {
        setIsWaitingApiResponse(false)
        Alert.alert(
          user?.selectedLanguage === 'pt-br'
            ? 'Dados alterados com sucesso!'
            : 'Data changed successfully!',
        )
      })
  }

  async function fetchPulleyOptionData() {
    const pulleySelectDataRef = doc(db, 'selectOptionsData', `pulley`)

    const docSnapshot = await getDoc(pulleySelectDataRef)

    if (docSnapshot.exists()) {
      const initialData = docSnapshot.data() as IPulleySelectData
      return initialData
    } else {
      return null
    }
  }

  async function updateUserPulleyPreffer(data: IPulleySelectItem) {
    if (!user) return

    const servertimestamp = serverTimestamp()

    let pulleyData: IPulleySelectData = {}

    if (user.pulleyData) {
      pulleyData = {
        data,
        updatedAt: servertimestamp,
      }
    }

    if (!user.pulleyData) {
      pulleyData = {
        data,
        updatedAt: servertimestamp,
        createdAt: servertimestamp,
      }
    }
    if (!pulleyData) return

    const userRef = collection(db, 'users')
    const { id } = user

    setIsWaitingApiResponse(true)

    await updateDoc(doc(userRef, id), {
      pulleyData,
      updatedAt: servertimestamp,
    })
      .catch((err) => {
        console.error(err)
        setIsWaitingApiResponse(false)
      })
      .then(async () => {
        if (!user) {
          setIsWaitingApiResponse(false)
          return
        }

        const updatedUser = {
          ...user,
          pulleyData,
          updatedAt: servertimestamp,
        }
        await AsyncStorage.setItem(
          USER_SIGNIN_COLLECTION,
          JSON.stringify(updatedUser),
        ).then(() => {
          setUser(updatedUser)
        })
      })
      .finally(() => {
        setIsWaitingApiResponse(false)
        Alert.alert(
          user?.selectedLanguage === 'pt-br'
            ? 'Dados alterados com sucesso!'
            : 'Data changed successfully!',
        )
      })
  }

  async function fetchMachineOptionData() {
    if (!user) return null
    try {
      const paginatedCategoriesRef = doc(db, 'selectOptionsData', 'machine')

      const docSnapshot = await getDoc(paginatedCategoriesRef)
      if (docSnapshot.exists()) {
        //  const _machineData = docSnapshot.data() as IMachineSelectItem[]
        const _machineData = docSnapshot.data() as IMachineSelectData
        return _machineData
      } else {
        console.log('Nenhum contrato encontrado.')
        return null
      }
    } catch (error) {
      console.error('Error fetching machineData:', error)
      throw error
    }
  }

  async function updateUserMachinePreffer(data: IMachineSelectItem) {
    if (!user) return

    const servertimestamp = serverTimestamp()

    let machineData: IMachineSelectData = {}

    if (user.machineData) {
      machineData = {
        data,
        updatedAt: servertimestamp,
      }
    }

    if (!machineData) return

    const userRef = collection(db, 'users')
    const { id } = user

    setIsWaitingApiResponse(true)

    await updateDoc(doc(userRef, id), {
      machineData,
      updatedAt: servertimestamp,
    })
      .catch((err) => {
        console.error(err)
        setIsWaitingApiResponse(false)
      })
      .then(async () => {
        if (!user) {
          setIsWaitingApiResponse(false)
          return
        }

        const updatedUser = {
          ...user,
          machineData,
          updatedAt: servertimestamp,
        }
        await AsyncStorage.setItem(
          USER_SIGNIN_COLLECTION,
          JSON.stringify(updatedUser),
        ).then(() => {
          setUser(updatedUser)
        })
      })
      .finally(() => {
        setIsWaitingApiResponse(false)
        Alert.alert(
          user?.selectedLanguage === 'pt-br'
            ? 'Dados alterados com sucesso!'
            : 'Data changed successfully!',
        )
      })
  }

  async function fetchCachedWorkoutsExercises() {
    const q = query(collection(db, 'cachedWorkoutsExercises'))

    const querySnapshot = await getDocs(q)
    let cachedWorkoutsExercises: ICachedExerciseList = {} as ICachedExerciseList

    querySnapshot.forEach((doc) => {
      // const data = { [doc.id]: doc.data() }
      const itemData = doc.data() as ICachedExerciseList

      cachedWorkoutsExercises = {
        ...cachedWorkoutsExercises,
        [doc.id]: { ...itemData },
      }
    })
    setCachedWorkoutsExercises(cachedWorkoutsExercises)
    // fazer um fetch aqui passando qual eu quero , no caso vai receber 2 parametros
    // o grupo muscular e o tipo , free, pulley ou machine
  }

  async function createNewContractWithPremiumPersonalUpdateUserClientId(
    userId: string,
  ) {
    setIsWaitingApiResponse(true)

    /// personalTrainerContracts/MZrIB3mchpH4WrYMvP7A/clients/kr69Ff8R3fvrxlP3j8lg
    const contractDoc = collection(db, 'premiumUsersContracts')
    const today = new Date()
    const formattedProfileUpdatedAt = format(today, 'dd/MM/yyyy')
    const updatedAt = serverTimestamp()

    if (!userId) return null
    const futureDate = addDays(today, 15)
    const formattedFutureDate = format(futureDate, 'dd/MM/yyyy')
    const newPremiumContract = {
      createdAt: updatedAt,
      updatedAt,
      userId,
      premiumPlanActive: false,
      premiumBonusStart: {
        startDate: formattedProfileUpdatedAt,
        endDate: formattedFutureDate,
        premiumBonusState: true,
      },
    }

    const premiumContractId = await addDoc(contractDoc, newPremiumContract)
      .then(async (clientData) => {
        const newPremiumContractWithId = {
          ...newPremiumContract,
          id: clientData.id,
        }

        if (newPremiumContractWithId.id) {
          savePremiumUserData(newPremiumContractWithId)
        }

        return clientData.id
      })
      .catch((error) => {
        console.log(error.code)
        return null
      })
      .finally(() => {
        setIsWaitingApiResponse(false)
      })

    return premiumContractId
  }

  async function savePremiumUserData(data: IPremiumUserContract) {
    const USER_PREMIUMCONTRACT_COLLECTION = `@myfitflow:userlocaldata-premiumcontract-${data.id}`

    if (data) {
      await AsyncStorage.setItem(
        USER_PREMIUMCONTRACT_COLLECTION,
        JSON.stringify(data),
      ).then(() => {
        setPremiumUserContract(data)
      })
    }
  }

  async function loadPremiumUserData(premiumUsersContractId: string) {
    const muscleSelectDataRef = doc(
      db,
      'premiumUsersContracts',
      premiumUsersContractId,
    )

    const docSnapshot = await getDoc(muscleSelectDataRef)

    if (docSnapshot.exists()) {
      const initialData = docSnapshot.data() as IPremiumUserContract
      savePremiumUserData(initialData)
      return initialData
    } else {
      return null
    }
  }

  // hook para sincronizar cache de log de treinos

  async function getLastUpdatedAtUserWorkoutCache(workoutCacheId: string) {
    if (!user) return null

    const userId = user.id

    const workoutDataCacheDoc = doc(
      db,
      'users',
      userId,
      'workoutDataCache',
      workoutCacheId,
    )

    try {
      const docSnap = await getDoc(workoutDataCacheDoc)

      if (!docSnap.exists()) return null

      const data = docSnap.data() as IWorkoutLog

      if (!data) return null
      if (!data.updatedAt) return null
      console.log(`data ->`, data)
      return data.updatedAt
    } catch (error) {
      console.log(error)
      return null
    }
  }
  async function updateUserWorkoutCache(
    workoutCacheId: string,
    data: IWorkoutCardLogData,
    lastCompletedTimestamp: number,
  ) {
    if (!user) return

    const userId = user.id

    const workoutDataCacheDoc = doc(
      db,
      'users',
      userId,
      'workoutDataCache',
      workoutCacheId,
    )

    const workoutCacheDoc = doc(
      db,
      'users',
      userId,
      'workoutDataCache',
      workoutCacheId,
      'workoutCache',
      workoutCacheId,
    )

    try {
      const docSnap = await getDoc(workoutDataCacheDoc)

      if (!docSnap.exists()) {
        await setDoc(workoutDataCacheDoc, {
          createdAt: lastCompletedTimestamp,
          updatedAt: lastCompletedTimestamp,
        })
      } else {
        await updateDoc(workoutDataCacheDoc, {
          updatedAt: lastCompletedTimestamp,
        })
      }

      await setDoc(workoutCacheDoc, { data })
    } catch (error) {
      console.log(error)
    }
  }

  async function createNewContractWithPersonalUpdateUserClientId(
    personalTrainerContractId: string,
    personalTrainerData: IPersonal,
  ) {
    setIsWaitingApiResponse(true)

    /// personalTrainerContracts/MZrIB3mchpH4WrYMvP7A/clients/kr69Ff8R3fvrxlP3j8lg
    const contractDoc = collection(
      db,
      'personalTrainerContracts',
      personalTrainerContractId,
      'clients',
    )

    const formattedProfileUpdatedAt = format(new Date(), 'dd/MM/yyyy')
    const updatedAt = serverTimestamp()
    const userId = user?.id
    if (!userId) return

    const newContract = {
      createdAt: updatedAt,
      updatedAt,
      submissionPending: true,
      submissionApproved: false,
      userId,
      userName: user.name,
      birthdate: user.birthdate,
    }

    await addDoc(contractDoc, newContract)
      .then(async (clientData) => {
        setContract(newContract)

        const userDoc = doc(db, 'users', userId)
        const clientId = clientData.id

        const dataToUpdateUser = {
          clientId,
          personalTrainerContractId,
          personalTrainerId: personalTrainerData.id,
          profileUpdatedAt: updatedAt,
          formattedProfileUpdatedAt,
          personalPlanActive: false,
        }
        await updateDoc(userDoc, dataToUpdateUser)

        const updatedUser = {
          ...user,
          ...dataToUpdateUser,
        }

        await AsyncStorage.setItem(
          USER_SIGNIN_COLLECTION,
          JSON.stringify(updatedUser),
        ).then(() => {
          setUser(updatedUser)
          setIsWaitingApiResponse(false)
        })
      })
      .catch((error) => {
        console.log(error.code)
      })
      .finally(() => {
        setIsWaitingApiResponse(false)
        Alert.alert(
          user?.selectedLanguage === 'pt-br'
            ? 'Convite enviado com sucesso!'
            : 'Invitation sent successfully!',
        )
      })
  }

  async function cancelNewContractWithPersonalUpdateUserClientId(
    personalTrainerContractId: string,
    clientId: string,
  ) {
    setIsWaitingApiResponse(true)
    /// personalTrainerContracts/MZrIB3mchpH4WrYMvP7A/clients/kr69Ff8R3fvrxlP3j8lg
    const contractDoc = doc(
      db,
      'personalTrainerContracts',
      personalTrainerContractId,
      'clients',
      clientId,
    )

    const formattedProfileUpdatedAt = format(new Date(), 'dd/MM/yyyy')
    const updatedAt = serverTimestamp()
    const userId = user?.id
    if (!userId) return

    await deleteDoc(contractDoc)
      .then(async () => {
        setContract(null)
        const userDoc = doc(db, 'users', userId)

        const dataToUpdateUser = {
          clientId: null,
          personalTrainerContractId: null,
          profileUpdatedAt: updatedAt,
          formattedProfileUpdatedAt,
        }
        await updateDoc(userDoc, dataToUpdateUser)

        const updatedUser = {
          ...user,
          ...dataToUpdateUser,
        }

        await AsyncStorage.setItem(
          USER_SIGNIN_COLLECTION,
          JSON.stringify(updatedUser),
        ).then(() => {
          setUser(updatedUser)
          setIsWaitingApiResponse(false)
        })
      })
      .catch((error) => {
        console.log(error.code)
      })
      .finally(() => {
        // setIsWaitingApiResponse(false)
        Alert.alert(
          user?.selectedLanguage === 'pt-br'
            ? 'Convite cancelado.'
            : 'Invitation canceled.',
        )

        setIsWaitingApiResponse(false)
      })
  }

  async function loadPersonalTrainerClientContract(
    personalTrainerContractId: string,
    clientId: string,
  ) {
    //    setIsWaitingApiResponse(true)

    /// personalTrainerContracts/MZrIB3mchpH4WrYMvP7A/clients/kr69Ff8R3fvrxlP3j8lg
    try {
      const contractDoc = doc(
        db,
        'personalTrainerContracts',
        personalTrainerContractId,
        'clients',
        clientId,
      )
      const docSnapshot = await getDoc(contractDoc)

      if (docSnapshot.exists()) {
        const _contractData = docSnapshot.data() as IContract

        let updatedState: IContract | null = _contractData
        if (
          _contractData?.submissionPending === false &&
          _contractData?.submissionApproved === false
        ) {
          await cancelNewContractWithPersonalUpdateUserClientId(
            personalTrainerContractId,
            clientId,
          )

          updatedState = null
        }
        setContract(updatedState)
        return updatedState
      } else {
        console.log('Nenhum contrato encontrado.')
        return null
      }
    } catch (error) {
      console.error('Erro ao buscar contrato:', error)
      // Retorna um array vazio em caso de erro
      return null
    }
  }

  async function loadPersonalTrainerData() {
    if (!user) return null
    const personalTrainerId = user.personalTrainerId
    if (!personalTrainerId) return null
    //    setIsWaitingApiResponse(true)
    try {
      const contractDoc = doc(db, 'personaltrainer', personalTrainerId)
      const docSnapshot = await getDoc(contractDoc)
      if (docSnapshot.exists()) {
        const _personaData = docSnapshot.data() as IPersonal

        setPersonalData(_personaData)
        return _personaData
      } else {
        console.log('Nenhum contrato encontrado.')
        return null
      }
    } catch (error) {
      console.error('Erro ao buscar contrato:', error)
      // Retorna um array vazio em caso de erro
      return null
    }
  }

  async function savePersonalTrainerData(data: IPersonal) {
    if (!user) return

    const storagePersonalDataKey = `@myfitflow:userlocaldata-personaldata-${user.id}`

    if (data) {
      await AsyncStorage.setItem(
        storagePersonalDataKey,
        JSON.stringify(data),
      ).then(() => {
        setPersonalData(data)
      })
    }
  }

  async function loadPersonalTrainerCachedData() {
    if (!user) return null

    const storagePersonalDataKey = `@myfitflow:userlocaldata-personaldata-${user.id}`

    const userLocalPersonalData = await AsyncStorage.getItem(
      storagePersonalDataKey,
    )

    if (userLocalPersonalData) {
      const cachedUserLocalPersonalData = JSON.parse(
        userLocalPersonalData,
      ) as IPersonal

      if (cachedUserLocalPersonalData) {
        setPersonalData(cachedUserLocalPersonalData)
        return cachedUserLocalPersonalData
      } else return null
    } else return null
  }

  async function saveStatisticsItens(data: IStatisticsItens[] | null) {
    if (!data) {
      return console.log(`recebendo data null`)
    }
    if (!user) {
      return
    }

    const storageGraphicDataDateKey = `@myfitflow:userlocaldata-staticItem-${user.id}`

    if (data) {
      await AsyncStorage.setItem(
        storageGraphicDataDateKey,
        JSON.stringify(data),
      ).then(() => {
        setStatisticsItens(data)
      })
    }
  }

  async function loadStatisticsItens(userId: string) {
    const storageGraphicDataDateKey = `@myfitflow:userlocaldata-staticItem-${userId}`

    const userLocalGraphicItens = await AsyncStorage.getItem(
      storageGraphicDataDateKey,
    )

    if (userLocalGraphicItens) {
      const cachedUserLocalGraphicsItens = JSON.parse(userLocalGraphicItens)
      if (cachedUserLocalGraphicsItens) {
        setStatisticsItens(cachedUserLocalGraphicsItens)
        return cachedUserLocalGraphicsItens
      }
    } else return null
  }

  async function saveWeightProgression(
    data: ICachedExerciseHistoryData[] | null,
  ) {
    if (!data) {
      return console.log(`recebendo data null`)
    }
    console.log(
      `falta enviar esses dados para o servidor caso o usuario seja mentorado por personal OU pagar conta premium`,
    )
    /* 
    
    falta enviar esses dados para o servidor caso o usuario seja mentorado por personal OU pagar conta premium
    
    */

    // const getGraphicName = data.data.
    if (!user) {
      return
    }

    const storageWeightProgressionDateKey = `@myfitflow:userlocaldata-weightprogression-${user.id}`

    if (data) {
      await AsyncStorage.setItem(
        storageWeightProgressionDateKey,
        JSON.stringify(data),
      ).then(() => {
        setWeightProgression(data)
      })
    }
  }

  async function loadWeightProgression(userId: string) {
    const storageWeightProgressionDateKey = `@myfitflow:userlocaldata-weightprogression-${userId}`

    const userLocalWeightProgressionDateKey = await AsyncStorage.getItem(
      storageWeightProgressionDateKey,
    )

    if (userLocalWeightProgressionDateKey) {
      const cachedUserLocalWeightProgressionDateKey = JSON.parse(
        userLocalWeightProgressionDateKey,
      ) as ICachedExerciseHistoryData[]

      if (!cachedUserLocalWeightProgressionDateKey) return null

      setWeightProgression(cachedUserLocalWeightProgressionDateKey)

      return cachedUserLocalWeightProgressionDateKey
    } else return null
  }

  async function saveGraphicsValues(data: IGraphicsValues[] | null) {
    if (!data) {
      return console.log(`recebendo data null`)
    }

    // const getGraphicName = data.data.
    if (!user) {
      return
    }
    const storageGraphicsValuesDateKey = `@myfitflow:userlocaldata-graphicsValues-${user.id}`

    if (data) {
      await AsyncStorage.setItem(
        storageGraphicsValuesDateKey,
        JSON.stringify(data),
      ).then(() => {
        setGraphicsValues(data)
      })
    }
  }

  async function loadGraphicsValues(userId: string) {
    const storageGraphicsValuesDateKey = `@myfitflow:userlocaldata-graphicsValues-${userId}`

    const userLocalGraphicsValues = await AsyncStorage.getItem(
      storageGraphicsValuesDateKey,
    )

    if (userLocalGraphicsValues) {
      const cachedUserLocalGraphicsValues = JSON.parse(userLocalGraphicsValues)

      if (cachedUserLocalGraphicsValues) {
        setGraphicsValues(cachedUserLocalGraphicsValues)

        return cachedUserLocalGraphicsValues
      }
    }
  }

  /* refatorar  toamndo como base o q o updateCachedUserWorkoutsLog usa */
  async function updateCachedExerciseHistoryData(
    data: ICachedExerciseHistoryData,
  ) {
    if (!user?.id) {
      if (!data) return
      console.error('Dados necessários não estão disponíveis.')
      return
    }
    // cachedexercises
    const storageExercisesHistoricDateKey = `@myfitflow:userlocaldata-exerciseshistoric-${user.id}`

    await AsyncStorage.setItem(
      storageExercisesHistoricDateKey,
      JSON.stringify(data),
    )

    setCachedExerciseHistoryData(data)
  }
  // oreciso receber o workoutId para identificar ocache
  async function loadCachedUserWorkoutsLog(userId: string) {
    const storageCachedExercisesWeightDoneLogDataKey = `@myfitflow:userlocal-cachedweightdone-${userId}`

    try {
      const storedWeightDoneLogString = await AsyncStorage.getItem(
        storageCachedExercisesWeightDoneLogDataKey,
      )
      if (storedWeightDoneLogString) {
        const summaryInfoData = JSON.parse(
          storedWeightDoneLogString,
        ) as IUserWorkoutsLog

        if (summaryInfoData.userId !== userId) return null
        setCachedUserWorkoutsLog(summaryInfoData) // Atualiza o estado com os dados carregados
      }
    } catch (error) {
      // console.error('Erro ao carregar as informações de resumo:', error)
    }
  }

  async function updateCachedUserWorkoutsLog(
    newExercise: ICachedCardExerciseData,
    workoutId: string,
    lastCompletedTimestamp: number,
    lastCompletedFormattedDay: IptBrUs,
    lastCompletedFormattedDate: string,
    cardIndex: number,
  ): Promise<void> {
    const userId = getUserId()
    if (!userId) {
      console.error('ID do usuário não está disponível.')
      return
    }

    const storageKey = `@myfitflow:userlocal-cachedweightdone-${userId}`
    const cachedLog = cachedUserWorkoutsLog || (await createUserWorkoutLog())

    if (!cachedLog) return

    const updatedLog = await updateUserWorkoutsLog(
      cachedLog.workoutsLog,
      newExercise,
      workoutId,
      lastCompletedTimestamp,
      lastCompletedFormattedDay,
      lastCompletedFormattedDate,
      cardIndex,
    )
    if (updatedLog) {
      await saveToStorage(storageKey, updatedLog)
      setCachedUserWorkoutsLog(updatedLog)
    }

    async function createUserWorkoutLog(): Promise<IUserWorkoutsLog | null> {
      const userId = getUserId()
      if (!userId) return null

      const newLog: IUserWorkoutsLog = {
        workoutsLog: [],
        userId,
      }

      return newLog
    }

    async function updateUserWorkoutsLog(
      workoutLogs: IWorkoutLog[],
      newExercise: ICachedCardExerciseData,
      workoutId: string,
      lastCompletedTimestamp: number,
      lastCompletedFormattedDay: IptBrUs,
      lastCompletedFormattedDate: string,
      cardIndex: number,
    ): Promise<IUserWorkoutsLog | null> {
      const logIndex = workoutLogs.findIndex(
        (log) => log.workoutId === workoutId,
      )

      const isNewWorkoutLog = logIndex === -1

      if (isNewWorkoutLog) {
        return await createNewWorkoutLog(
          workoutLogs,
          newExercise,
          workoutId,
          lastCompletedTimestamp,
          lastCompletedFormattedDay,
          lastCompletedFormattedDate,
          cardIndex,
        )
      } else {
        return await updateExistingWorkoutLog(
          workoutLogs,
          logIndex,
          newExercise,
          lastCompletedTimestamp,
          lastCompletedFormattedDay,
          lastCompletedFormattedDate,
          cardIndex,
        )
      }
    }

    async function createNewWorkoutLog(
      workoutLogs: IWorkoutLog[],
      newExercise: ICachedCardExerciseData,
      workoutId: string,
      lastCompletedTimestamp: number,
      lastCompletedFormattedDay: IptBrUs,
      lastCompletedFormattedDate: string,
      cardIndex: number,
    ): Promise<IUserWorkoutsLog | null> {
      const newWorkoutCardLog: IWorkoutCardLogData = {
        cardIndex,
        weightDoneLogs: [newExercise],
        totalSessionsCompleted: 1,
        lastCompletedTimestamp,
        lastCompletedFormattedDay,
        lastCompletedFormattedDate,
      }

      const existingWorkoutLogIndex = workoutLogs.findIndex(
        (log) => log.workoutId === workoutId,
      )

      if (existingWorkoutLogIndex !== -1) {
        // Preserve existing workout logs and add the new card log
        workoutLogs[existingWorkoutLogIndex] = {
          ...workoutLogs[existingWorkoutLogIndex],
          workoutCardsLogData: [
            ...workoutLogs[existingWorkoutLogIndex].workoutCardsLogData,
            newWorkoutCardLog,
          ],
        }
      } else {
        // Create a new workout log if it doesn't exist
        workoutLogs.push({
          workoutCardsLogData: [newWorkoutCardLog],
          workoutId,
        })
      }

      const userId = getUserId()
      if (!userId) return null

      return {
        workoutsLog: workoutLogs,
        createdAt: lastCompletedTimestamp,
        updatedAt: lastCompletedTimestamp,
        userId,
      }
    }
    /* essa funcao ta BUGADA  refazer isso  */
    async function updateExistingWorkoutLog(
      workoutLogs: IWorkoutLog[],
      logIndex: number,
      newExercise: ICachedCardExerciseData,
      lastCompletedTimestamp: number,
      lastCompletedFormattedDay: IptBrUs,
      lastCompletedFormattedDate: string,
      cardIndex: number,
    ): Promise<IUserWorkoutsLog | null> {
      const workoutLog = workoutLogs[logIndex]
      const cardLogIndex = workoutLog.workoutCardsLogData.findIndex(
        (log) => log.cardIndex === cardIndex,
      )

      const cardLog = workoutLog.workoutCardsLogData[cardLogIndex]

      // Atualizar os dados existentes sem perder os anteriores
      const existingExerciseIndex = cardLog.weightDoneLogs.findIndex(
        (log) =>
          log.workoutExerciseId === newExercise.workoutExerciseId &&
          log.workoutExerciseIndex === newExercise.workoutExerciseIndex,
      )

      if (existingExerciseIndex !== -1) {
        // Mesclar os dados do exercício existente com os novos dados
        cardLog.weightDoneLogs[existingExerciseIndex] = {
          ...cardLog.weightDoneLogs[existingExerciseIndex],
          ...newExercise,
        }
      } else {
        // Adicionar o novo exercício se não existir
        cardLog.weightDoneLogs.push(newExercise)
      }

      cardLog.totalSessionsCompleted += 1
      cardLog.lastCompletedTimestamp = lastCompletedTimestamp
      cardLog.lastCompletedFormattedDay = lastCompletedFormattedDay
      cardLog.lastCompletedFormattedDate = lastCompletedFormattedDate

      const userId = getUserId()
      if (!userId) return null

      return {
        workoutsLog: workoutLogs,
        updatedAt: lastCompletedTimestamp,
        userId,
      }
    }

    async function saveToStorage(key: string, data: any): Promise<void> {
      await AsyncStorage.setItem(key, JSON.stringify(data))
    }

    function getUserId(): string | null {
      return user?.id || null
    }
  }
  /*   console.log('cachedUserWorkoutsLog()')
  console.log(JSON.stringify(cachedUserWorkoutsLog)) */

  /// apagarCached()
  async function apagarCached() {
    AsyncStorage.getAllKeys().then((keys) => AsyncStorage.multiRemove(keys))
  }

  // fazer se inspirando no notes

  // setCachedUserWorkoutsLog
  async function updateCachedVideoTable(
    cachedLocalPathVideo: string,
    _exerciseId: string,
  ) {
    if (!user) return null
    const userId = user.id

    const storageCachedVideoTableKey = `@myfitflow:userlocal-cachedvideotable-${userId}`

    if (cachedVideoTable) {
      const copyCachedVideoTable = [...cachedVideoTable]
      const cachedVideo = copyCachedVideoTable.findIndex(
        (es) => es.workoutExerciseId === _exerciseId,
      )
      const isNewVideo = cachedVideo === -1

      if (!isNewVideo) {
        copyCachedVideoTable[cachedVideo] = {
          ...copyCachedVideoTable[cachedVideo],
          updatedAt: new Date().getTime(),
          cachedLocalPathVideo,
        }

        await AsyncStorage.setItem(
          storageCachedVideoTableKey,
          JSON.stringify(copyCachedVideoTable),
        )
        return copyCachedVideoTable
      }

      if (isNewVideo) {
        copyCachedVideoTable.push({
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
          workoutExerciseId: _exerciseId,
          cachedLocalPathVideo,
        })

        await AsyncStorage.setItem(
          storageCachedVideoTableKey,
          JSON.stringify(copyCachedVideoTable),
        )
        return copyCachedVideoTable
      }
    }

    if (!cachedVideoTable) {
      const initialVideoTable = []
      initialVideoTable.push({
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        workoutExerciseId: _exerciseId,
        cachedLocalPathVideo,
      })
      await AsyncStorage.setItem(
        storageCachedVideoTableKey,
        JSON.stringify(initialVideoTable),
      )

      return initialVideoTable
    }
    return null
  }

  async function loadCachedVideoTable(userId: string) {
    const storageCachedVideoTableKey = `@myfitflow:userlocal-cachedvideotable-${userId}`
    try {
      const storedCachedVideoTableString = await AsyncStorage.getItem(
        storageCachedVideoTableKey,
      )

      if (storedCachedVideoTableString) {
        const cachedVideoTableData = JSON.parse(storedCachedVideoTableString)

        setCachedVideoTable(cachedVideoTableData) // Atualiza o estado com os dados carregados
      }
    } catch (error) {
      // console.error('Erro ao carregar as informações de resumo:', error)
    }
  }

  async function loadMyWorkoutAndmyWorkoutDataArrayAndReturnExercises(
    _workouts: IMyfitflowWorkoutInUse,
  ): Promise<boolean> {
    const { workoutId, workoutCategoryId } = _workouts
    const userId = user?.id
    if (!workoutId || !userId || !workoutCategoryId) {
      console.error('Dados necessários para carregar treino estão ausentes.')
      return false
    }

    setIsWaitingApiResponse(true)
    await resetStateCache()

    const workoutExercisesRef = doc(
      db,
      'workoutsCategories',
      workoutCategoryId,
      'workouts',
      workoutId,
      'workoutsData',
      'workoutsDataArray',
    )

    const docSnapshot = await getDoc(workoutExercisesRef)

    if (docSnapshot.exists()) {
      const initialData = docSnapshot.data() as IWorkoutInfo

      const allWorkoutsExercisesVideoInfo =
        await handleFetchExercisesInfo(initialData)
      if (!allWorkoutsExercisesVideoInfo) return false

      const formattedExerciseData = initialData.workoutsData.map(
        (_workoutsData) => {
          const formattedExerciseData = _workoutsData.cardExerciseData
            .map((_exerciseDataFromArrayInsideWorkoutData) => {
              const myExerciseFileToAdd = allWorkoutsExercisesVideoInfo.find(
                (fin) =>
                  fin.exerciseId ===
                  _exerciseDataFromArrayInsideWorkoutData.workoutExerciseId,
              )
              if (!myExerciseFileToAdd) return null

              // atualizando o meu dataArray com o q vem do firebase exercicios como video

              const returnData = {
                ..._exerciseDataFromArrayInsideWorkoutData,

                workoutExerciseName_insensitive:
                  myExerciseFileToAdd.exerciseName_insensitive,
                workoutExerciseInfo: myExerciseFileToAdd.exerciseInfo,

                workoutExerciseVideoMIME: myExerciseFileToAdd.exerciseVideoMIME,
                workoutExerciseVideoFileName:
                  myExerciseFileToAdd.exerciseVideoFileName,
                workoutExerciseVideoUrl: myExerciseFileToAdd.exerciseVideoUrl,

                workoutExerciseThumbnailMIME:
                  myExerciseFileToAdd.exerciseThumbnailMIME,
                workoutExerciseThumbnailFileName:
                  myExerciseFileToAdd.exerciseThumbnailFileName,
                workoutExerciseThumbnailUrl:
                  myExerciseFileToAdd.exerciseThumbnailUrl,

                workoutExerciseVideoSize: myExerciseFileToAdd.exerciseVideoSize,

                workoutExerciseMode: myExerciseFileToAdd.exerciseMode,
                workoutExerciseFilters: myExerciseFileToAdd.exerciseFilters,

                workoutExerciseMuscleGroup:
                  myExerciseFileToAdd.exerciseMuscleGroup,

                workoutExerciseId: myExerciseFileToAdd.exerciseId,
              }
              return returnData
            })
            .filter((va) => va !== null)

          /* TODO
            tirar o enabled true  ou false do form inicial do personal pra tirar isso daqui dps */
          return {
            index: _workoutsData.index,
            cardExerciseLabel: _workoutsData.cardExerciseLabel,
            cardExerciseData: formattedExerciseData,
            cardExerciseUniquesMuscles:
              _workoutsData.cardExerciseUniquesMuscles,
          }
        },
      )

      const formattedWorkoutsDataArray: IWorkoutInfo = {
        workoutId,
        workoutSequence: initialData.workoutSequence,
        workoutsData: formattedExerciseData,
      }

      await saveExerciseDataInCache(userId, formattedWorkoutsDataArray)
      await saveMyWorkoutInCache(userId, _workouts)

      Alert.alert(
        user?.selectedLanguage === 'pt-br'
          ? 'Seu treino foi adicionado com sucesso!'
          : 'Your workout was added successfully!',
      )
      setIsWaitingApiResponse(false)

      return true
    } else {
      Alert.alert(
        user?.selectedLanguage === 'pt-br' ? 'Opa' : 'Oops',
        user?.selectedLanguage === 'pt-br'
          ? 'Esse treino ainda não está pronto.'
          : 'This workout is not ready yet.',
      )
      return false
    }

    async function resetStateCache() {
      setCachedUserWorkoutsLog(null)
      setCachedExerciseHistoryData(null)
    }

    async function handleFetchExercisesInfo(data: IWorkoutInfo) {
      const { workoutsData } = data

      const formattedArrayOfunicIds =
        getUnicWorkoutIdToGetExerciseVideoInfo(workoutsData) // preciso do id de todos pra buscar os dados

      if (!formattedArrayOfunicIds) return

      const response = await loadAllWorkoutsExercisesVideoInfo(
        formattedArrayOfunicIds,
      )

      return response

      function getUnicWorkoutIdToGetExerciseVideoInfo(
        data: IWorkoutsData[] | undefined,
      ): string[] {
        if (data === undefined) return []
        // ta retornando nada
        const allWorkoutIds = data.flatMap((v) =>
          v.cardExerciseData.flatMap((va) => va.workoutExerciseId),
        )
        // Filtra os IDs indefinidos antes de criar o Set
        const filteredIds = allWorkoutIds.filter(
          (id): id is string => id !== undefined,
        )

        const uniqueIds = new Set(filteredIds)
        const unicIdsArray = [...uniqueIds]
        return unicIdsArray
      }

      async function loadAllWorkoutsExercisesVideoInfo(
        data: string[],
      ): Promise<IWorkoutExercisesFirebase[] | void> {
        if (!user?.id) return []
        const promises = data.map((docId) => {
          const docRef = doc(db, 'workoutsExercises', docId)
          return getDoc(docRef)
        })

        const extractedData = await Promise.all(promises)
          .then((results) => {
            const extractedData = results
              .map((docSnapshot) => {
                if (docSnapshot.exists()) {
                  return {
                    exerciseId: docSnapshot.id,
                    ...docSnapshot.data(),
                  } as IWorkoutExercisesFirebase
                } else {
                  return null
                }
              })
              .filter((doc): doc is IWorkoutExercisesFirebase => doc !== null)
            return extractedData
          })
          .catch((error) => {
            console.error('Erro ao buscar documentos:', error)
          })

        return extractedData
      }
    }

    async function saveExerciseDataInCache(
      userId: string,
      exerciseData: IWorkoutInfo,
    ) {
      console.log(`INICIO saveExerciseDataInCache`, myWorkoutDataArray)
      if (!user) return
      const workoutExercisesKey = `@myfitflow:cachedworkoutexercises-${userId}`

      let myWorkoutDataExercises: IMyWorkoutsData | null

      if (myWorkoutDataArray) {
        myWorkoutDataExercises = updateExistingExercise(exerciseData)
      } else {
        myWorkoutDataExercises = createNewExerciseData(userId, exerciseData)
      }

      if (myWorkoutDataExercises) {
        await AsyncStorage.setItem(
          workoutExercisesKey,
          JSON.stringify(myWorkoutDataExercises),
        )
        setMyWorkoutDataArray(myWorkoutDataExercises)
      }
      // Salva os exercícios atualizados no AsyncStorage

      function updateExistingExercise(exerciseData: IWorkoutInfo) {
        if (!myWorkoutDataArray) return null
        const dateTime = new Date().getTime()
        const exerciseIndex = myWorkoutDataArray.data.findIndex(
          (v) => v.id === exerciseData.workoutId,
        )

        const copyMyWorkoutDataArray = {
          ...myWorkoutDataArray,
        }
        if (exerciseIndex !== -1) {
          // Atualiza o exercício existente
          copyMyWorkoutDataArray.data[exerciseIndex] = {
            id: exerciseData.workoutId,
            data: exerciseData,
            createdAt: copyMyWorkoutDataArray.data[exerciseIndex].createdAt,
            updatedAt: dateTime,
          }
        } else {
          // Adiciona um novo exercício
          copyMyWorkoutDataArray.data.push({
            id: exerciseData.workoutId,
            data: exerciseData,
            createdAt: dateTime,
            updatedAt: dateTime,
          })
        }

        return copyMyWorkoutDataArray
      }

      function createNewExerciseData(
        userId: string,
        exerciseData: IWorkoutInfo,
      ) {
        const dateTime = new Date().getTime()
        console.log(`dataDoestNotExists`)
        return {
          userId,
          createdAt: dateTime,
          updatedAt: dateTime,
          data: [
            {
              id: exerciseData.workoutId,
              data: exerciseData,
              createdAt: dateTime,
              updatedAt: dateTime,
            },
          ],
        }
      }
    }

    async function saveMyWorkoutInCache(
      userId: string,
      workoutData: IMyfitflowWorkoutInUse,
    ) {
      if (!user) return
      const workoutKey = `@myfitflow:cachedworkout-${userId}`
      // Tenta buscar o MyWorkouts existente
      let myWorkoutExercises: IMyWorkouts | null

      if (myWorkout) {
        myWorkoutExercises = updateExistingWorkout(workoutData)
      } else {
        myWorkoutExercises = createNewWorkoutData(userId, workoutData)
      }

      if (myWorkoutExercises) {
        await AsyncStorage.setItem(
          workoutKey,
          JSON.stringify(myWorkoutExercises),
        )
        setMyWorkout(myWorkoutExercises)
      }

      console.log(`FIM saveMyWorkoutInCache`)

      function updateExistingWorkout(workoutData: IMyfitflowWorkoutInUse) {
        if (!myWorkout) return null

        const workoutIndex = myWorkout.data.findIndex(
          (workout) => workout.id === workoutData.workoutId,
        )

        const copyMyWorkout = {
          ...myWorkout,
        }
        const currentDate = new Date().getTime()

        if (workoutIndex !== -1) {
          // Atualiza o workout existente
          copyMyWorkout.data[workoutIndex] = {
            ...copyMyWorkout.data[workoutIndex],
            data: workoutData,
            updatedAt: currentDate,
          }
        } else {
          // Adiciona um novo workout

          copyMyWorkout.data.push({
            id: workoutData.workoutId || '',
            data: workoutData,
            createdAt: currentDate,
            updatedAt: currentDate,
            workoutStartAt: 0,
            workoutEndsAt: 0,
          })
        }

        return copyMyWorkout
      }

      function createNewWorkoutData(
        userId: string,
        workoutData: IMyfitflowWorkoutInUse,
      ): IMyWorkouts {
        console.log(`dataDoestNotExists`)

        // Exemplo de uso:
        const currentDate = new Date().getTime()
        // const formattedCurrentDate = formatDateToDDMMYYYY(currentDate)

        return {
          userId,
          createdAt: currentDate,
          updatedAt: currentDate,
          data: [
            {
              id: workoutData.workoutId || '',
              data: workoutData,
              createdAt: currentDate,
              updatedAt: currentDate,
              workoutStartAt: 0,
              workoutEndsAt: 0,
            },
          ],
        }
      }
    }
  }

  async function updateMyWorkoutInCache(data: IMyWorkouts) {
    if (!user) return
    if (!myWorkout) return
    const userId = user.id

    console.log(`INICIO saveMyWorkoutInCache`)
    if (!user) return
    const workoutKey = `@myfitflow:cachedworkout-${userId}`

    // Tenta buscar o MyWorkouts existente

    if (data) {
      await AsyncStorage.setItem(workoutKey, JSON.stringify(data))
      setMyWorkout(data)
    }

    console.log(`FIM saveMyWorkoutInCache`)
  }

  async function resetAllStartAndEndDateFromMyWorkoutInCache(
    workoutData: IMyfitflowWorkoutInUse,
  ) {
    if (!user) return
    if (!myWorkout) return
    const userId = user.id

    console.log(`INICIO saveMyWorkoutInCache`)
    if (!user) return
    const workoutKey = `@myfitflow:cachedworkout-${userId}`

    // Tenta buscar o MyWorkouts existente
    const myWorkoutExercises = resetallDatesFromExistingWorkout(workoutData)

    if (myWorkoutExercises) {
      await AsyncStorage.setItem(workoutKey, JSON.stringify(myWorkoutExercises))
      setMyWorkout(myWorkoutExercises)
    }

    console.log(`FIM saveMyWorkoutInCache`)
    function resetallDatesFromExistingWorkout(
      workoutData: IMyfitflowWorkoutInUse,
    ) {
      if (!myWorkout) return null

      const workoutIndex = myWorkout.data.findIndex(
        (workout) => workout.id === workoutData.workoutId,
      )

      if (workoutIndex === -1) return null
      const copyMyWorkout = {
        ...myWorkout,
      }
      // Atualiza o workout existente

      // Atualiza o workout existente
      const newOrderedWorkouts = copyMyWorkout.data.map((workout, index) => {
        const newWorkout = {
          ...workout,
          updatedAt: new Date().getTime(),
          workoutStartAt: 0,
          workoutEndsAt: 0,
        }

        return newWorkout
      })

      copyMyWorkout.data = newOrderedWorkouts
      return copyMyWorkout
    }
  }
  async function updateStartAndEndDateFromMyWorkoutInCache(
    workoutData: IMyfitflowWorkoutInUse,
    startDate: number,
  ) {
    if (!user) return
    if (!myWorkout) return
    const userId = user.id

    console.log(`INICIO saveMyWorkoutInCache`)
    if (!user) return
    const workoutKey = `@myfitflow:cachedworkout-${userId}`

    // Tenta buscar o MyWorkouts existente
    const myWorkoutExercises = updateExistingWorkout(workoutData, startDate)

    if (myWorkoutExercises) {
      await AsyncStorage.setItem(workoutKey, JSON.stringify(myWorkoutExercises))
      setMyWorkout(myWorkoutExercises)
    }

    console.log(`FIM saveMyWorkoutInCache`)
    function updateExistingWorkout(
      workoutData: IMyfitflowWorkoutInUse,
      startDate: number,
    ) {
      if (!myWorkout) return null

      const workoutIndex = myWorkout.data.findIndex(
        (workout) => workout.id === workoutData.workoutId,
      )

      if (workoutIndex === -1) return null
      const copyMyWorkout = {
        ...myWorkout,
      }
      // Atualiza o workout existente

      // Atualiza o workout existente
      let previousEndDate = startDate
      const newOrderedWorkouts = copyMyWorkout.data.map((workout, index) => {
        const periodInWeekNumber = workout.data.workoutPeriod.periodNumber
        const newStartDate = previousEndDate
        const newEndDate = addWeeksToTimestamp(newStartDate, periodInWeekNumber)

        const newWorkout = {
          ...workout,
          updatedAt: new Date().getTime(),
          workoutStartAt: newStartDate,
          workoutEndsAt: newEndDate,
        }

        previousEndDate = newEndDate
        return newWorkout
      })

      copyMyWorkout.data = newOrderedWorkouts
      return copyMyWorkout
    }
  }

  async function deleteMyWorkoutAndmyWorkoutDataArray(workoutId?: string) {
    const userId = user?.id
    if (!workoutId) return
    if (!userId) {
      console.error('Dados necessários para carregar treino estão ausentes.')
      return
    }

    await resetStateCache()
    await deleteExerciseDataInCache(userId, workoutId)
    await deleteMyWorkoutInCache(userId, workoutId)

    Alert.alert(
      user?.selectedLanguage === 'pt-br' ? 'Opa!' : 'Oops!',
      user?.selectedLanguage === 'pt-br'
        ? 'Sua série foi cancelada com sucesso!'
        : 'Your workout series has been successfully canceled!',
    )
    async function resetStateCache() {
      setCachedUserWorkoutsLog(null)
      setCachedExerciseHistoryData(null)
    }

    async function deleteExerciseDataInCache(
      userId: string,
      workoutId: string,
    ) {
      const workoutExercisesKey = `@myfitflow:cachedworkoutexercises-${userId}`

      const copyMyWorkoutDataArray = {
        ...myWorkoutDataArray,
      } as IMyWorkoutsData
      if (!copyMyWorkoutDataArray) return
      if (!copyMyWorkoutDataArray.data) return
      // quero deletar
      const newWorkoutDataArray = copyMyWorkoutDataArray.data.filter(
        (v) => v.id !== workoutId,
      )

      copyMyWorkoutDataArray.data = newWorkoutDataArray

      await AsyncStorage.setItem(
        workoutExercisesKey,
        JSON.stringify(newWorkoutDataArray),
      )

      setMyWorkoutDataArray(copyMyWorkoutDataArray)
    }

    async function deleteMyWorkoutInCache(userId: string, workoutId: string) {
      const workoutKey = `@myfitflow:cachedworkout-${userId}`

      if (!myWorkout) return

      const copyMyWorkout = { ...myWorkout }

      if (!copyMyWorkout.data) return

      // Filtra os workouts para remover o workout com o workoutId fornecido
      const newWorkoutDataArray = copyMyWorkout.data.filter(
        (v) => v.id !== workoutId,
      )

      // Atualiza o objeto copyMyWorkout com o novo array de workouts
      copyMyWorkout.data = newWorkoutDataArray

      // Salva os dados atualizados no AsyncStorage
      await AsyncStorage.setItem(workoutKey, JSON.stringify(copyMyWorkout))

      // Atualiza o estado com os dados atualizados
      setMyWorkout(copyMyWorkout)
    }
  }

  async function premiumUserUpdateProfileUpdatedAt(workoutId: string) {
    if (!workoutId || !user || !user.id) {
      return
    }

    // setIsWaitingApiResponse(true)

    try {
      const userId = user.id
      const userRef = collection(db, 'users')
      const formattedProfileUpdatedAt = format(new Date(), 'dd/MM/yyyy')
      const profileUpdatedAt = serverTimestamp()

      await updateDoc(doc(userRef, userId), {
        workoutId,
        profileUpdatedAt,
        formattedProfileUpdatedAt,
      }).then(() => {
        AsyncStorage.setItem(USER_SIGNIN_COLLECTION, JSON.stringify(user))
        setUser(user)

        Alert.alert(
          user?.selectedLanguage === 'pt-br' ? 'Alerta' : 'Alert',
          user?.selectedLanguage === 'pt-br'
            ? 'Treino adicionado com sucesso!'
            : 'Workout added successfully!',
        )
      })
    } catch (err) {
      console.log(err)
      Alert.alert(
        user?.selectedLanguage === 'pt-br' ? 'Opa' : 'Oops',
        user?.selectedLanguage === 'pt-br'
          ? 'Esse treino ainda não está pronto'
          : 'This workout is not ready yet',
      )
    } finally {
      // setIsWaitingApiResponse(false)
    }
  }

  async function loadPersonalsList() {
    setIsWaitingApiResponse(true)

    const userColcRef = collection(db, 'personaltrainer')

    const q = query(userColcRef)
    await getDocs(q)
      .then(async (response) => {
        const data = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        }) as IPersonal[]

        setPersonalsList(data)
        setIsWaitingApiResponse(false)
      })
      .catch((error) => console.log(error))
  }

  async function loadWorkouts(workoutCategoryId: string) {
    setIsWaitingApiResponse(true)

    const userColcRef = collection(
      db,
      'workoutsCategories',
      workoutCategoryId,
      'workouts',
    )

    const q = query(userColcRef)
    const formattedData = await getDocs(q)
      .then(async (response) => {
        const data = response.docs.map((doc) => {
          return {
            workoutId: doc.id,
            ...doc.data(),
          }
        }) as IMyfitflowWorkoutInUse[]

        const lUpdated = new Date()
        const lUpdatedTimestamp = Timestamp.fromDate(lUpdated)

        const formattedData: ICachedWorkoutsWithLastUpdatedTimestamp = {
          // cachedLastWorkoutUpdatedAt:lUpdatedTimestamp,
          data,
          lastUpdatedAt: lUpdated.getTime(),
        }

        return formattedData
      })
      .catch((error) => console.log(error))

    if (formattedData) {
      setWorkouts(formattedData)
      setIsWaitingApiResponse(false)
      return formattedData
    } else {
      setIsWaitingApiResponse(false)
      return null
    }
  }

  async function saveWorkouts(
    workoutCategoryId: string,
    cachedWorkoutsWithUpdatedAt: ICachedWorkoutsWithLastUpdatedTimestamp,
  ) {
    if (!user) return
    const userId = user.id

    const USERLOCAL_CACHED_WORKOUTS = `@myfitflow:cachedworkouts-${workoutCategoryId}-${userId}`
    await AsyncStorage.setItem(
      USERLOCAL_CACHED_WORKOUTS,
      JSON.stringify(cachedWorkoutsWithUpdatedAt),
    )
  }

  async function loadCachedWorkouts(workoutCategoryId: string) {
    if (!user) return null
    const userId = user.id

    const USERLOCAL_CACHED_WORKOUTS = `@myfitflow:cachedworkouts-${workoutCategoryId}-${userId}`

    const cachedWorkoutsData = await AsyncStorage.getItem(
      USERLOCAL_CACHED_WORKOUTS,
    )

    if (cachedWorkoutsData) {
      const cachedWorkouts = JSON.parse(
        cachedWorkoutsData,
      ) as ICachedWorkoutsWithLastUpdatedTimestamp

      setWorkouts(cachedWorkouts)
      return cachedWorkouts
    } else {
      return null
    }
  }

  async function loadWorkoutsCategories() {
    setIsWaitingApiResponse(true)

    const userColcRef = collection(db, 'workoutsCategories')
    const q = query(userColcRef)
    await getDocs(q)
      .then(async (response) => {
        const data = response.docs.map((doc) => {
          return {
            workoutCategoryId: doc.id,
            ...doc.data(),
          }
        }) as IWorkoutCategory[]

        setWorkoutsCategories(data)

        setIsWaitingApiResponse(false)
      })
      .catch((error) => console.log(`error`, error))
  }

  async function loadCachedExerciseHistoryData(userId: string) {
    const storageExercisesHistoricDateKey = `@myfitflow:userlocaldata-exerciseshistoric-${userId}`

    try {
      const storedHistoryString = await AsyncStorage.getItem(
        storageExercisesHistoricDateKey,
      )

      if (storedHistoryString) {
        const historyData = JSON.parse(
          storedHistoryString,
        ) as ICachedExerciseHistoryData
        /*    console.log('historyData')
        console.log(JSON.stringify(historyData)) */

        setCachedExerciseHistoryData(historyData) // Atualiza o estado com os dados carregados
      } else {
        // console.log('Nenhum histórico de exercício encontrado.')
        setCachedExerciseHistoryData(null) // Configura o estado como um objeto vazio se não houver dados
      }
    } catch (error) {
      console.error('Erro ao carregar o histórico de exercícios:', error)
    }
  }
  async function loadMyWorkoutAndMyWorkoutExercises(userId: string) {
    console.log(`tgenho chamando`)
    const workoutExercisesKey = `@myfitflow:cachedworkoutexercises-${userId}`
    const workoutKey = `@myfitflow:cachedworkout-${userId}`

    try {
      // Carrega os exercícios do AsyncStorage
      const userLocalDataWorkoutExercises =
        await AsyncStorage.getItem(workoutExercisesKey)

      if (userLocalDataWorkoutExercises) {
        const cachedUserLocalDataWorkoutExercises = JSON.parse(
          userLocalDataWorkoutExercises,
        ) as IMyWorkoutsData
        setMyWorkoutDataArray(cachedUserLocalDataWorkoutExercises)
      } else {
        setMyWorkoutDataArray(null)
      }

      // Carrega os workouts do AsyncStorage
      const userLocalDataWorkout = await AsyncStorage.getItem(workoutKey)

      if (userLocalDataWorkout) {
        const cachedUserLocalDataWorkouts = JSON.parse(
          userLocalDataWorkout,
        ) as IMyWorkouts
        setMyWorkout(cachedUserLocalDataWorkouts)
      } else {
        setMyWorkout(null)
      }
    } catch (error) {
      console.error('Erro ao carregar os dados do AsyncStorage:', error)
    }
  }

  async function loadGraphicsAndStatistics(userId: string) {
    async function fetchCache() {
      const defaultInitialData = [
        {
          createdAt: 1716500348227,
          updatedAt: 1716500348227,
          index: 0,
          statisticName: 'Peso',
          statisticValue: '0',
          statisticGoal: '0',
          statisticMeasure: 'kg',
          isOpen: false,
          isVisible: true,
        },
        {
          createdAt: 1716500348227,
          updatedAt: 1716500348227,
          index: 1,
          statisticName: 'Gordura Corporal',
          statisticValue: '0',
          statisticGoal: '0',
          statisticMeasure: '%',
          isOpen: false,
          isVisible: true,
        },
        {
          createdAt: 1716500348227,
          updatedAt: 1716500348227,
          index: 2,
          statisticName: 'Cintura',
          statisticValue: '0',
          statisticGoal: '0',
          statisticMeasure: 'cm',
          isOpen: false,
          isVisible: true,
        },
      ]
      const responseGraphicsValues = await loadGraphicsValues(userId)
      const responseStatisticsItens = await loadStatisticsItens(userId)
      const responseWeightProgresion = await loadWeightProgression(userId)

      if (responseWeightProgresion) {
        setWeightProgression(responseWeightProgresion)
      }

      if (responseGraphicsValues) {
        setGraphicsValues(responseGraphicsValues)
      }

      if (responseStatisticsItens) {
        setStatisticsItens(responseStatisticsItens)
      }

      if (responseStatisticsItens === null) {
        setStatisticsItens(defaultInitialData)
      }
    }
    fetchCache()
  }

  async function loadUserStorageData() {
    setIsLoadingUserStorageData(true)

    try {
      const storedUser = await AsyncStorage.getItem(USER_SIGNIN_COLLECTION)

      if (storedUser === null) {
        setIsLoadingUserStorageData(false)
        return
      }

      const cachedUserData = JSON.parse(storedUser) as SignInProps

      await updateUserState(cachedUserData)
      //  await loadWorkoutData(cachedUserData)
      await loadLoginInitialCachedWorkoutsData(cachedUserData.id)

      if (cachedUserData.premiumContractId) {
        if (!premiumUserContract) {
          await loadPremiumUserData(cachedUserData.premiumContractId)
        }
      }

      // await checkForUpdates(cachedUserData)
      setIsLoadingUserStorageData(false)
    } catch (error) {
      console.error('Error loading user storage data:', error)
      setIsLoadingUserStorageData(false)
    }

    async function updateUserState(userData: SignInProps) {
      if (!userData) return
      setUser(userData)
    }

    // armazena em cache meu usuario logado

    /* async function checkForUpdates(userData: SignInProps) {
      const state = await NetInfo.fetch()
      if (!state.isConnected) return

      const userDocRef = doc(db, 'users', userData.id)
      const docSnap = await getDoc(userDocRef)

      if (!docSnap.exists()) {
        Alert.alert(
          'Login realizado',
          'Não foi possível buscar os dados de perfil do usuário',
        )
        return
      }

      const newUserData = docSnap.data() as SignInProps
      const workoutNeedsUpdate =
        JSON.stringify(newUserData.updatedAt) !==
        JSON.stringify(userData.updatedAt)
      const profileNeedsUpdate =
        JSON.stringify(newUserData.profileUpdatedAt) !==
        JSON.stringify(userData.profileUpdatedAt)

      if (workoutNeedsUpdate || profileNeedsUpdate) {
        await updateStoredUser(newUserData)
        if (workoutNeedsUpdate) console.log(`workoutNeedsUpdate`)
        loadLoginInitialCachedWorkoutsData(newUserData.id)
      }

      async function updateStoredUser(newUserData: SignInProps) {
        await AsyncStorage.setItem(
          USER_SIGNIN_COLLECTION,
          JSON.stringify(newUserData),
        )
        setUser(newUserData)
      }
    } */
  }

  async function loadLoginInitialCachedWorkoutsData(userId: string) {
    await loadCachedUserWorkoutsLog(userId) // precsa de workoutjId
    await loadCachedExerciseHistoryData(userId)

    await loadMyWorkoutAndMyWorkoutExercises(userId)

    await loadGraphicsAndStatistics(userId)

    await loadCachedVideoTable(userId)
  }

  useEffect(() => {
    loadUserStorageData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        saveNewUserTempUnconfirmedData,
        loadNewUserTempUnconfirmedData,
        firebaseAnonymousSignUp,
        firebaseCreateUserAndSendEmailVerification,
        firebaseSignIn,
        firebaseSignOut,
        firebaseForgotPassword,

        // VERIFICAR AQUI PRA BAIXO E ANOTAR OS CACHES
        loadLoginInitialCachedWorkoutsData,
        loadMyWorkoutAndmyWorkoutDataArrayAndReturnExercises,
        updateStartAndEndDateFromMyWorkoutInCache,
        resetAllStartAndEndDateFromMyWorkoutInCache,

        updateMyWorkoutInCache,

        deleteMyWorkoutAndmyWorkoutDataArray,
        premiumUserUpdateProfileUpdatedAt,

        loadPersonalsList,
        personalsList,

        loadWorkoutsCategories,
        loadWorkouts,
        saveWorkouts,
        loadCachedWorkouts,

        loadCachedExerciseHistoryData,
        updateCachedExerciseHistoryData,

        updateCachedUserWorkoutsLog,

        loadCachedVideoTable,
        updateCachedVideoTable,

        personalData,
        loadPersonalTrainerData,
        savePersonalTrainerData,
        loadPersonalTrainerCachedData,
        loadPersonalTrainerClientContract,
        createNewContractWithPersonalUpdateUserClientId,
        cancelNewContractWithPersonalUpdateUserClientId,

        updateUserForm,
        updateUserSelectedLanguage,
        updateLocalCacheAnonymousUserSelectedLanguage,
        updateUserGoalPreffer,
        updateUserGoalFocusMusclePreffer,
        updateUserFrequencyByWeekPreffer,
        updateUserTimeBySessionPreffer,
        updateUserWorkoutCache,
        getLastUpdatedAtUserWorkoutCache,

        fetchMuscleOptionData,
        fetchFrequencyByWeekOptionData,
        fetchGoalOptionData,
        fetchTimeBySessionOptionData,

        fetchPulleyOptionData,
        updateUserPulleyPreffer,

        fetchFreeOptionData,
        updateUserFreePreffer,

        fetchMachineOptionData,
        updateUserMachinePreffer,

        fetchCachedWorkoutsExercises,
        cachedWorkoutsExercises,

        saveGraphicsValues, // premium version
        loadGraphicsValues,

        loadWeightProgression,
        saveWeightProgression,

        saveStatisticsItens, // premium version
        loadStatisticsItens,

        user,
        premiumUserContract,

        workoutsCategories,
        workouts,
        myWorkoutDataArray,
        myWorkout,

        isLogging,
        isWaitingApiResponse,
        isLoadingUserStorageData,

        graphicsValues,
        statisticsItens,

        cachedExerciseHistoryData,
        cachedUserWorkoutsLog,
        weightProgression,

        cachedVideoTable,
        contract,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
