import { IWorkoutInfo } from '@hooks/auth'
import { IPersonal, IptBrUs, IMyfitflowWorkoutInUse } from '@hooks/authTypes'
import { Timestamp } from 'firebase/firestore'
export type IExerciseItems =
  | `bar`
  | `bench`
  | `machine`
  | `other`
  | `pulley`
  | `pulleyHandles`
  | `weight`

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
export interface IRestTimeProps {
  index?: number
  restTime_insensitive: {
    'pt-br': string
    us: string
  }
  restTimeNumber: number
}
export interface ITchiesProps {
  index?: number
  description: {
    us: string
    'pt-br': string
  }
}
export interface IPropsSets {
  repetitionData: ISetsProps[]
  restTimeData: IRestTimeProps
  techiesData: ITchiesProps
}
export interface ICardExerciseData {
  // isEnabled: boolean

  workoutExerciseId?: string
  workoutExerciseIndex?: number
  workoutExerciseName?: IptBrUs
  workoutExerciseName_insensitive?: IptBrUs
  workoutExerciseRepetition?: string
  workoutExerciseSets?: IPropsSets[]
  workoutTechiesTittle?: IptBrUs

  workoutExerciseTypes?: string
  workoutExercisePrimaryMuscleGroup?: IptBrUs
  workoutExerciseFilters?: ICachedFiltersExercise
  createdAt?: ServerTimestamp
  updatedAt?: ServerTimestamp
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

interface IWorkoutsData {
  index: number
  cardExerciseLabel: string
  cardExerciseData: IFormattedCardExerciseData[]
  cardExerciseUniquesMuscles: IptBrUs[]
}
export type WorkoutExercise = {
  isEnabled: boolean

  workoutExerciseIndex: number
  workoutExercisesName: string
  workoutExercisesRepetition: string
  workoutExercisesSets: string[]
  workoutExercisesRestTime: string
  workoutExercisesRestTimeNumber: number
  workoutExerciseMuscleGroup: IptBrUs
  workoutExerciseId?: string
  workoutExercisesName_insensitive: string
  workoutExercisesTechniqueTitle?: string
  workoutExercisesTechniqueDescription?: string
  createdAt?: ServerTimestamp
  updatedAt?: ServerTimestamp
}

export interface WorkoutExerciseWithSelected {
  workoutsData: WorkoutExercise[]
  selectedWorkoutIndex: number
}

export type NavigationUserHome3DataProps = {
  selectedWorkoutIndex?: number
}

interface NavigationWorkoutsProps {
  workoutId: string
  workoutCategoryId: string
  initialDate?: number

  workoutCategoryName: {
    'pt-br': string
    us: string
  }

  workoutName: {
    'pt-br': string
    us: string
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

  workoutDescription: {
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
    trainingByWeek_insensitive: {
      'pt-br': string
      us: string
    }
    trainingByWeekNumber: number
  }

  workoutTime: {
    trainingTime_insensitive: {
      'pt-br': string
      us: string
    }
    trainingTimeNumber: number[]
  }
  workoutPhoto: {
    photoFileName: string
    photoFilePath: string
    photoMIME: string
  }

  // ---
  createdAt?: ServerTimestamp
  updatedAt?: ServerTimestamp
}

export type IWorkoutCategory = {
  workoutCategoryId?: string

  lastWorkoutUpdatedAt?: Timestamp
  workoutCategoryName: {
    'pt-br': string
    us: string
  }
  workoutCategoryName_insensitive: {
    'pt-br': string
    us: string
  }
  workoutCategoryPhoto: {
    workoutCategoryPhotoUrlDownload: string
    workoutCategoryPhotoFileName: string
    workoutCategoryPhotoMIME: string
  }
  total: number
  workoutCategoryActive: boolean
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export type IMarketPlaceWorkoutListNavigation = {
  data: IMyfitflowWorkoutInUse[]
  lastUpdatedAt: number
  selectedCategoryData: IWorkoutCategory
}

export type IMarketPlaceWorkoutDetailNavigation = {
  data: IMyfitflowWorkoutInUse
  enableSyncDataAndShare: boolean
}
export type IMarketPlacePersonalsDetailNavigation = {
  data: IPersonal
}

export type WorkoutsExercisesInfoProps = {
  createdAt?: ServerTimestamp
  updatedAt?: ServerTimestamp

  workoutExerciseMuscleGroup: IptBrUs
  exerciseName: string
  exerciseVideoFileName: string
  exerciseVideoThumbnailBase64: string
  exerciseVideoUrlDownload: string
}

type WorkoutDataWithSelectedWorkout = {
  activeWorkoutId: string
  activeWorkoutCreatedAt: number
  activeWorkoutDataLength: number

  data: IWorkoutsData
  selectedWorkoutExerciseIndex: number | undefined
  muscleGroupsLabel: string
  letter: string
  cardIndex: number
}

export type NavigationUserWorkoutListProps = {
  activeWorkoutId: string
  activeWorkoutCreatedAt: number
  activeWorkoutDataLength: number
  data: IWorkoutsData
  cardIndex: number
}

export type NavigationUserWorkoutInfoListProps = {
  myWorkoutDataArray: IWorkoutInfo
  daysPassed: number
}

export interface IUserSelect {
  id: number
  tittle: IptBrUs
  byWeekNumber?: number
  bySessionRangeNumber?: number[]
  selected: boolean
}
export interface IUserPulleyEquipSelect {
  id: number
  tittle: IptBrUs
  selected: boolean
}
export interface INewAccount {
  selectedLanguage: 'pt-br' | 'us'
}
export interface IOnBoading {
  selectedLanguage: 'pt-br' | 'us'
}
export interface IUserFriendProfile {
  friend: IUser
}

export interface IUserPrefferencesSelectListNavigation {
  dataType:
    | `Level`
    | `Objetivo`
    | `Foco em`
    | `Treinos por semana`
    | `Tempo de cada treino`
}
export interface IUserSelectFreeEquipamentListNavigation {
  dataType: `Livre`
}
export interface IUserSelectPulleyEquipamentListNavigation {
  dataType: `Polia`
}
export interface IUserSelectMachineEquipamentListNavigation {
  dataType: `Máquina`
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      onBoarding1: undefined
      onBoarding2: IOnBoading
      onBoarding3: IOnBoading
      onBoarding4: IOnBoading
      login: IOnBoading

      userHome: undefined
      userWorkoutInfoList: NavigationUserWorkoutInfoListProps

      marketPlaceHome: undefined
      userAllCategories: undefined
      userPrefferencesSelectList: IUserPrefferencesSelectListNavigation
      marketPlaceWorkoutList: IMarketPlaceWorkoutListNavigation
      marketPlaceWorkoutDetail: IMarketPlaceWorkoutDetailNavigation

      marketPlacePersonalsList: undefined
      marketPlacePersonalsDetail: IMarketPlacePersonalsDetailNavigation

      paidWorkout: undefined

      userWorkoutList: NavigationUserWorkoutListProps
      userWorkout: WorkoutDataWithSelectedWorkout

      camera: undefined

      frequentQuestions: undefined

      termsAndConditions: undefined
      privacyPolicy: undefined
      parQ: undefined
      anamnese: undefined

      userFormEditProfile: undefined
      userWorkouts: undefined
      userChallenges: undefined
      userFriendList: undefined
      userFriendProfile: IUserFriendProfile
      userPhotoTimeline: undefined

      userPrefferences: undefined
      userPersonalTrainer: undefined

      userPlan: undefined
      userSupport: undefined

      userSelectFreeEquipamentList: IUserSelectFreeEquipamentListNavigation
      userSelectPulleyEquipamentList: IUserSelectPulleyEquipamentListNavigation
      userSelectMachineEquipamentList: IUserSelectMachineEquipamentListNavigation

      newAccount: INewAccount
    }
  }
}
