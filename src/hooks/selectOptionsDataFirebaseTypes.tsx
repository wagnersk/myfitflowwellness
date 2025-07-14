export interface IptBrUs {
  'pt-br': string
  us: string
}
export interface IMuscleDataSelectItem {
  muscle_insensitive: IptBrUs
}
export interface IMuscleDataSelectData {
  data: IMuscleDataSelectItem[]
}

export interface IFreeSelectItem {
  barSelectData: {
    bar_insensitive: IptBrUs
  }[]
  benchSelectData: {
    bench_insensitive: IptBrUs
  }[]
  weightSelectData: {
    weight_insensitive: IptBrUs
  }[]
  otherSelectData: {
    other_insensitive: IptBrUs
  }[]
}
export interface IFreeSelectData {
  data: IFreeSelectItem
}

export type IPulleySelectItem = {
  pulleySelectData: {
    pulley_insensitive: IptBrUs
  }[]
  pulleyHandlerSelectData: {
    pulleyHandler_insensitive: IptBrUs
  }[]
}
export type IPulleySelectData = {
  data: IPulleySelectItem
}
export interface IParQStatus {
  id: number
  'pt-br': string
  us: string
}

export interface IMachineSelectItem {
  machineSelectData: {
    machine_insensitive: IptBrUs
  }[]
}
export interface IMachineSelectData {
  data: IMachineSelectItem
}

export interface IGoalSelectItem {
  goal_insensitive: IptBrUs
}
export interface IGoalSelectData {
  data: IGoalSelectItem[]
}

export interface IFrequencybyweekSelectItem {
  sessionsByWeekNumber: number
  sessionsByWeek_insensitive: IptBrUs
}

export interface IFrequencybyweekSelectData {
  data: IFrequencybyweekSelectItem[]
}

export interface ITimeBySessionSelectItem {
  timeBySessionRangeNumber: number[]
  timeBySession_insensitive: IptBrUs
}

export interface ITimeBySessionSelectData {
  data: ITimeBySessionSelectItem[]
}

export interface IPeriodSelectItem {
  periodNumber: number
  period_insensitive: IptBrUs
}

export interface IPeriodSelectData {
  data: IPeriodSelectItem[]
}

export interface IDivisionSelectItem {
  workoutDivision: string
  workoutDivisionNumber: number
}

export interface IDivisionSelectData {
  data: IDivisionSelectItem[]
}

export interface IGenderSelectItem {
  gender_insensitive: IptBrUs
}

export interface IGenderSelectData {
  data: IGenderSelectItem[]
}
export interface ILevelSelectItem {
  level_insensitive: IptBrUs
}
export interface ILevelSelectData {
  data: ILevelSelectItem[]
}
/// /
export interface IRepetitionSelectItem {
  repetition_insensitive: string
  repetitionNumber: number
}
export interface IRepetitionSelectData {
  data: IRepetitionSelectItem[]
}

interface ISetsSelectItem {
  sets_insensitive: string
  isReps: boolean
  isTime: boolean
  timeInSeconds: number | null
  setsNumberRangeStrings: string[]
}

export interface ISetsSelectData {
  data: ISetsSelectItem[]
}

export interface ITechniquesSelectItem {
  title: IptBrUs
  description: IptBrUs
}
export interface ITechniquesSelectData {
  data: ITechniquesSelectItem[]
}
export interface IRestTimeSelectItem {
  restTime_insensitive: IptBrUs
  restTimeNumber: number
}
export interface IRestTimeSelectData {
  data: IRestTimeSelectItem[]
}
