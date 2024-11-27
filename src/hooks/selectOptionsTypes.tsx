import { IptBrUs } from './authTypes'

export type IBenchDataSelect = {
  bench_insensitive: IptBrUs
  selected: boolean
  index: number
}
export type IBarDataSelect = {
  bar_insensitive: IptBrUs
  selected: boolean
  index: number
}
export type IWeightDataSelect = {
  weight_insensitive: IptBrUs
  selected: boolean
  index: number
}
export type IOtherDataSelect = {
  other_insensitive: IptBrUs
  selected: boolean
  index: number
}
export type IFreeSelect = {
  benchSelectData: IBenchDataSelect[]
  barSelectData: IBarDataSelect[]
  weightSelectData: IWeightDataSelect[]
  otherSelectData: IOtherDataSelect[]
}
export type IPulleyDataSelect = {
  pulley_insensitive: IptBrUs
  selected: boolean
  index: number
}
export type IPulleyHandlerDataSelect = {
  pulleyHandler_insensitive: IptBrUs
  selected: boolean
  index: number
}
export type IPulleySelect = {
  pulleySelectData: IPulleyDataSelect[]
  pulleyHandlerSelectData: IPulleyHandlerDataSelect[]
}
export type IMachineDataSelect = {
  machine_insensitive: IptBrUs
  selected: boolean
  index: number
}
export type IMachineSelect = {
  machineSelectData: IMachineDataSelect[]
}

export type IMuscleDataSelect = {
  muscle_insensitive: IptBrUs
  selected: boolean
  index: number
}

export type ILevelSelect = {
  level_insensitive: IptBrUs
  selected: boolean
  index: number
}

export type IDivisionSelect = {
  workoutDivisionNumber: number
  workoutDivision: string

  selected: boolean
  index: number
}

export type ISelectTimeBySession = {
  timeBySession_insensitive: IptBrUs
  timeBySessionRangeNumber: number[]
  selected: boolean
  index: number
}

export type IGenderSelect = {
  gender_insensitive: IptBrUs
  selected: boolean
  index: number
}

export type IFrequencyByWeekSelect = {
  sessionsByWeek_insensitive: IptBrUs
  sessionsByWeekNumber: number

  selected: boolean
  index: number
}

export type IPeriodSelect = {
  period_insensitive: IptBrUs
  periodNumber: number
  selected: boolean
  index: number
}

export type IGoalSelect = {
  goal_insensitive: IptBrUs
  selected: boolean
  index: number
}
export type IBalancedSelect = {
  name_insensitive: IptBrUs
  selected: boolean
  index: number
}

export interface IRepetitionSelect {
  repetition_insensitive: string
  repetitionNumber: number
  selected: boolean
  index: number
}

export interface ISetsSelect {
  sets_insensitive: string
  setsNumberRangeStrings: string[]
  selected: boolean
  index: number
}

export interface ITechniquesSelect {
  title: IptBrUs
  description: IptBrUs
  selected: boolean
  index: number
}
export interface IRestTimeSelect {
  restTime_insensitive: IptBrUs
  restTimeNumber: number
  selected: boolean
  index: number
}
