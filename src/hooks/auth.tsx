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
  where,
} from 'firebase/firestore'

import {
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from 'firebase/auth'

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'

import {
  ICachedWorkoutsWithLastUpdatedTimestamp,
  AuthContextData,
  AuthProviderProps,
  ICachedExerciseHistoryData,
  IGraphicsValues,
  IWorkoutInfo,
  IWorkoutsData,
  IUser,
  IStatisticsItens,
  IUserWorkoutsLog,
  ICachedVideoTable,
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
  IUserEquipamentData,
  IUserGymInfo,
  IUserPersonalTrainerContract,
  IUserLevel,
  IUserPhotoProps,
} from './authTypes'

import {
  IFreeSelectItem,
  ILevelSelectData,
  IMachineSelectItem,
  IptBrUs,
  IPulleySelectItem,
} from './selectOptionsDataFirebaseTypes'

import { IWorkoutCategory } from '@src/@types/navigation'

import {
  addDaysToTimestamp,
  addWeeksToTimestamp,
} from '@utils/calculeEndDateWithWeeks'

const db = getFirestore(firebaseApp)

const USER_SIGNIN_COLLECTION = '@myfitflow:signin'

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(null)
  const [userEquipaments, setUserEquipaments] =
    useState<IUserEquipamentData | null>(null)
  const [userGymInfo, setUserGymInfo] = useState<IUserGymInfo | null>(null)
  const [userPersonalTrainerContract, setUserPersonalTrainerContract] =
    useState<IUserPersonalTrainerContract | null>(null)

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

  // isso ta fazendo backup com o ID do exercicio
  const [cachedUserWorkoutsLog, setCachedUserWorkoutsLog] =
    useState<IUserWorkoutsLog | null>(null)

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

  // parar de salvar no servidor e deixar hardcoded
  // incluir os gifs no celular
  async function firebaseAnonymousSignUp(selectedLanguage: 'pt-br' | 'us') {
    const anonimousData: IUser = {
      id: `123`,
      name: null,
      name_insensitive: null,
      birthdate: null,
      email: null,
      whatsappNumber: null,
      photo: null,
      isNewUser: false,
      anonymousUser: true,
      selectedLanguage,
      premiumContractId: null,
      createdAt: null,
      updatedAt: null,
      trainingStartDate: null, // formato: 'YYYY-MM-DD' ou timestamp
      trainingLevel: null, // 'iniciante' | 'intermediario' | 'avancado'
    }

    setUser(anonimousData)
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
            id,
            name,
            name_insensitive,
            birthdate,
            email,
            whatsappNumber,
            photo,
            isNewUser,
            anonymousUser,
            selectedLanguage,
            premiumContractId,
            createdAt,
            updatedAt,
            trainingLevel,
            trainingStartDate,
          } = docSnap.data() as IUser

          const userData: IUser = {
            id,
            name,
            name_insensitive,
            birthdate,
            email,
            whatsappNumber,
            photo,
            isNewUser,
            anonymousUser,
            selectedLanguage,
            premiumContractId,
            createdAt,
            updatedAt,
            trainingStartDate, // Add appropriate value or keep null
            trainingLevel, // Add appropriate value or keep null
          }

          await AsyncStorage.setItem(
            USER_SIGNIN_COLLECTION,
            JSON.stringify(userData),
          )

          setUser(userData)

          loadLoginInitialCachedWorkoutsData(id)
        } else {
          // dados foram criados local por conta da new account
          // mas nao foram salvos no banco
          // esperando usuario confirmar email
          //
          let newAccountCachedData: IUnconfirmedUserData | null =
            await loadNewUserTempUnconfirmedData(account.user.uid)

          if (!newAccountCachedData) {
            newAccountCachedData = {
              email,
              password,
              name: 'novo usuario',
              birthdate: '01/01/2000',
              selectedLanguage,
            }
          }

          const responseUserData =
            await firebaseSignUpWithUserAndPopulateDatabase(
              account.user.uid,
              email,
              password,
              newAccountCachedData.name,
              newAccountCachedData.birthdate,
              newAccountCachedData.selectedLanguage,
            )
          if (responseUserData) {
            await AsyncStorage.setItem(
              USER_SIGNIN_COLLECTION,
              JSON.stringify(responseUserData),
            )

            setUser(responseUserData)
          }
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
  //* parei aqui , ta criando ja os dados como quero , agora ver o fluxo do app ver como ta o app */
  async function firebaseSignUpWithUserAndPopulateDatabase(
    accountUserUid: string,
    email: string,
    password: string,
    name: string,
    birthdate: string,
    selectedLanguage: 'pt-br' | 'us',
  ) {
    setIsWaitingApiResponse(true)

    const userDoc = doc(db, 'users', accountUserUid)
    const usersEquipamentDoc = doc(
      db,
      'users',
      accountUserUid,
      'equipamentData',
      'equipamentFilter',
    )

    const usersGymInfoDoc = doc(
      db,
      'users',
      accountUserUid,
      'gymData',
      'gymInfo',
    )

    const premiumContractId =
      await createNewContractWithPremiumPersonalUpdateUserClientId(
        accountUserUid,
      )

    const updatedTime = serverTimestamp()

    if (!premiumContractId) {
      Alert.alert(
        selectedLanguage === 'pt-br'
          ? 'erro premium bonus'
          : 'erro premium bonus',
      )
      return
    }

    const userData: IUser = {
      id: accountUserUid,
      name,
      name_insensitive: name.toLocaleLowerCase().trim(),
      birthdate,
      email,
      whatsappNumber: null,
      photo: null,
      isNewUser: true,
      anonymousUser: false,
      selectedLanguage,
      premiumContractId,
      createdAt: updatedTime,
      updatedAt: updatedTime,
      trainingStartDate: null, // Add appropriate value or keep null
      trainingLevel: null, // Add appropriate value or keep null
    }
    const equipamentData = generateDefaultEquipamentData()
    const gymInfoData = generateDefaultGymInfoData()

    const responseUserData = await setDoc(userDoc, userData)
      .then(async () => {
        await setDoc(usersEquipamentDoc, equipamentData).then(() => {
          setUserEquipaments(equipamentData)
        })
        await setDoc(usersGymInfoDoc, gymInfoData).then(() => {
          setUserGymInfo(gymInfoData)
        })
        Alert.alert(
          selectedLanguage === 'pt-br'
            ? 'Conta criada com sucesso!'
            : 'Account created successfully!',
        )

        firebaseSignIn(email, password, selectedLanguage)
        return userData
      })
      .catch((error) => {
        console.log(error.code)
        return null
      })
      .finally(() => {
        setIsWaitingApiResponse(false)
      })

    return responseUserData
    function generateDefaultEquipamentData() {
      const freeData: IFreeSelectData = {
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
        data: {
          machineSelectData: [
            {
              machine_insensitive: { 'pt-br': 'todos', us: 'all' },
            },
          ],
        },
      }

      const equipamentData: IUserEquipamentData = {
        createdAt: updatedTime,
        updatedAt: updatedTime,
        freeData,
        machineData,
        pulleyData,
      }
      return equipamentData
    }

    function generateDefaultGymInfoData() {
      const goal = null
      const sessionsByWeek = null
      const timeBySession = null

      const muscleFocus = {
        muscleSelectedData: [
          {
            'pt-br': `equilibrado`,
            us: `balanced`,
          },
        ],
      }

      const gymName = null
      const whenStartedAtGym = null
      const level = null

      const gymInfoData: IUserGymInfo = {
        goal,
        level, // Add the 'level' property with a default value
        sessionsByWeek,
        timeBySession,
        muscleFocus,
        gymName,
        whenStartedAtGym,
        createdAt: updatedTime,
        updatedAt: updatedTime,
      }
      return gymInfoData
    }
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

  // TODO upload foto server and deleter

  async function uploadUserProfilePhoto(filePath: string) {
    if (!user) return null
    const userId = user?.id
    setIsWaitingApiResponse(true)

    console.log(` entreou em uploadcartegoryimage...`)
    const storage = getStorage()
    if (!user) return null

    const imagesReference = ref(storage, `/users/${userId}/photo/${userId}`)
    const imageResponse = await fetch(filePath)
    const imageBlob = await imageResponse.blob()

    const responsePhotoUrlDownload = await uploadBytes(
      imagesReference,
      imageBlob,
    )
      .then(async (image_response) => {
        const imagePath = image_response.metadata.fullPath
        const photoUrlDownload = await getDownloadURL(ref(storage, imagePath))
        setIsWaitingApiResponse(false)
        console.log(`atualizando foto...`)

        return photoUrlDownload
      })
      .catch((err) => {
        setIsWaitingApiResponse(false)
        console.error(err)
      })
    return responsePhotoUrlDownload
  }

  // TODO vai servir quando deletar o perfil
  async function deleteUserProfilePhoto(
    fileName: string,
    MIME: string,
    oldThumbnailUrlDownload: string,
  ) {
    const storage = getStorage()

    if (!user) return
    const userId = user?.id

    const imageReference = ref(storage, `/users/${userId}/photo/${userId}`)

    if (oldThumbnailUrlDownload) {
      await deleteObject(imageReference)
      console.log(`deletando foto... deleteWorkoutCategoryImageIfExists`)
    } else {
      console.log(
        `else dentro de deleteWorkoutImageIfExists em FirebaseContext, nao deletou`,
      )
    }
  }

  async function updateUserForm(data: IUserFormProps) {
    setIsWaitingApiResponse(true)
    const userRef = collection(db, 'users')

    const { name, birthdate, whatsappNumber } = data

    if (!user) return
    const { id } = user

    // criar uma condicao no comeco , que se envviar o path da antiga foto , apagar do storage ela
    const updatedAt = serverTimestamp()

    await updateDoc(doc(userRef, id), {
      name,
      birthdate,
      whatsappNumber,
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
          name,
          birthdate,
          whatsappNumber,
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

  async function updateUserPhoto(data: IUserPhotoProps) {
    setIsWaitingApiResponse(true)
    const userRef = collection(db, 'users')

    const { photo } = data

    if (!user) return
    const { id } = user

    // criar uma condicao no comeco , que se envviar o path da antiga foto , apagar do storage ela
    const updatedAt = serverTimestamp()

    // criar hook que jogaa foto e recebe a url

    await updateDoc(doc(userRef, id), {
      photo,
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
          photo,
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
    setIsWaitingApiResponse(true)
    await updateDoc(doc(userRef, id), {
      selectedLanguage: language,
      updatedAt,
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
      .catch((err) => {
        console.error(err)
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
      ).then(() => {
        setUser(updatedUser)
      })
    }

    // criar uma condicao no comeco , que se envviar o path da antiga foto , apagar do storage ela

    Alert.alert(
      user?.selectedLanguage === 'pt-br'
        ? 'Dados alterados com sucesso!'
        : 'Data changed successfully!',
    )
  }

  async function updateUserLevelPreffer(userLevel: IUserLevel) {
    if (!user || !userGymInfo) return
    console.log('updateUserLevelPreffer')
    const { levelSelectedData } = userLevel
    const flevel = { levelSelectedData }

    setIsWaitingApiResponse(true)

    const userRef = doc(db, 'users', user.id, 'gymData', 'gymInfo')
    const servertimestamp = serverTimestamp()
    console.log('updateUserLevelPreffer 1')

    try {
      await updateDoc(userRef, {
        level: flevel,
        updatedAt: servertimestamp,
      })

      const updatedUser: IUserGymInfo = {
        ...userGymInfo,
        level: { levelSelectedData },
      }

      saveUserGymInfo(updatedUser)
      console.log('updateUserLevelPreffer 2')

      Alert.alert(
        user?.selectedLanguage === 'pt-br'
          ? 'Dados alterados com sucesso!'
          : 'Data changed successfully!',
      )
    } catch (err) {
      console.error(err)
    } finally {
      setIsWaitingApiResponse(false)
    }
  }

  async function updateUserGoalPreffer(userGoal: IUserGoal) {
    if (!user || !userGymInfo) return

    const { goalSelectedData } = userGoal
    const fgoal = { goalSelectedData }

    setIsWaitingApiResponse(true)

    const userRef = doc(db, 'users', user.id, 'gymData', 'gymInfo')
    const servertimestamp = serverTimestamp()

    try {
      await updateDoc(userRef, {
        goal: fgoal,
        updatedAt: servertimestamp,
      })

      const updatedUser: IUserGymInfo = {
        ...userGymInfo,
        goal: { goalSelectedData },
      }

      saveUserGymInfo(updatedUser)

      Alert.alert(
        user?.selectedLanguage === 'pt-br'
          ? 'Dados alterados com sucesso!'
          : 'Data changed successfully!',
      )
    } catch (err) {
      console.error(err)
    } finally {
      setIsWaitingApiResponse(false)
    }
  }

  async function updateUserGoalFocusMusclePreffer(
    muscleFocus: IUserMuscleFocus,
  ) {
    if (!user || !userGymInfo) return

    const { muscleSelectedData } = muscleFocus
    const fmuscleFocus = { muscleSelectedData }

    setIsWaitingApiResponse(true)

    const userRef = doc(db, 'users', user.id, 'gymData', 'gymInfo')
    const servertimestamp = serverTimestamp()

    try {
      await updateDoc(userRef, {
        muscleFocus: fmuscleFocus,
        updatedAt: servertimestamp,
      })

      const updatedUser: IUserGymInfo = {
        ...userGymInfo,
        muscleFocus: { muscleSelectedData },
      }

      saveUserGymInfo(updatedUser)

      Alert.alert(
        user?.selectedLanguage === 'pt-br'
          ? 'Dados alterados com sucesso!'
          : 'Data changed successfully!',
      )
    } catch (err) {
      console.error(err)
    } finally {
      setIsWaitingApiResponse(false)
    }
  }

  async function updateUserFrequencyByWeekPreffer(
    userSessionsByWeek: IUserSessionsByWeek,
  ) {
    if (!user || !userGymInfo) return

    const { sessionsByWeekSelectedData, sessionsByWeekNumber } =
      userSessionsByWeek
    const fbyweek = { sessionsByWeekSelectedData, sessionsByWeekNumber }

    setIsWaitingApiResponse(true)

    const userRef = doc(db, 'users', user.id, 'gymData', 'gymInfo')
    const servertimestamp = serverTimestamp()

    try {
      await updateDoc(userRef, {
        sessionsByWeek: fbyweek,
        updatedAt: servertimestamp,
      })

      const updatedUser: IUserGymInfo = {
        ...userGymInfo,
        sessionsByWeek: { sessionsByWeekSelectedData, sessionsByWeekNumber },
      }

      saveUserGymInfo(updatedUser)

      Alert.alert(
        user?.selectedLanguage === 'pt-br'
          ? 'Dados alterados com sucesso!'
          : 'Data changed successfully!',
      )
    } catch (err) {
      console.error(err)
    } finally {
      setIsWaitingApiResponse(false)
    }
  }

  async function updateUserTimeBySessionPreffer(
    userTimeBySession: IUserTimeBySession,
  ) {
    if (!user || !userGymInfo) return

    const { timeBySessionSelectedData, timeBySessionByWeekRangeNumber } =
      userTimeBySession
    const fbysession = {
      timeBySessionSelectedData,
      timeBySessionByWeekRangeNumber,
    }

    setIsWaitingApiResponse(true)

    const userRef = doc(db, 'users', user.id, 'gymData', 'gymInfo')
    const servertimestamp = serverTimestamp()

    try {
      await updateDoc(userRef, {
        timeBySession: fbysession,
        updatedAt: servertimestamp,
      })

      const updatedUser: IUserGymInfo = {
        ...userGymInfo,
        timeBySession: {
          timeBySessionSelectedData,
          timeBySessionByWeekRangeNumber,
        },
      }

      saveUserGymInfo(updatedUser)

      Alert.alert(
        user?.selectedLanguage === 'pt-br'
          ? 'Dados alterados com sucesso!'
          : 'Data changed successfully!',
      )
    } catch (err) {
      console.error(err)
    } finally {
      setIsWaitingApiResponse(false)
    }
  }

  async function fetchMuscleOptionData() {
    const muscleSelectDataRef = doc(db, 'selectOptionsData', `muscle`)
    setIsWaitingApiResponse(true)
    const docSnapshot = await getDoc(muscleSelectDataRef)

    if (docSnapshot.exists()) {
      const initialData = docSnapshot.data() as IMuscleSelectData
      setIsWaitingApiResponse(false)
      return initialData
    } else {
      setIsWaitingApiResponse(false)
      return null
    }
  }

  async function checkIfFriendAlreadyAccepted(friendId: string) {
    if (!user) return null
    setIsWaitingApiResponse(true)
    const userId = user.id
    const friendRequestStatusDataRef = doc(
      db,
      'users',
      userId,
      'friendRequests',
      friendId,
    )

    const docSnapshot = await getDoc(friendRequestStatusDataRef)

    if (docSnapshot.exists()) {
      const initialData = docSnapshot.data() as { accepted: boolean }
      setIsWaitingApiResponse(false)
      return {
        accepted: initialData.accepted,
      }
    } else {
      setIsWaitingApiResponse(false)
      return null
    }
  }

  async function fetchFriendList() {
    if (!user) return null
    const userId = user.id
    const friendListCollectionRef = collection(
      db,
      'users',
      userId,
      'friendList',
    )

    try {
      const querySnapshot = await getDocs(friendListCollectionRef)
      const friendList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      return friendList
    } catch (error) {
      console.error('Erro ao buscar a lista de amigos:', error)
      setIsWaitingApiResponse(false)
      return null
    }
  }

  async function fetchFriendRequestsList() {
    if (!user) return null
    const userId = user.id
    const friendRequestCollectionRef = collection(
      db,
      'users',
      userId,
      'friendRequests',
    )

    const q = query(friendRequestCollectionRef, where('accepted', '==', false))

    const querySnapshot = await getDocs(q)

    const receivedRequests = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return receivedRequests
  }

  async function fetchReceivedRequestsList() {
    if (!user) return null

    const userId = user.id
    const friendRequestCollectionRef = collection(
      db,
      'users',
      userId,
      'receivedRequests',
    )
    const q = query(friendRequestCollectionRef, where('accepted', '==', false))

    const querySnapshot = await getDocs(q)

    const receivedRequests = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return receivedRequests
  }

  async function sendFriendRequest(friendId: string) {
    if (!user) return null
    const userId = user.id
    setIsWaitingApiResponse(true)

    const timeNow = new Date().getTime()

    // Referência para quem enviou (Usuário A)
    // Referência para quem recebeu (Usuário B)
    const sentRef = doc(db, 'users', userId, 'friendRequests', friendId)
    const receivedRef = doc(db, 'users', friendId, 'receivedRequests', userId)

    try {
      const data = {
        accepted: false,
        createdAt: timeNow,
        updatedAt: timeNow,
      }

      // Salva nos dois usuários
      await Promise.all([setDoc(sentRef, data), setDoc(receivedRef, data)])
      setIsWaitingApiResponse(false)

      return data
    } catch (error) {
      setIsWaitingApiResponse(false)
      console.error(error)
      return null
    }
  }

  async function acceptFriendRequest(friendId: string) {
    if (!user) return null
    const userId = user.id
    setIsWaitingApiResponse(true)

    const timeNow = new Date().getTime()

    try {
      // Atualiza as solicitações de amizade
      const updateSuccess = await updateFriendRequests(
        userId,
        friendId,
        timeNow,
      )
      if (!updateSuccess) return false

      // Adiciona os usuários à lista de amigos de ambos
      const addSuccess = await addToFriendList(userId, friendId, timeNow)
      if (!addSuccess) return false

      setIsWaitingApiResponse(false)
      return true
    } catch (error) {
      setIsWaitingApiResponse(false)

      console.error(error)
      return false
    }
    async function updateFriendRequests(
      userId: string,
      friendId: string,
      timeNow: number,
    ): Promise<boolean> {
      const sentRequestRef = doc(
        db,
        'users',
        friendId,
        'friendRequests',
        userId,
      ) // convite aceito
      const ownRequestRef = doc(db, 'users', userId, 'friendRequests', friendId) // convite aceito
      const receivedRef = doc(db, 'users', userId, 'receivedRequests', friendId) // convite deleta

      const data = {
        accepted: true,
        updatedAt: timeNow,
      }

      const data2 = {
        accepted: true,
        updatedAt: timeNow,
        creted: timeNow,
      }
      setIsWaitingApiResponse(true)
      const updateResults = await Promise.allSettled([
        setDoc(ownRequestRef, data2),
        updateDoc(sentRequestRef, data),
        deleteDoc(receivedRef),
      ])

      const updateErrors = updateResults.filter(
        (result) => result.status === 'rejected',
      )
      if (updateErrors.length > 0) {
        console.error(
          'Erro ao atualizar as solicitações de amizade:',
          updateErrors,
        )
        setIsWaitingApiResponse(false)
        return false
      }

      setIsWaitingApiResponse(false)
      return true
    }

    async function addToFriendList(
      userId: string,
      friendId: string,
      timeNow: number,
    ): Promise<boolean> {
      const friendListUserRef = doc(db, 'users', userId, 'friendList', friendId)
      const friendListFriendRef = doc(
        db,
        'users',
        friendId,
        'friendList',
        userId,
      )

      const friendData = {
        friendId,
        createdAt: timeNow,
        updatedAt: timeNow,
      }

      const userFriendData = {
        friendId: userId,
        createdAt: timeNow,
        updatedAt: timeNow,
      }
      setIsWaitingApiResponse(true)
      const addResults = await Promise.allSettled([
        setDoc(friendListUserRef, friendData),
        setDoc(friendListFriendRef, userFriendData),
      ])

      const addErrors = addResults.filter(
        (result) => result.status === 'rejected',
      )
      if (addErrors.length > 0) {
        console.error('Erro ao adicionar à lista de amigos:', addErrors)
        setIsWaitingApiResponse(false)
        return false
      }
      setIsWaitingApiResponse(false)
      return true
    }
  }

  async function cancelFriendRequest(friendId: string) {
    if (!user) return null
    setIsWaitingApiResponse(true)
    const userId = user.id

    // Referências para deletar a solicitação nos dois usuários
    const sentRequestsDataRef = doc(
      db,
      'users',
      friendId,
      'receivedRequests',
      userId,
    )
    const receivedRequestsDataRef = doc(
      db,
      'users',
      userId,
      'friendRequests',
      friendId,
    )

    try {
      // Remove a solicitação de ambos os lados
      await Promise.all([
        deleteDoc(sentRequestsDataRef),
        deleteDoc(receivedRequestsDataRef),
      ])
      console.log(`usuario ${userId} - amigo ${friendId}`)
      setIsWaitingApiResponse(false)
      return true
    } catch (error) {
      setIsWaitingApiResponse(false)
      console.error(error)
      return false
    }
  }

  async function declineReceivedRequest(friendId: string) {
    if (!user) return null
    setIsWaitingApiResponse(true)

    const userId = user.id

    // Referências para deletar a solicitação nos dois usuários
    const sentRequestsDataRef = doc(
      db,
      'users',
      userId,
      'receivedRequests',
      friendId,
    )
    const receivedRequestsDataRef = doc(
      db,
      'users',
      friendId,
      'friendRequests',
      userId,
    )

    try {
      // Remove a solicitação de ambos os lados
      await Promise.all([
        deleteDoc(sentRequestsDataRef),
        deleteDoc(receivedRequestsDataRef),
      ])
      console.log(`usuario ${userId} - amigo ${friendId}`)

      setIsWaitingApiResponse(false)
      return true
    } catch (error) {
      setIsWaitingApiResponse(false)

      console.error(error)
      return false
    }
  }

  async function deleteFriend(friendId: string) {
    if (!user) return null
    setIsWaitingApiResponse(true)

    const userId = user.id

    const userFriendListRef = doc(db, 'users', userId, 'friendList', friendId)
    const friendFriendListRef = doc(db, 'users', friendId, 'friendList', userId)

    const ownRqRef = doc(db, 'users', userId, 'friendRequests', friendId) // convite aceito
    const friendRqRef = doc(db, 'users', friendId, 'friendRequests', userId) // convite feito

    const ownRvdRef = doc(db, 'users', userId, 'receivedRequests', friendId) // convite aceito
    const friendRvdRef = doc(db, 'users', friendId, 'receivedRequests', userId) // convite feito

    setIsWaitingApiResponse(true)
    try {
      const updateResults = await Promise.allSettled([
        deleteDoc(userFriendListRef),
        deleteDoc(friendFriendListRef),

        deleteDoc(ownRqRef),
        deleteDoc(friendRqRef),

        deleteDoc(ownRvdRef),
        deleteDoc(friendRvdRef),
      ])
      const errors = updateResults.filter(
        (result) => result.status === 'rejected',
      )
      if (errors.length > 0) {
        console.error('Erro ao deletar referências de amizade:', errors)
        setIsWaitingApiResponse(false)
        return false
      }

      console.log(
        `Amizade removida com sucesso: usuário ${userId} - amigo ${friendId}`,
      )
      setIsWaitingApiResponse(false)
      return true
    } catch (error) {
      setIsWaitingApiResponse(false)
      console.error('Erro inesperado ao deletar amizade:', error)

      console.error(error)
      return false
    }
  }

  async function fetchListOfUsers(text: string) {
    if (!user) return null
    setIsWaitingApiResponse(true)
    const userId = user.id
    const usersCollectionRef = collection(db, 'users')
    const q = query(
      usersCollectionRef,
      where('name_insensitive', '>=', text),
      where('name_insensitive', '<=', text + '\uf8ff'),
    )

    const querySnapshot = await getDocs(q)

    const fetchUsers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as IUser[]

    const removeCurrentUser = fetchUsers.filter((fuser) => fuser.id !== userId)
    setIsWaitingApiResponse(false)
    return removeCurrentUser
  }

  async function fetchUserInfo(id: string) {
    if (!user) return null
    setIsWaitingApiResponse(true)

    const usersCollectionRef = doc(db, 'users', id)

    const docSnapshot = await getDoc(usersCollectionRef)

    if (docSnapshot.exists()) {
      setIsWaitingApiResponse(false)
      const initialData = docSnapshot.data() as IUser
      return initialData
    } else {
      setIsWaitingApiResponse(false)
      return null
    }
  }

  async function fetchLevelOptionData() {
    const muscleSelectDataRef = doc(db, 'selectOptionsData', `level`)
    setIsWaitingApiResponse(true)

    const docSnapshot = await getDoc(muscleSelectDataRef)

    if (docSnapshot.exists()) {
      const initialData = docSnapshot.data() as ILevelSelectData
      setIsWaitingApiResponse(false)
      return initialData
    } else {
      setIsWaitingApiResponse(false)
      return null
    }
  }

  async function fetchGoalOptionData() {
    const muscleSelectDataRef = doc(db, 'selectOptionsData', `goal`)

    setIsWaitingApiResponse(true)
    const docSnapshot = await getDoc(muscleSelectDataRef)
    if (docSnapshot.exists()) {
      const initialData = docSnapshot.data() as IGoalSelectData
      setIsWaitingApiResponse(false)
      return initialData
    } else {
      setIsWaitingApiResponse(false)
      return null
    }
  }

  async function fetchFrequencyByWeekOptionData() {
    const muscleSelectDataRef = doc(db, 'selectOptionsData', `frequencybyweek`)
    setIsWaitingApiResponse(true)
    const docSnapshot = await getDoc(muscleSelectDataRef)

    if (docSnapshot.exists()) {
      const initialData = docSnapshot.data() as IFrequencybyweekSelectData
      setIsWaitingApiResponse(false)
      return initialData
    } else {
      setIsWaitingApiResponse(false)
      return null
    }
  }

  async function fetchTimeBySessionOptionData() {
    const muscleSelectDataRef = doc(db, 'selectOptionsData', `timebysession`)
    setIsWaitingApiResponse(true)

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
    setIsWaitingApiResponse(true)

    const docSnapshot = await getDoc(freeSelectDataRef)
    if (docSnapshot.exists()) {
      const initialData = docSnapshot.data() as IFreeSelectData
      setIsWaitingApiResponse(false)
      return initialData
    } else {
      setIsWaitingApiResponse(false)
      return null
    }
  }

  async function fetchPulleyOptionData() {
    const pulleySelectDataRef = doc(db, 'selectOptionsData', `pulley`)
    setIsWaitingApiResponse(true)

    const docSnapshot = await getDoc(pulleySelectDataRef)

    if (docSnapshot.exists()) {
      const initialData = docSnapshot.data() as IPulleySelectData
      setIsWaitingApiResponse(false)
      return initialData
    } else {
      setIsWaitingApiResponse(false)
      return null
    }
  }

  async function updateUserFreePreffer(data: IFreeSelectItem) {
    if (!userEquipaments) return
    if (!user) return

    const freeData = {
      data,
    }

    if (!freeData) return
    /// users/bST2FN4W7sTLMlvWZlhPez288FD2/equipamentData/equipamentFilter
    const userRef = doc(
      db,
      'users',
      user.id,
      'equipamentData',
      'equipamentFilter',
    ) // rota
    const servertimestamp = serverTimestamp()

    setIsWaitingApiResponse(true)

    await updateDoc(userRef, {
      freeData,
      updatedAt: servertimestamp,
    })
      .then(async () => {
        if (!user) {
          setIsWaitingApiResponse(false)
          return
        }

        const updatedFreeData: IUserEquipamentData = {
          ...userEquipaments,
          freeData,
          updatedAt: servertimestamp,
        }

        saveUserEquipments(updatedFreeData)
      })
      .catch((err) => {
        console.error(err)
        setIsWaitingApiResponse(false)
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
      setIsWaitingApiResponse(true)
      const docSnapshot = await getDoc(paginatedCategoriesRef)
      if (docSnapshot.exists()) {
        //  const _machineData = docSnapshot.data() as IMachineSelectItem[]
        const _machineData = docSnapshot.data() as IMachineSelectData
        setIsWaitingApiResponse(false)
        return _machineData
      } else {
        setIsWaitingApiResponse(false)
        console.log('Nenhum contrato encontrado.')
        return null
      }
    } catch (error) {
      setIsWaitingApiResponse(false)
      console.error('Error fetching machineData:', error)
      throw error
    }
  }

  async function updateUserPulleyPreffer(data: IPulleySelectItem) {
    if (!userEquipaments) return
    if (!user) return

    const servertimestamp = serverTimestamp()

    const pulleyData = {
      data,
    }

    if (!pulleyData) return
    /// users/bST2FN4W7sTLMlvWZlhPez288FD2/equipamentData/equipamentFilter
    const userRef = doc(
      db,
      'users',
      user.id,
      'equipamentData',
      'equipamentFilter',
    ) // rota

    setIsWaitingApiResponse(true)

    await updateDoc(userRef, {
      pulleyData,
      updatedAt: servertimestamp,
    })
      .then(async () => {
        if (!user) {
          setIsWaitingApiResponse(false)
          return
        }

        const updatedPulleyData: IUserEquipamentData = {
          ...userEquipaments,
          pulleyData,
          updatedAt: servertimestamp,
        }

        saveUserEquipments(updatedPulleyData)

        Alert.alert(
          user?.selectedLanguage === 'pt-br'
            ? 'Dados alterados com sucesso!'
            : 'Data changed successfully!',
        )
      })
      .catch((err) => {
        console.error(err)
        setIsWaitingApiResponse(false)
      })
      .finally(() => {
        setIsWaitingApiResponse(false)
      })
  }

  async function updateUserMachinePreffer(data: IMachineSelectItem) {
    if (!userEquipaments) return

    if (!user) return

    const servertimestamp = serverTimestamp()

    let machineData: IMachineSelectData = {}

    if (userEquipaments.machineData) {
      machineData = {
        data,
      }
    }

    if (!machineData) return

    const userRef = doc(
      db,
      'users',
      user.id,
      'equipamentData',
      'equipamentFilter',
    ) // rota

    setIsWaitingApiResponse(true)

    await updateDoc(userRef, {
      machineData,
      updatedAt: servertimestamp,
    })
      .then(async () => {
        if (!user) {
          setIsWaitingApiResponse(false)
          return
        }

        const updatedMachineData: IUserEquipamentData = {
          ...userEquipaments,
          machineData,
          updatedAt: servertimestamp,
        }

        saveUserEquipments(updatedMachineData)
      })
      .catch((err) => {
        console.error(err)
        setIsWaitingApiResponse(false)
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
    setIsWaitingApiResponse(true)
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
    setIsWaitingApiResponse(false)
    // fazer um fetch aqui passando qual eu quero , no caso vai receber 2 parametros
    // o grupo muscular e o tipo , free, pulley ou machine
  }

  async function createNewContractWithPremiumPersonalUpdateUserClientId(
    userId: string,
  ) {
    setIsWaitingApiResponse(true)

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
        setIsWaitingApiResponse(false)

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
    setIsWaitingApiResponse(true)
    const docSnapshot = await getDoc(muscleSelectDataRef)

    if (docSnapshot.exists()) {
      const initialData = docSnapshot.data() as IPremiumUserContract
      savePremiumUserData(initialData)
      setIsWaitingApiResponse(false)
      return initialData
    } else {
      setIsWaitingApiResponse(false)
      return null
    }
  }

  async function loadUserPersonalTrainerContract(): Promise<IUserPersonalTrainerContract | null> {
    const userId = user?.id
    if (!userId) return null
    const userPersonalTrainerContractDoc = doc(
      db,
      'users',
      userId,
      'personalTrainerData',
      'personalTrainerContract',
    )
    setIsWaitingApiResponse(true)

    const personalTrainerContractSnap = await getDoc(
      userPersonalTrainerContractDoc,
    )

    if (!personalTrainerContractSnap.exists()) {
      setIsWaitingApiResponse(false)

      return null
    }

    const {
      createdAt,
      anabol,
      clientId,
      personalTrainerContractId,
      personalTrainerId,
      restrictions,
      submissionPending,
      updatedAt,
    } = personalTrainerContractSnap.data() as IUserPersonalTrainerContract

    setIsWaitingApiResponse(false)
    return {
      createdAt,
      anabol,
      clientId,
      personalTrainerContractId,
      personalTrainerId,
      restrictions,
      submissionPending,
      updatedAt,
    }
  }

  async function saveUserPersonalTrainerContract(
    personalTrainerContract: IUserPersonalTrainerContract,
  ) {
    if (!personalTrainerContract) return
    const userId = user?.id
    if (!userId) return

    const USER_PERSONALTRIANERCONTRACT_COLLECTION = `@myfitflow:userlocaldata-personaltrainercontract-${userId}`

    if (personalTrainerContract) {
      setUserPersonalTrainerContract(personalTrainerContract)
      await AsyncStorage.setItem(
        USER_PERSONALTRIANERCONTRACT_COLLECTION,
        JSON.stringify(personalTrainerContract),
      )
    }
  }

  async function loadUserGymInfo(): Promise<IUserGymInfo | null> {
    const userId = user?.id
    if (!userId) return null
    const usersGymInfoDoc = doc(db, 'users', userId, 'gymData', 'gymInfo')
    setIsWaitingApiResponse(true)
    const gymInfoSnap = await getDoc(usersGymInfoDoc)

    if (!gymInfoSnap.exists()) {
      console.error('Informações da academia não encontradas.')
      setIsWaitingApiResponse(false)
      return null
    }

    const {
      createdAt,
      goal,
      gymName,
      muscleFocus,
      sessionsByWeek,
      timeBySession,
      updatedAt,
      level,

      whenStartedAtGym,
    } = gymInfoSnap.data() as IUserGymInfo
    setIsWaitingApiResponse(false)
    return {
      createdAt,
      goal,
      gymName,
      muscleFocus,
      sessionsByWeek,
      timeBySession,
      updatedAt,
      level,
      whenStartedAtGym,
    }
  }

  async function saveUserGymInfo(gymInfo: IUserGymInfo) {
    if (!gymInfo) return
    const userId = user?.id
    if (!userId) return

    const USER_GYMINFO_COLLECTION = `@myfitflow:userlocaldata-gyminfo-${userId}`

    if (gymInfo) {
      setUserGymInfo(gymInfo)
      await AsyncStorage.setItem(
        USER_GYMINFO_COLLECTION,
        JSON.stringify(gymInfo),
      )
    }
  }
  async function loadUserEquipments(): Promise<IUserEquipamentData | null> {
    const userId = user?.id
    if (!userId) return null

    const usersEquipamentDoc = doc(
      db,
      'users',
      userId,
      'equipamentData',
      'equipamentFilter',
    )
    setIsWaitingApiResponse(true)
    const equipamentSnap = await getDoc(usersEquipamentDoc)

    if (!equipamentSnap.exists()) {
      setIsWaitingApiResponse(false)
      console.error('Equipamentos não encontrados.')
      return null
    }

    const { createdAt, freeData, machineData, pulleyData, updatedAt } =
      equipamentSnap.data() as IUserEquipamentData
    setIsWaitingApiResponse(false)

    return {
      createdAt,
      freeData,
      machineData,
      pulleyData,
      updatedAt,
    }
  }
  async function saveUserEquipments(equipamentsInfo: IUserEquipamentData) {
    if (!equipamentsInfo) return
    const userId = user?.id
    if (!userId) return

    const USER_EQUIPAMENTS_COLLECTION = `@myfitflow:userlocaldata-equipaments-${userId}`

    if (equipamentsInfo) {
      setUserEquipaments(equipamentsInfo)
      await AsyncStorage.setItem(
        USER_EQUIPAMENTS_COLLECTION,
        JSON.stringify(equipamentsInfo),
      )
    }
  }

  // hook para sincronizar cache de log de treinos

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
    const name = user?.id
    const birthdate = user?.id
    if (!userId) return
    if (!name) return
    if (!birthdate) return

    const newContract = {
      createdAt: updatedAt,
      updatedAt,
      submissionPending: true,
      submissionApproved: false,
      userId,
      userName: name,
      birthdate,
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
        setIsWaitingApiResponse(false)
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
        setIsWaitingApiResponse(false)
        console.log(error.code)
      })
      .finally(() => {
        setIsWaitingApiResponse(false)
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
    setIsWaitingApiResponse(true)

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
        setIsWaitingApiResponse(false)

        return updatedState
      } else {
        console.log('Nenhum contrato encontrado.')
        setIsWaitingApiResponse(false)
        return null
      }
    } catch (error) {
      setIsWaitingApiResponse(false)
      console.error('Erro ao buscar contrato:', error)
      // Retorna um array vazio em caso de erro
      return null
    }
  }
  // TODO
  async function loadPersonalTrainerData() {
    if (!user) return null

    console.log(
      `carregar personal trainer data, falta fazer , carregar os dados do personal trainer`,
    )

    return
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
    console.log(
      `save 2239 personal trainer data, falta fazer , carregar os dados do personal trainer`,
    )

    return
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
    updatedAt: number,
    lastCompletedFormattedDay: IptBrUs,
    lastCompletedFormattedDate: string,
    cardIndex: number,
  ): Promise<void> {
    console.log('updateCachedUserWorkoutsLog', workoutId)

    const userId = getUserId()
    if (!userId) {
      console.error('ID do usuário não está disponível.')
      return
    }

    const storageKey = `@myfitflow:userlocal-cachedweightdone-${userId}`
    const cachedLog =
      cachedUserWorkoutsLog || (await createUserWorkoutLog(updatedAt))
    if (!cachedLog) return

    const logIndex = cachedLog.workoutsLog.findIndex(
      (log) => log.workoutId === workoutId,
    )

    // create
    if (logIndex === -1) {
      const workoutCardsLogData: IWorkoutCardLogData = {
        cardIndex,
        weightDoneLogs: [newExercise],
        totalSessionsCompleted: 1,
        updatedAt,
        createdAt: updatedAt,
        lastCompletedFormattedDay,
        lastCompletedFormattedDate,
      }

      const formattedData = {
        workoutCardsLogData: [workoutCardsLogData],
        workoutId,
        createdAt: updatedAt,
        updatedAt,
      }

      cachedLog.workoutsLog.push(formattedData)
    } else {
      // update
      const cardLogIndex = cachedLog.workoutsLog[
        logIndex
      ].workoutCardsLogData.findIndex((log) => log.cardIndex === cardIndex)

      if (cardLogIndex === -1) {
        const workoutCardsLogData: IWorkoutCardLogData = {
          cardIndex,
          weightDoneLogs: [newExercise],
          totalSessionsCompleted: 1,
          updatedAt,
          createdAt: updatedAt,
          lastCompletedFormattedDay,
          lastCompletedFormattedDate,
        }

        cachedLog.workoutsLog[logIndex].workoutCardsLogData.push(
          workoutCardsLogData,
        )
      } else {
        cachedLog.workoutsLog[logIndex].workoutCardsLogData[
          cardLogIndex
        ].weightDoneLogs[cardLogIndex] = {
          ...cachedLog.workoutsLog[logIndex].workoutCardsLogData[cardLogIndex]
            .weightDoneLogs[cardLogIndex],
          ...newExercise,
        }
      }

      cachedLog.workoutsLog[logIndex].updatedAt = updatedAt
      cachedLog.updatedAt = updatedAt

      /* funcao abaixo nao ta adicionando mais itens do array  */
    }

    if (cachedLog) {
      await saveToStorage(storageKey, cachedLog)
      setCachedUserWorkoutsLog(cachedLog)
    }

    async function updateExistingWorkoutLog(
      workoutLogs: IWorkoutLog[],
      newExercise: ICachedCardExerciseData,
      logIndex: number,
      updatedAt: number,
      lastCompletedFormattedDay: IptBrUs,
      lastCompletedFormattedDate: string,
      cardIndex: number,
    ): Promise<IUserWorkoutsLog | null> {
      const cardLogIndex = workoutLogs[logIndex].workoutCardsLogData.findIndex(
        (log) => log.cardIndex === cardIndex,
      )

      const cardLog = workoutLogs[logIndex].workoutCardsLogData[cardLogIndex]

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
        workoutLogs[logIndex].updatedAt = updatedAt
      }

      cardLog.totalSessionsCompleted += 1
      cardLog.updatedAt = updatedAt
      cardLog.lastCompletedFormattedDay = lastCompletedFormattedDay
      cardLog.lastCompletedFormattedDate = lastCompletedFormattedDate

      const userId = getUserId()
      if (!userId) return null
      console.log(`isNewWorkoutLog`, existingExerciseIndex)

      workoutLogs[logIndex].workoutCardsLogData[cardLogIndex] = cardLog

      const finalData = {
        workoutsLog: workoutLogs,
        createdAt: cardLog.createdAt,
        updatedAt,
        userId,
      }
      return finalData
    }

    async function createUserWorkoutLog(
      updatedAt: number,
    ): Promise<IUserWorkoutsLog | null> {
      const userId = getUserId()
      if (!userId) return null

      const newLog: IUserWorkoutsLog = {
        workoutsLog: [],
        userId,
        createdAt: updatedAt,
        updatedAt,
      }

      return newLog
    }

    async function saveToStorage(
      key: string,
      data: IUserWorkoutsLog,
    ): Promise<void> {
      await AsyncStorage.setItem(key, JSON.stringify(data))
    }

    function getUserId(): string | null {
      return user?.id || null
    }
  }

  async function saveCachedUserWorkoutsLog(
    updatedCache: IUserWorkoutsLog,
  ): Promise<void> {
    const userId = getUserId()
    console.log(`saveCachedUserWorkoutsLog`)

    const storageKey = `@myfitflow:userlocal-cachedweightdone-${userId}`
    await saveToStorage(storageKey, updatedCache)
    setCachedUserWorkoutsLog(updatedCache)

    async function saveToStorage(
      key: string,
      data: IUserWorkoutsLog,
    ): Promise<void> {
      await AsyncStorage.setItem(key, JSON.stringify(data))
    }

    function getUserId(): string | null {
      return user?.id || null
    }
  }

  /// apagarCached()
  async function apagarCached() {
    AsyncStorage.getAllKeys().then((keys) => AsyncStorage.multiRemove(keys))
  }

  // fazer se inspirando no notes
  async function loadCachedUserGymInfo(userId: string) {
    const storageGymInfoKey = `@myfitflow:userlocaldata-gyminfo-${userId}`

    try {
      const storedCachedGymInfoString =
        await AsyncStorage.getItem(storageGymInfoKey)

      if (!storedCachedGymInfoString) {
        const response = await loadUserGymInfo()
        if (response) {
          saveUserGymInfo(response)
        }
      }

      if (storedCachedGymInfoString) {
        const gymInfoData = JSON.parse(storedCachedGymInfoString)

        if (gymInfoData) {
          setUserGymInfo(gymInfoData) // Atualiza o estado com os dados carregados
        }
      }
    } catch (error) {
      // console.error('Erro ao carregar as informações de resumo:', error)
    }
  }
  async function loadCachedUserPersonalContract(userId: string) {
    const storageEquipamentsKey = `@myfitflow:userlocaldata-personaltrainercontract-${userId}`

    try {
      const storedCachedEquipamentsString = await AsyncStorage.getItem(
        storageEquipamentsKey,
      )

      if (!storedCachedEquipamentsString) {
        const response = await loadUserPersonalTrainerContract()
        if (response) {
          saveUserPersonalTrainerContract(response)
        }
      }

      if (storedCachedEquipamentsString) {
        const equipamentsData = JSON.parse(storedCachedEquipamentsString)

        setUserEquipaments(equipamentsData) // Atualiza o estado com os dados carregados
      }
    } catch (error) {
      // console.error('Erro ao carregar as informações de resumo:', error)
    }
  }

  async function loadCachedUserEquipaments(userId: string) {
    const storageEquipamentsKey = `@myfitflow:userlocaldata-equipaments-${userId}`

    try {
      const storedCachedEquipamentsString = await AsyncStorage.getItem(
        storageEquipamentsKey,
      )

      if (!storedCachedEquipamentsString) {
        const response = await loadUserEquipments()
        if (response) {
          saveUserEquipments(response)
        }
      }

      if (storedCachedEquipamentsString) {
        const equipamentsData = JSON.parse(storedCachedEquipamentsString)

        setUserEquipaments(equipamentsData) // Atualiza o estado com os dados carregados
      }
    } catch (error) {
      // console.error('Erro ao carregar as informações de resumo:', error)
    }
  }
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

      const updatedTime = new Date().getTime()

      const updatedMyWorkoutsCachedData = await saveLocalData(
        formattedWorkoutsDataArray,
        _workouts,
        updatedTime,
      )
      console.log(`updatedMyWorkoutsCachedData`, updatedMyWorkoutsCachedData)
      if (updatedMyWorkoutsCachedData) {
        saveFirebaseMyWorkout(updatedMyWorkoutsCachedData, updatedTime)
      }

      Alert.alert(
        user?.selectedLanguage === 'pt-br'
          ? 'Seu treino foi adicionado com sucesso!'
          : 'Your workout was added successfully!',
      )
      setIsWaitingApiResponse(false)

      return true
    } else {
      setIsWaitingApiResponse(false)

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
  }

  async function saveFirebaseMyWorkout(data: IMyWorkouts, _updatedAt: number) {
    if (!user) return

    const userId = user.id

    const workoutDataCacheDoc = doc(
      db,
      'users',
      userId,
      'workoutDataMyWorkout',
      'updatedData',
    )

    const workoutUpdatedDataCacheDoc = doc(
      db,
      'users',
      userId,
      'workoutDataMyWorkout',
      'myWorkoutData',
    )
    setIsWaitingApiResponse(true)

    try {
      const docSnap = await getDoc(workoutDataCacheDoc)

      const getDateFromTimeStamp = new Date(_updatedAt)

      if (!docSnap.exists()) {
        await setDoc(workoutDataCacheDoc, {
          createdAt: getDateFromTimeStamp,
          updatedAt: getDateFromTimeStamp,
        })
      } else {
        await updateDoc(workoutDataCacheDoc, {
          updatedAt: getDateFromTimeStamp,
        })
      }
      await setDoc(workoutUpdatedDataCacheDoc, data)
      setIsWaitingApiResponse(false)
    } catch (error) {
      setIsWaitingApiResponse(false)

      console.log(error)
    }
  }

  async function updateUserFirebaseWorkoutCache(
    data: IUserWorkoutsLog,
    updatedAt: number,
  ) {
    if (!user) return

    const userId = user.id

    const workoutDataCacheDoc = doc(
      db,
      'users',
      userId,
      'workoutDataCache',
      'updatedData',
    )

    const workoutCacheDoc = doc(
      db,
      'users',
      userId,
      'workoutDataCache',
      'cachedData',
    )
    setIsWaitingApiResponse(true)

    try {
      const docSnap = await getDoc(workoutDataCacheDoc)

      const getDateFromTimeStamp = new Date(updatedAt)

      if (!docSnap.exists()) {
        console.log(`n existe`)
        await setDoc(workoutDataCacheDoc, {
          createdAt: getDateFromTimeStamp,
          updatedAt: getDateFromTimeStamp,
        })
      } else {
        console.log(`  existe`)

        await updateDoc(workoutDataCacheDoc, {
          updatedAt: getDateFromTimeStamp,
        })
      }
      data.updatedAt = updatedAt
      await setDoc(workoutCacheDoc, data)
      setIsWaitingApiResponse(false)
    } catch (error) {
      setIsWaitingApiResponse(false)

      console.log(error)
    }
  }
  // TODO
  async function getLastUpdatedAtUserWorkoutCache() {
    if (!user) return null

    const userId = user.id

    const workoutDataCacheDoc = doc(
      db,
      'users',
      userId,
      'workoutDataCache',
      'updatedData',
    )
    setIsWaitingApiResponse(true)

    try {
      const docSnap = await getDoc(workoutDataCacheDoc)

      if (!docSnap.exists()) {
        setIsWaitingApiResponse(false)

        return null
      }

      const data = docSnap.data() as IWorkoutLog

      if (!data) {
        setIsWaitingApiResponse(false)

        return null
      }
      if (!data.updatedAt) {
        setIsWaitingApiResponse(false)

        return null
      }

      const getDateFromTimeStamp = new Date(
        data.updatedAt.seconds * 1000 + data.updatedAt.nanoseconds / 1000000,
      )
      console.log(
        `TODO getDateFromTimeStamp tem algo? 3125 `,
        getDateFromTimeStamp,
      )
      return getDateFromTimeStamp.getTime()
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async function fetchworkoutDataCache() {
    if (!user) return null

    const userId = user.id

    const workoutCacheDoc = doc(
      db,
      'users',
      userId,
      'workoutDataCache',
      'cachedData',
    )
    setIsWaitingApiResponse(true)
    try {
      const docSnap = await getDoc(workoutCacheDoc)

      if (!docSnap.exists()) {
        setIsWaitingApiResponse(false)

        return null
      }

      const data = docSnap.data() as IUserWorkoutsLog

      if (!data) {
        setIsWaitingApiResponse(false)

        return null
      }
      setIsWaitingApiResponse(false)

      return data
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async function saveLocalData(
    formattedWorkoutsDataArray: IWorkoutInfo,
    _workouts: IMyfitflowWorkoutInUse,
    updatedAt: number,
  ) {
    exerciseData(updatedAt)
    const updatedExercisesCard = await exerciseCard(updatedAt)

    if (updatedExercisesCard) {
      return updatedExercisesCard
    }

    async function exerciseData(updatedAt: number) {
      await saveExerciseDataInLocalCache(formattedWorkoutsDataArray, updatedAt) // nao vai pro firebase / so local
    }

    async function exerciseCard(updatedAt: number) {
      const _myWorkoutExercises = await upsertWorkoutCache(_workouts, updatedAt)
      if (!_myWorkoutExercises) return null

      await saveMyWorkoutInCache(_myWorkoutExercises)

      return _myWorkoutExercises
      // upsertWorkoutCache
    }

    async function saveMyWorkoutInCache(_myWorkouts: IMyWorkouts) {
      if (!user) return
      const userId = user.id

      const workoutKey = `@myfitflow:cachedworkout-${userId}`

      await AsyncStorage.setItem(workoutKey, JSON.stringify(_myWorkouts))
      setMyWorkout(_myWorkouts)
    }
    async function upsertWorkoutCache(
      workoutData: IMyfitflowWorkoutInUse,
      updatedAt: number,
    ) {
      if (!user) return null
      const userId = user.id

      let myWorkoutExercises: IMyWorkouts | null

      if (myWorkout) {
        myWorkoutExercises = updateExistingWorkout(workoutData, updatedAt)
      } else {
        myWorkoutExercises = createNewWorkoutData(
          userId,
          workoutData,
          updatedAt,
        )
      }

      return myWorkoutExercises

      function updateExistingWorkout(
        workoutData: IMyfitflowWorkoutInUse,
        updatedAt: number,
      ) {
        if (!myWorkout) return null

        const workoutIndex = myWorkout.data.findIndex(
          (workout) => workout.id === workoutData.workoutId,
        )

        const copyMyWorkout = {
          ...myWorkout,
        }

        if (workoutIndex !== -1) {
          // Atualiza o workout existente
          copyMyWorkout.data[workoutIndex] = {
            ...copyMyWorkout.data[workoutIndex],
            data: workoutData,
            updatedAt,
          }
        } else {
          // Adiciona um novo workout

          copyMyWorkout.data.push({
            id: workoutData.workoutId || '',
            data: workoutData,
            createdAt: updatedAt,
            updatedAt,
            isShared: false,
            isActive: false,
            isExpired: false,
            isCopied: false,
          })
        }

        return copyMyWorkout
      }

      function createNewWorkoutData(
        userId: string,
        workoutData: IMyfitflowWorkoutInUse,
        updatedAt: number,
      ): IMyWorkouts {
        // Exemplo de uso:

        // const formattedCurrentDate = formatDateToDDMMYYYY(currentDate)

        return {
          userId,
          createdAt: updatedAt,
          updatedAt,
          data: [
            {
              id: workoutData.workoutId || '',
              data: workoutData,
              createdAt: updatedAt,
              updatedAt,
              isShared: false,
              isActive: true,
              isExpired: false,
              isCopied: false,
            },
          ],
          activeData: [
            {
              id: workoutData.workoutId || '',
              createdAt: updatedAt,
              updatedAt,
              workoutStartAt: updatedAt,
              workoutEndsAt: addWeeksToTimestamp(
                updatedAt,
                workoutData.workoutPeriod.periodNumber,
              ),
            },
          ],
          expiredData: [],
          mySharedWorkouts: [],
          copiedWorkouts: [],
        }
      }
    }
  }

  async function saveExerciseDataInLocalCache(
    exerciseData: IWorkoutInfo,
    updatedAt: number,
  ) {
    if (!user) return
    const userId = user.id
    const workoutExercisesKey = `@myfitflow:cachedworkoutexercises-${userId}`

    let myWorkoutDataExercises: IMyWorkoutsData | null

    if (myWorkoutDataArray) {
      myWorkoutDataExercises = updateExistingExercise(exerciseData, updatedAt)
    } else {
      myWorkoutDataExercises = createNewExerciseData(
        userId,
        exerciseData,
        updatedAt,
      )
    }

    if (myWorkoutDataExercises) {
      await AsyncStorage.setItem(
        workoutExercisesKey,
        JSON.stringify(myWorkoutDataExercises),
      )
      setMyWorkoutDataArray(myWorkoutDataExercises)
    }
    // Salva os exercícios atualizados no AsyncStorage

    function updateExistingExercise(
      exerciseData: IWorkoutInfo,
      updatedAt: number,
    ) {
      if (!myWorkoutDataArray) return null
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
          updatedAt,
        }
      } else {
        // Adiciona um novo exercício
        copyMyWorkoutDataArray.data.push({
          id: exerciseData.workoutId,
          data: exerciseData,
          createdAt: updatedAt,
          updatedAt,
        })
      }

      return copyMyWorkoutDataArray
    }

    function createNewExerciseData(
      userId: string,
      exerciseData: IWorkoutInfo,
      updatedAt: number,
    ) {
      console.log(`dataDoestNotExists`)
      return {
        userId,
        createdAt: updatedAt,
        updatedAt,
        data: [
          {
            id: exerciseData.workoutId,
            data: exerciseData,
            createdAt: updatedAt,
            updatedAt,
          },
        ],
      }
    }
  }

  async function updateMyWorkoutInCache(data: IMyWorkouts) {
    if (!user) return
    if (!myWorkout) return
    const userId = user.id

    if (!user) return
    const workoutKey = `@myfitflow:cachedworkout-${userId}`

    if (data) {
      await AsyncStorage.setItem(workoutKey, JSON.stringify(data))
      setMyWorkout(data)
    }
  }

  async function updateStartAndEndDateFromMyWorkoutInCache(
    workoutData: IMyfitflowWorkoutInUse,
    startDate: number,
  ) {
    if (!user) return
    if (!myWorkout) return
    const userId = user.id

    if (!user) return
    const workoutKey = `@myfitflow:cachedworkout-${userId}`

    // Tenta buscar o MyWorkouts existente
    const myWorkoutExercises = updateExistingWorkout(workoutData, startDate)

    if (myWorkoutExercises) {
      await AsyncStorage.setItem(workoutKey, JSON.stringify(myWorkoutExercises))
      setMyWorkout(myWorkoutExercises)
    }

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

        const newStartDate = addDaysToTimestamp(previousEndDate, 1) // proximo dia livre
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
    setIsWaitingApiResponse(true)

    await resetStateCache()
    await deleteExerciseDataInCache(userId, workoutId)
    await deleteMyWorkoutInCache(userId, workoutId)
    setIsWaitingApiResponse(false)

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
        JSON.stringify(copyMyWorkoutDataArray),
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
      const newWorkoutDataOrder = copyMyWorkout.activeData.filter(
        (v) => v.id !== workoutId,
      )

      // Atualiza o objeto copyMyWorkout com o novo array de workouts
      copyMyWorkout.data = newWorkoutDataArray
      copyMyWorkout.activeData = newWorkoutDataOrder

      // Salva os dados atualizados no AsyncStorage
      await AsyncStorage.setItem(workoutKey, JSON.stringify(copyMyWorkout))

      // Atualiza o estado com os dados atualizados
      setMyWorkout(copyMyWorkout)
    }
  }

  // TODO nemto iusando
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
    setIsWaitingApiResponse(true)

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
          cachedLastWorkoutUpdatedAt: lUpdatedTimestamp,
          data,
          lastUpdatedAt: lUpdated.getTime(),
        }

        return formattedData
      })
      .catch((error) => {
        console.log(error)
      })

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

      const cachedUserData = JSON.parse(storedUser) as IUser

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

    async function updateUserState(userData: IUser) {
      if (!userData) return
      setUser(userData)
    }

    // armazena em cache meu usuario logado

    /* async function checkForUpdates(userData: IUser) {
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

      const newUserData = docSnap.data() as IUser
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

      async function updateStoredUser(newUserData: IUser) {
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
    await loadCachedUserGymInfo(userId)
    await loadCachedUserEquipaments(userId)
    await loadCachedUserPersonalContract(userId)
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

        updateMyWorkoutInCache,
        saveFirebaseMyWorkout,

        updateUserFirebaseWorkoutCache,
        fetchworkoutDataCache,

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
        saveCachedUserWorkoutsLog,
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
        updateUserPhoto,
        uploadUserProfilePhoto,
        updateUserSelectedLanguage,
        updateLocalCacheAnonymousUserSelectedLanguage,
        updateUserGoalPreffer,
        updateUserLevelPreffer,
        updateUserGoalFocusMusclePreffer,
        updateUserFrequencyByWeekPreffer,
        updateUserTimeBySessionPreffer,

        getLastUpdatedAtUserWorkoutCache,

        fetchMuscleOptionData,
        checkIfFriendAlreadyAccepted,

        fetchFriendList,
        fetchFriendRequestsList,
        fetchFrequencyByWeekOptionData,
        fetchGoalOptionData,
        fetchLevelOptionData,
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

        fetchListOfUsers,
        fetchUserInfo,
        sendFriendRequest,
        acceptFriendRequest,
        cancelFriendRequest,
        declineReceivedRequest,
        deleteFriend,
        fetchReceivedRequestsList,

        loadUserGymInfo,
        saveUserGymInfo,
        loadUserEquipments,
        saveUserEquipments,

        user,
        userEquipaments,
        userGymInfo,
        userPersonalTrainerContract,
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
