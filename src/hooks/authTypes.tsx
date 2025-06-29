import { FieldValue, Timestamp, serverTimestamp } from 'firebase/firestore'
import { ReactNode } from 'react'
import {
  IFreeSelectItem,
  ILevelSelectData,
  IMachineSelectItem,
  IPulleySelectItem,
} from './selectOptionsDataFirebaseTypes'
import { IWorkoutCategory } from '@src/@types/navigation'

export type ServerTimestamp = Timestamp | ReturnType<typeof serverTimestamp>
export interface IptBrUs {
  'pt-br': string
  us: string
}

export interface IUnconfirmedUserData {
  email: string
  password: string
  name: string
  birthdate: string
  selectedLanguage: 'pt-br' | 'us'
}
export type IExerciseItems =
  | `bar`
  | `bench`
  | `machine`
  | `other`
  | `pulley`
  | `pulleyHandles`
  | `weight`

export type IUserFormProps = {
  birthdate: string
  email: string
  name: string
  whatsappNumber: string
}
export type IUserPhotoProps = {
  photo: string
}

export interface FilterItem {
  key: string
  value: string
  group: string
}
export interface FinalDataItem {
  data: { key: string; value: string }[]
  group: string
}

export type IUserGoal = {
  goalSelectedData: IptBrUs
}
export interface IUserLevel {
  levelSelectedData: IptBrUs
}

export type IEquipamentsFilters = {
  bar: IptBrUs[]
  bench: IptBrUs[]
  machine: IptBrUs[]
  other: IptBrUs[]
  pulley: IptBrUs[]
  pulleyHandles: IptBrUs[]
  weight: IptBrUs[]
}

export interface IMachineSelectData {
  data?: IMachineSelectItem
}
export interface IFreeSelectData {
  data?: IFreeSelectItem
}
export type IPulleySelectData = {
  data?: IPulleySelectItem
}

export type IUserMuscleFocus = {
  muscleSelectedData?: IptBrUs[]
}
export interface IMuscleSelectItem {
  muscle_insensitive: IptBrUs
}
export interface IMuscleSelectData {
  data: IMuscleSelectItem[]
}
export type IUserFreeEquipament = {
  freeSelectedData?: IptBrUs[]
  updatedAt?: FieldValue
  createdAt?: FieldValue
}

export type IUserSessionsByWeek = {
  sessionsByWeekSelectedData: IptBrUs
  sessionsByWeekNumber: number
}

export type IUserTimeBySession = {
  timeBySessionSelectedData?: IptBrUs
  timeBySessionByWeekRangeNumber?: number[]
}

export interface IGoalSelectItem {
  goal_insensitive: IptBrUs
}

export interface IGoalSelectData {
  data: IGoalSelectItem[]
}

export interface ITimeBySessionSelectItem {
  timeBySessionRangeNumber: number[]
  timeBySession_insensitive: IptBrUs
}

export interface ITimeBySessionSelectData {
  data: ITimeBySessionSelectItem[]
}

export interface IFrequencybyweekSelectItem {
  sessionsByWeekNumber: number
  sessionsByWeek_insensitive: IptBrUs
}

export interface IFrequencybyweekSelectData {
  data: IFrequencybyweekSelectItem[]
}

export type IUser2 = {
  id: string

  name: string
  name_insensitive: string
  birthdate: string
  email: string
  whatsappNumber: string
  photoBase64?: string

  isNewUser: boolean
  submissionPending: boolean
  anonymousUser: boolean
  selectedLanguage: 'pt-br' | 'us'

  goal: IUserGoal
  whenStartedAtGym: string
  sessionsByWeek: IUserSessionsByWeek
  timeBySession: IUserTimeBySession
  muscleFocus: IUserMuscleFocus
  gym: string // gymName
  restrictions: string
  anabol: string // ??
  clientId: string | null

  premiumPlanActive: boolean
  premiumContractId: string | null
  personalTrainerContractId: string | null
  personalTrainerId: string | null

  freeData?: IFreeSelectData
  pulleyData?: IPulleySelectData
  machineData?: IMachineSelectData

  createdAt: ServerTimestamp
  updatedAt: ServerTimestamp
} /*       trainingStartDate: '', // formato: 'YYYY-MM-DD' ou timestamp
trainingLevel: '', // 'iniciante' | 'intermediario' | 'avancado' */
export type IUser = {
  id: string
  name: string | null
  name_insensitive: string | null
  birthdate: string | null
  email: string | null

  whatsappNumber: string | null
  photo: string | null
  trainingStartDate: string | null
  trainingLevel: string | null

  isNewUser: boolean
  anonymousUser: boolean
  selectedLanguage: 'pt-br' | 'us'

  premiumContractId: string | null
  createdAt: ServerTimestamp | null
  updatedAt: ServerTimestamp | null
}
/* IUserPersonalTrainerContract IUserGymInfo IUserEquipamentData */
// criar doc dentro de user
// cria quando for contratar um personal apenas
export interface IUserPersonalTrainerContract {
  submissionPending: boolean
  personalTrainerContractId: string | null
  personalTrainerId: string | null
  clientId: string | null // ver se preciso realmente disso
  anabol: string // ??
  restrictions: string
  createdAt: FieldValue
  updatedAt: FieldValue
}
// criar doc dentro de user
export interface IUserGymInfo {
  goal: IUserGoal | null
  level: IUserLevel | null
  sessionsByWeek: IUserSessionsByWeek | null
  timeBySession: IUserTimeBySession | null
  muscleFocus: IUserMuscleFocus | null

  gymName: null
  whenStartedAtGym: null

  createdAt: FieldValue
  updatedAt: FieldValue
}
// criar doc dentro de user
export interface IUserEquipamentData {
  freeData: IFreeSelectData | null
  pulleyData: IPulleySelectData | null
  machineData: IMachineSelectData | null
  createdAt: FieldValue
  updatedAt: FieldValue
}

export interface IStatisticsItens {
  createdAt: number
  updatedAt: number
  index: number
  statisticName: string
  statisticGoal: string
  statisticValue: string
  statisticMeasure: string
  isOpen: boolean
  isVisible: boolean
}

export interface IGraphicsValues {
  index: number
  statisticName: string
  statisticGoal: string
  statisticData: {
    year: number
    yearData: {
      month: number
      monthData: {
        day: number
        dayData: {
          updatedAt: number
          statisticValue: string
          statisticMeasure: string
        }
      }[]
    }[]
  }[]
}
export interface IGraphicsData {
  data: IGraphicsValues[]
}

export type IExerciseFilters = {
  [key in
    | 'bar'
    | 'bench'
    | 'other'
    | 'weight'
    | 'pulley'
    | 'pulleyHandles'
    | 'machine']: {
    'pt-br': string | null
    us: string | null
  }
}

type ExerciseMode =
  | 'freeEquipament'
  | 'pulleyEquipament'
  | 'machineEquipament'
  | string
  | ''

export interface IExercisesProps {
  exerciseName_insensitive: IptBrUs
  exerciseInfo: IptBrUs

  exerciseVideoMIME?: string
  exerciseVideoFileName?: string
  exerciseVideoUrl?: string

  exerciseThumbnailMIME?: string
  exerciseThumbnailFileName?: string
  exerciseThumbnailUrl?: string

  exerciseVideoSize?: number

  exerciseMode?: ExerciseMode
  exerciseFilters: IExerciseFilters

  exerciseMuscleGroup?: { 'pt-br': string | null; us: string | null }

  exerciseId?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}
export type ICachedFiltersExercise = {
  [key in IExerciseItems]: {
    'pt-br': string | null
    us: string | null
  }
}

export interface ISetsProps {
  index?: number
  sets_insensitive: string
  isReps: boolean
  isTime: boolean
  timeInSeconds: number
}

export interface ICachedSetsProps extends ISetsProps {
  createdAt: number
  updatedAt: number
}
export interface IRestTimeProps {
  index?: number
  restTime_insensitive: {
    'pt-br': string
    us: string
  }
  restTimeNumber: number
}

export interface ICachedRestTimeProps extends IRestTimeProps {
  createdAt: number
  updatedAt: number
}
export interface ITchiesProps {
  index?: number
  description: {
    us: string
    'pt-br': string
  }
}

export interface ICachedTchiesProps extends ITchiesProps {
  createdAt: number
  updatedAt: number
}
export interface IPropsSets {
  repetitionData: ISetsProps[] // [{ sets_insensitive: string; isReps: boolean; isTime: boolean; timeInSeconds: number }]
  restTimeData: IRestTimeProps // { restTime_insensitive: { 'pt-br': string; us: string }; restTimeNumber: number }
  techiesData: ITchiesProps // { description: { us: string; 'pt-br': string }; title: { 'pt-br': string; us: string } }
}

export interface ICardExerciseData {
  // isEnabled: boolean
  id?: string

  workoutExerciseId?: string
  workoutExerciseIndex?: number
  workoutExerciseName?: IptBrUs
  workoutExerciseName_insensitive?: IptBrUs
  workoutTechiesTittle?: IptBrUs
  workoutExerciseSets?: IPropsSets[]

  workoutExerciseTypes?: string
  workoutExercisePrimaryMuscleGroup?: IptBrUs
  workoutExerciseFilters?: ICachedFiltersExercise
  createdAt?: number
  updatedAt?: number
}

export interface IFormattedCardExerciseData extends ICardExerciseData {
  workoutExerciseName_insensitive: IptBrUs
  workoutExerciseInfo: IptBrUs
  workoutExerciseVideoMIME: string | undefined
  workoutExerciseVideoFileName: string | undefined
  workoutExerciseVideoUrl: string | undefined
  workoutExerciseThumbnailMIME: string | undefined
  workoutExerciseThumbnailFileName: string | undefined
  workoutExerciseThumbnailUrl: string | undefined
  workoutExerciseVideoSize: number | undefined
  workoutExerciseMode: string | undefined
  workoutExerciseFilters: IExerciseFilters
  workoutExerciseMuscleGroup:
    | {
        'pt-br': string | null
        us: string | null
      }
    | undefined

  workoutExerciseId: string | undefined
}

export interface IWorkoutExercisesFirebase {
  exerciseName_insensitive: IptBrUs
  exerciseInfo: IptBrUs
  exerciseVideoMIME: string | undefined
  exerciseVideoFileName: string | undefined
  exerciseVideoUrl: string | undefined
  exerciseThumbnailMIME: string | undefined
  exerciseThumbnailFileName: string | undefined
  exerciseThumbnailUrl: string | undefined
  exerciseVideoSize: number | undefined
  exerciseMode: string | undefined
  exerciseFilters: IExerciseFilters
  exerciseMuscleGroup:
    | {
        'pt-br': string | null
        us: string | null
      }
    | undefined

  exerciseId: string | undefined
}

export interface IWorkoutsData {
  index: number
  cardExerciseLabel: string
  cardExerciseData: IFormattedCardExerciseData[]
  cardExerciseUniquesMuscles: IptBrUs[]
}

export interface IWorkoutInfo {
  workoutSequence: { index: number; label: string }[]
  workoutsData: IWorkoutsData[]
  workoutId: string
}
export interface IMyWorkoutsDataItem {
  id: string
  data: IWorkoutInfo
  createdAt: number
  updatedAt: number
}
export interface IMyWorkoutsData {
  userId: string
  createdAt: number
  updatedAt: number
  data: IMyWorkoutsDataItem[]
}

// Ou, se as chaves são sempre strings que representam números, você pode usar
export type ILocalCardExerciseFilters = {
  bar: IptBrUs[]
  bench: IptBrUs[]
  machine: IptBrUs[]
  other: IptBrUs[]
  pulley: IptBrUs[]
  pulleyHandles: IptBrUs[]
  weight: IptBrUs[]
}
export interface IMyfitflowWorkoutInUse {
  workoutId?: string

  personalTrainerId?: string
  personalTrainerName?: string

  referencePendingWorkoustId?: string
  workoutActive: boolean
  workoutCategoryId?: string
  referenceMyfitflowWorkoutId?: string
  workoutPlanType?: string

  workoutsUniquesFilters: ILocalCardExerciseFilters
  workoutsUniquesMuscles: IptBrUs[]
  workoutsUniquesTypes: string[]

  workoutMuscleFocus: IptBrUs[]
  workoutInfo?: string

  workoutDivision: {
    division: string
    divisionNumber: number
  }
  workoutCardPhoto?: {
    photoFilePath: string
    photoMIME: string
    photoFileName: string
  }
  workoutCategoryName?: {
    'pt-br'?: string
    us?: string
  }
  workoutGoal: {
    'pt-br': string
    us: string
  }
  workoutGender: {
    'pt-br': string
    us: string
  }
  workoutLevel: {
    'pt-br': string
    us: string
  }
  workoutPeriod: {
    period_insensitive: {
      'pt-br': string
      us: string
    }
    periodNumber: number
  }
  workoutByWeek: {
    sessionsByWeek_insensitive: {
      'pt-br': string
      us: string
    }
    sessionsByWeekNumber: number
  }

  workoutTime: {
    timeBySession_insensitive: {
      'pt-br': string
      us: string
    }
    timeBySessionRangeNumber: number[]
  }

  workoutName?: {
    'pt-br'?: string
    us?: string
  }
  workoutDescription?: {
    'pt-br'?: string
    us?: string
  }

  // ---
  createdAt?: { seconds: number; nanoseconds: number }
  updatedAt?: { seconds: number; nanoseconds: number }
}

export interface IMyfitflowWorkoutInUseData {
  id: string
  data: IMyfitflowWorkoutInUse

  isActive: boolean
  isExpired: boolean
  isShared: boolean
  isCopied: boolean

  createdAt: number
  updatedAt: number
}
export interface IMyInUseActiveData {
  id: string
  workoutStartAt: number
  workoutEndsAt: number
  createdAt: number
  updatedAt: number
}
export interface IMyInUseExpiredData {
  id: string
  createdAt: number
  updatedAt: number
}

export interface IMySharedWorkoutsData {
  id: string
  createdAt: number
  updatedAt: number
}

export interface IMyCopiedWorkoutsData {
  id: string
  copiedFromUserId: string
  userOwnerName: string
  createdAt: number
  updatedAt: number
}

export interface IMyWorkouts {
  userId: string
  createdAt: number
  updatedAt: number
  data: IMyfitflowWorkoutInUseData[] // total de treinos
  activeData: IMyInUseActiveData[] // total de treinos
  expiredData: IMyInUseExpiredData[] // total de treinos
  mySharedWorkouts: IMySharedWorkoutsData[] // lista de treinos compartilhados
  copiedWorkouts: IMyCopiedWorkoutsData[] // lista de treinos copiados
}

export type ICachedWorkoutsWithLastUpdatedTimestamp = {
  data: IMyfitflowWorkoutInUse[]
  cachedLastWorkoutUpdatedAt: Timestamp
  lastUpdatedAt: number
}

export interface ExerciseRecord {
  workoutIndex: number
  workoutExerciseIndex: number
  workoutExerciseId: string
  workoutExerciseDoneTimestamp: number
  workoutExerciseWeight: string
  workoutExerciseDone: boolean
}

export interface IPersonal {
  about: string
  age: number
  personalTrainerContractId: string
  createdAt: { nanoseconds: number; seconds: number }
  email: string
  id: string
  isInUse: boolean
  isPersonalTrainer: boolean
  keywords: string[]
  name: string
  name_insensitive: string
  photo: string
  updatedAt: { nanoseconds: number; seconds: number }
  whatsappNumber: string
}

export interface IContract {
  birthdate: string
  createdAt: FieldValue
  submissionApproved: boolean
  submissionPending: boolean
  updatedAt: FieldValue
  userId: string
  userName: string
}

export interface IPremiumUserContract {
  id: string
  createdAt: FieldValue
  updatedAt: FieldValue
  userId: string
  premiumPlanActive: boolean
  premiumBonusStart: {
    startDate: string
    endDate: string
    premiumBonusState: boolean
  }
}

export interface DayRecord {
  [day: string]: ExerciseRecord[]
}

export interface MonthRecord {
  [month: string]: DayRecord
}

export interface YearRecord {
  [year: string]: MonthRecord
}
export interface ICachedUsingWorkoutData {
  // cada exercicio
  repetitionData: ICachedSetsProps[] // [{ sets_insensitive: string; isReps: boolean; isTime: boolean; timeInSeconds: number }]
  restTimeData: ICachedRestTimeProps // { restTime_insensitive: { 'pt-br': string; us: string }; restTimeNumber: number }
  weightData: {
    value: string
    createdAt: number
    updatedAt: number
  }
  selectedRepetitionData: {
    checkedSet: string // 1,2,3
    createdAt: number
    updatedAt: number
  }
  completedData: {
    isCompleted: boolean
    createdAt: number
    updatedAt: number
  }
  /*  */
  createdAt: number
  updatedAt: number
}
export interface ICachedCardExerciseData {
  workoutExerciseId?: string
  workoutExerciseSets?: ICachedUsingWorkoutData[]

  workoutExerciseIndex?: number
  notes: {
    value: string
    createdAt: number
    updatedAt: number
  }

  createdAt: number
  updatedAt: number
}

export interface IWorkoutCardLogData {
  // dentro do card A B C
  cardIndex: number
  weightDoneLogs: ICachedCardExerciseData[]

  totalSessionsCompleted: number

  lastCompletedFormattedDay: IptBrUs
  lastCompletedFormattedDate: string
  createdAt: number
  updatedAt: number
}

export interface IWorkoutLog {
  workoutCardsLogData: IWorkoutCardLogData[] // A B C
  workoutId: string // id do treino que ta dentro de category no firebase
  createdAt: number
  updatedAt: number
}
export interface IUserWorkoutsLog {
  workoutsLog: IWorkoutLog[]
  userId: string
  createdAt: number
  updatedAt: number
}
export type ExerciseHistoryData = YearRecord

export interface ExerciseInterval {
  index: number
  startedAt: number
  endAt: number
  periodGroupBetweenStartAndEnd: number[]
}

export interface Exercise {
  workoutExerciseId: string // item para find
  workoutExerciseIndex: number // item para find
  workoutCardIndex: number // item para find

  workoutExerciseWeight: string[] // fator para montar grafico
  workoutExerciseRestTimeNumber: number // fator para montar grafico
  workoutExerciseSets: string[] // fator para montar grafico
  workoutExerciseRepetition: string

  workoutExerciseMuscleGroup: IptBrUs // fator para montar grafico
  workoutExerciseName_insensitive: IptBrUs // fator para montar grafico
  updatedAt: number
}

export interface DayData {
  day: number
  createdAt: number
  updatedAt: number
  exerciseTotalTime: string
  exerciseIntervals: ExerciseInterval[]
  exercises: Exercise[]
}

export interface MonthData {
  month: number
  createdAt: number
  updatedAt: number
  days: DayData[]
}

export interface YearData {
  year: number
  createdAt: number
  updatedAt: number
  months: MonthData[]
}

export interface ICachedExerciseHistoryData {
  userId: string
  workoutId: string
  createdAt: number
  updatedAt: number
  exerciseHistory: YearData[]
}

export type IExerciseItemType = {
  exerciseId: string
  exerciseName_insensitive: { 'pt-br': string; us: string }
  exerciseFilters: ICachedFiltersExercise
  exerciseType: string
  exerciseMuscle: string
  updatedAt: number
}

export type IExerciseType = {
  freeEquipament?: IExerciseItemType[]
  machineEquipament?: IExerciseItemType[]
  pulleyEquipament?: IExerciseItemType[]
}
export type IMuscleGroups =
  | `abdominals`
  | `back`
  | `biceps`
  | `cardio`
  | `chest`
  | `forearms`
  | `legs`
  | `shoulders`
  | `trapeze`
  | `triceps`

export type IExercise =
  | 'freeEquipament'
  | 'pulleyEquipament'
  | 'machineEquipament'

export type ICachedExerciseList = {
  [key in IMuscleGroups]: IExerciseType
}

export interface INotes {
  workoutIndex: number
  workoutExerciseIndex: number
  workoutExerciseId: string
  notes: string
}

export interface ICachedVideoTable {
  workoutExerciseId: string
  cachedLocalPathVideo: string
  createdAt: number
  updatedAt: number
}

export interface ICachedVideo {
  data: ICachedVideoTable[]
}

export interface AuthProviderProps {
  children: ReactNode
}

export interface AuthContextData {
  firebaseAnonymousSignUp: (selectedLanguage: 'pt-br' | 'us') => Promise<void>
  firebaseCreateUserAndSendEmailVerification: (
    email: string,
    password: string,
  ) => Promise<string | null>

  saveNewUserTempUnconfirmedData: (
    data: IUnconfirmedUserData,
    newUnconfirmedUserId: string,
  ) => Promise<void>

  loadNewUserTempUnconfirmedData: (
    newUnconfirmedUserId: string,
  ) => Promise<IUnconfirmedUserData | null>

  firebaseSignIn: (
    email: string,
    password: string,
    selectedLanguage: 'pt-br' | 'us',
  ) => Promise<void>

  firebaseSignOut: () => Promise<void>

  firebaseForgotPassword: (email: string) => Promise<void>

  loadLoginInitialCachedWorkoutsData: (userId: string) => Promise<void>
  loadMyWorkoutAndmyWorkoutDataArrayAndReturnExercises: (
    data: IMyfitflowWorkoutInUse,
  ) => Promise<boolean>
  deleteMyWorkoutAndmyWorkoutDataArray: (workoutId?: string) => Promise<void>
  premiumUserUpdateProfileUpdatedAt: (workoutsId: string) => Promise<void>

  loadWorkoutsCategories: () => Promise<void>

  loadWorkouts: (
    workoutCategoryId: string,
  ) => Promise<ICachedWorkoutsWithLastUpdatedTimestamp | null>
  loadPersonalsList: () => Promise<void>

  saveWorkouts: (
    workoutCategoryId: string,
    cachedWorkoutsWithUpdatedAt: ICachedWorkoutsWithLastUpdatedTimestamp,
  ) => Promise<void>

  loadCachedWorkouts: (
    workoutCategoryId: string,
  ) => Promise<ICachedWorkoutsWithLastUpdatedTimestamp | null>

  loadCachedExerciseHistoryData: (userId: string) => Promise<void>

  updateStartAndEndDateFromMyWorkoutInCache: (
    workoutData: IMyfitflowWorkoutInUse,
    startDate: number,
  ) => Promise<void>

  updateMyWorkoutInCache: (data: IMyWorkouts) => Promise<void>
  saveFirebaseMyWorkout: (data: IMyWorkouts, updatedAt: number) => Promise<void>

  updateCachedExerciseHistoryData: (
    data: ICachedExerciseHistoryData,
  ) => Promise<void>

  saveCachedUserWorkoutsLog: (updatedCache: IUserWorkoutsLog) => Promise<void>

  updateCachedUserWorkoutsLog: (
    newExercise: ICachedCardExerciseData,
    activeWorkoutId: string,
    activeWorkoutCreatedAt: number,
    updatedAt: number,
    lastCompletedFormattedDay: IptBrUs,
    lastCompletedFormattedDate: string,
    cardIndex: number,
  ) => Promise<void>

  // firebasefetchworkoutDataCache
  updateUserFirebaseWorkoutCache: (data: IUserWorkoutsLog) => Promise<void>
  fetchworkoutDataCache: () => Promise<IUserWorkoutsLog | null>

  getLastUpdatedAtUserWorkoutCache: () => Promise<number>

  loadCachedVideoTable: (userId: string) => Promise<void>
  updateCachedVideoTable: (
    cachedLocalPathVideo: string,
    _exerciseId: string,
  ) => Promise<ICachedVideoTable[] | null>

  loadPersonalTrainerData: () => Promise<IPersonal | null>
  loadPersonalTrainerCachedData: () => Promise<IPersonal | null>
  savePersonalTrainerData: (data: IPersonal) => Promise<void>

  createNewContractWithPersonalUpdateUserClientId: (
    personalTrainerContractId: string,
    personalTrainerData: IPersonal,
  ) => Promise<void>

  cancelNewContractWithPersonalUpdateUserClientId: (
    personalTrainerContractId: string,
    clientId: string,
  ) => Promise<void>

  loadPersonalTrainerClientContract: (
    personalTrainerContractId: string,
    clientId: string,
  ) => Promise<IContract | null>
  updateUserForm: (data: IUserFormProps) => Promise<void>
  updateUserPhoto: (data: IUserPhotoProps) => Promise<void>
  uploadUserProfilePhoto: (filePath: string) => Promise<string | null>

  updateLocalCacheAnonymousUserSelectedLanguage: (
    language: 'pt-br' | 'us',
  ) => Promise<void>
  updateUserSelectedLanguage: (language: 'pt-br' | 'us') => Promise<void>

  loadUserEquipments: () => Promise<IUserEquipamentData | null>
  saveUserEquipments: (equipamentsInfo: IUserEquipamentData) => Promise<void>

  fetchLevelOptionData: () => Promise<ILevelSelectData | null>
  updateUserLevelPreffer: (data: IUserLevel) => Promise<void>

  fetchGoalOptionData: () => Promise<IGoalSelectData | null>
  updateUserGoalPreffer: (data: IUserGoal) => Promise<void>

  fetchFrequencyByWeekOptionData: () => Promise<IFrequencybyweekSelectData | null>
  updateUserFrequencyByWeekPreffer: (data: IUserSessionsByWeek) => Promise<void>

  fetchTimeBySessionOptionData: () => Promise<ITimeBySessionSelectData | null>
  updateUserTimeBySessionPreffer: (data: IUserTimeBySession) => Promise<void>

  fetchMuscleOptionData: () => Promise<IMuscleSelectData | null>
  updateUserGoalFocusMusclePreffer: (data: IUserMuscleFocus) => Promise<void>

  fetchPulleyOptionData: () => Promise<IPulleySelectData | null>
  updateUserPulleyPreffer: (data: IPulleySelectItem) => Promise<void>

  fetchFreeOptionData: () => Promise<IFreeSelectData | null>
  updateUserFreePreffer: (data: IFreeSelectItem) => Promise<void>

  fetchMachineOptionData: () => Promise<IMachineSelectData | null>
  updateUserMachinePreffer: (data: IMachineSelectItem) => Promise<void>

  fetchCachedWorkoutsExercises: () => Promise<void>
  saveGraphicsValues: (data: IGraphicsValues[] | null) => Promise<void>
  loadWeightProgression: (
    userId: string,
  ) => Promise<ICachedExerciseHistoryData[] | null>

  loadGraphicsValues: (userId: string) => Promise<IGraphicsValues[]>
  saveWeightProgression: (
    data: ICachedExerciseHistoryData[] | null,
  ) => Promise<void>

  saveStatisticsItens: (data: IStatisticsItens[] | null) => Promise<void>
  loadStatisticsItens: (userId: string) => Promise<IStatisticsItens[]>
  fetchListOfUsers: (text: string) => Promise<IUser[] | null>

  fetchUserInfo: (id: string) => Promise<IUser | null>
  fetchReceivedRequestsList: () => Promise<{ id: string }[] | null>
  fetchFriendList: () => Promise<{ id: string }[] | null>
  fetchFriendRequestsList: () => Promise<{ id: string }[] | null>

  checkIfFriendAlreadyAccepted: (id: string) => Promise<null | {
    accepted: boolean
  }>
  sendFriendRequest: (friendId: string) => Promise<{
    accepted: boolean
    createdAt: number
    updatedAt: number
  } | null>
  cancelFriendRequest: (friendId: string) => Promise<boolean | null>
  declineReceivedRequest: (friendId: string) => Promise<boolean | null>
  deleteFriend: (friendId: string) => Promise<boolean | null>
  acceptFriendRequest: (friendId: string) => Promise<boolean | null>

  user: IUser | null
  userEquipaments: IUserEquipamentData | null
  userGymInfo: IUserGymInfo | null
  userPersonalTrainerContract: IUserPersonalTrainerContract | null

  personalsList: IPersonal[] | null
  workoutsCategories: IWorkoutCategory[] | null
  workouts: ICachedWorkoutsWithLastUpdatedTimestamp | null
  myWorkoutDataArray: IMyWorkoutsData | null
  myWorkout: IMyWorkouts | null
  premiumUserContract: IPremiumUserContract | null

  isLogging: boolean
  isWaitingApiResponse: boolean
  isLoadingUserStorageData: boolean

  graphicsValues: IGraphicsValues[] | null
  statisticsItens: IStatisticsItens[] | null

  cachedExerciseHistoryData: ICachedExerciseHistoryData | null
  cachedUserWorkoutsLog: IUserWorkoutsLog | null
  weightProgression: ICachedExerciseHistoryData[] | null

  cachedWorkoutsExercises: ICachedExerciseList | null

  cachedVideoTable: ICachedVideoTable[] | null

  contract: IContract | null
  personalData: IPersonal | null
}
