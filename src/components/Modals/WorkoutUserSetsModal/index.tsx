import React, { useState, useEffect } from 'react'
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInputProps,
  Platform,
} from 'react-native'

import {
  Container,
  TipsNoteBodyWrapper,
  TipsNoteWrapper,
  Header,
  TipsButtonText,
  TipsButtonLinearGradientSave,
  OverLayTop,
  OverLayBottom,
  PickerContainer,
  SaveButtonWrapper,
  TextHeader,
  HeaderTittle,
  HeaderSubTittle,
  PickerWrapper,
  RepOrTimeButtonWrapper,
  ButtonBorderWrapper,
  ActText,
  SaveButton,
  ActButton,
  PickerColumWrapper,
  SeparatorWrapper,
} from './styles'
import {
  ICachedCardExerciseData,
  ICachedSetsProps,
  IFormattedCardExerciseData,
} from '@hooks/authTypes'
import { Picker } from '@react-native-picker/picker'

interface InputProps extends TextInputProps {
  closeModal: () => void
  handleUpdateSets: (newRangeData: ICachedSetsProps[], dateNow: Date) => void
  modalCachedCardExerciseData: ICachedCardExerciseData
  activeIndex: number
  item: IFormattedCardExerciseData
  visible: boolean
  selectedLanguage: 'pt-br' | 'us'
}
const data = [
  {
    sets_insensitive: '1',
    isReps: true,
    isTime: false,
    timeInSeconds: 0,
  },
  {
    sets_insensitive: '2',
    isReps: true,
    isTime: false,
    timeInSeconds: 0,
  },
  {
    sets_insensitive: '3',
    isReps: true,
    isTime: false,
    timeInSeconds: 0,
  },
  {
    sets_insensitive: '4',
    isReps: true,
    isTime: false,
    timeInSeconds: 0,
  },
  {
    sets_insensitive: '5',
    isReps: true,
    isTime: false,
    timeInSeconds: 0,
  },
  {
    sets_insensitive: '6',
    isReps: true,
    isTime: false,
    timeInSeconds: 0,
  },
  {
    sets_insensitive: '7',
    isReps: true,
    isTime: false,
    timeInSeconds: 0,
  },
  {
    sets_insensitive: '8',
    isReps: true,
    isTime: false,
    timeInSeconds: 0,
  },
  {
    sets_insensitive: '9',
    isReps: true,
    isTime: false,
    timeInSeconds: 0,
  },
  {
    sets_insensitive: '10',
    isReps: true,
    isTime: false,
    timeInSeconds: 0,
  },
  {
    sets_insensitive: '11',
    isReps: true,
    isTime: false,
    timeInSeconds: 0,
  },
  {
    sets_insensitive: '12',
    isReps: true,
    isTime: false,
    timeInSeconds: 0,
  },
  {
    sets_insensitive: '15',
    isReps: true,
    isTime: false,
    timeInSeconds: 0,
  },
  {
    sets_insensitive: '20',
    isReps: true,
    isTime: false,
    timeInSeconds: 0,
  },
  {
    sets_insensitive: '21',
    isReps: true,
    isTime: false,
    timeInSeconds: 0,
  },
  {
    sets_insensitive: `5s`,
    isReps: false,
    isTime: true,
    timeInSeconds: 5,
  },
  {
    sets_insensitive: `10s`,
    isReps: false,
    isTime: true,
    timeInSeconds: 10,
  },
  {
    sets_insensitive: `15s`,
    isReps: false,
    isTime: true,
    timeInSeconds: 15,
  },
  {
    sets_insensitive: `20s`,
    isReps: false,
    isTime: true,
    timeInSeconds: 20,
  },
  {
    sets_insensitive: `25s`,
    isReps: false,
    isTime: true,
    timeInSeconds: 25,
  },
  {
    sets_insensitive: `30s`,
    isReps: false,
    isTime: true,
    timeInSeconds: 30,
  },
  {
    sets_insensitive: `1m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 60,
  },
  {
    sets_insensitive: `2m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 120,
  },
  {
    sets_insensitive: `3m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 180,
  },
  {
    sets_insensitive: `4m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 240,
  },
  {
    sets_insensitive: `5m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 300,
  },
  {
    sets_insensitive: `6m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 360,
  },
  {
    sets_insensitive: `7m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 420,
  },
  {
    sets_insensitive: `8m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 480,
  },
  {
    sets_insensitive: `9m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 540,
  },
  {
    sets_insensitive: `10m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 600,
  },
  {
    sets_insensitive: `11m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 660,
  },
  {
    sets_insensitive: `12m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 720,
  },
  {
    sets_insensitive: `13m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 780,
  },
  {
    sets_insensitive: `14m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 840,
  },
  {
    sets_insensitive: `15m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 900,
  },
  {
    sets_insensitive: `16m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 960,
  },
  {
    sets_insensitive: `17m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 1020,
  },
  {
    sets_insensitive: `18m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 1080,
  },
  {
    sets_insensitive: `19m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 1140,
  },
  {
    sets_insensitive: `20m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 1200,
  },
  {
    sets_insensitive: `21m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 1260,
  },
  {
    sets_insensitive: `22m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 1320,
  },
  {
    sets_insensitive: `23m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 1380,
  },
  {
    sets_insensitive: `24m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 1440,
  },
  {
    sets_insensitive: `25m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 1500,
  },
  {
    sets_insensitive: `26m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 1560,
  },
  {
    sets_insensitive: `27m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 1620,
  },
  {
    sets_insensitive: `28m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 1680,
  },
  {
    sets_insensitive: `29m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 1740,
  },
  {
    sets_insensitive: `30m`,
    isReps: false,
    isTime: true,
    timeInSeconds: 1800,
  },
]
export function WorkoutUserSetsModal({
  closeModal,
  handleUpdateSets,
  visible,
  selectedLanguage,
  modalCachedCardExerciseData,
  activeIndex,
  item,
}: InputProps) {
  const exerciseName = item.workoutExerciseName?.[selectedLanguage]

  const [newSets, setNewSets] = useState<ICachedSetsProps[] | null>(null)
  const [dateNow, setDateNow] = useState<Date | null>(null)
  // cria um estado para gerenciar o timstamp

  const defaultRep = data.filter((v) => v.isReps)
  const defaultTime = data.filter((v) => v.isTime)
  function handleOverlayPress() {
    Keyboard.dismiss()
    closeModal()
  }
  /*   const [isFocused, setIsFocused] = useState(false)
 
  function handleInputFocus() {
    setIsFocused(true)
  }

  function handleInputBlur() {
    setIsFocused(false)
  } */

  async function updateWeight() {
    // a diferenca entre os numeros naop pode ser maior que 4
    // se for maior, deve-se fazer um alerta
    if (!newSets) return
    if (!dateNow) return
    handleUpdateSets(newSets, dateNow)
  }

  function handleSetChange(value: string, rangeIndex: number) {
    if (!newSets) return
    const copy = [...newSets]
    const date = new Date()
    const time = date.getTime()

    const formatted = copy.map((set, index) =>
      index === rangeIndex
        ? {
            ...set,
            sets_insensitive: value,
            updatedAt: time, // Atualiza o timestamp de modificação
          }
        : set,
    )
    setDateNow(date) // Atualiza o timestamp atual
    setNewSets(formatted)
  }
  function addNewSelector(type: 'time' | 'reps') {
    if (!newSets) return
    if (newSets.length >= 3) return
    const copy = [...newSets]

    const date = new Date()
    const time = date.getTime()

    const newSet = {
      isReps: type === 'reps',
      isTime: type === 'time',
      sets_insensitive: `1`,
      timeInSeconds: 0,
      createdAt: newSets[newSets.length - 1]?.createdAt || time, // Preserva o createdAt do último item, se existir
      updatedAt: time,
    }

    copy.push(newSet)

    setDateNow(date) // Atualiza o timestamp atual
    setNewSets(copy)
  }

  function removeLastSelector() {
    if (!newSets) return
    if (newSets && newSets.length === 1) return
    const copy = [...newSets]

    copy.pop()

    setNewSets(copy)
  }

  const rangedType = (newSets && newSets[1] && newSets[1].isReps) || false

  useEffect(() => {
    if (!visible) {
      // reseta o modal
      setNewSets(null)
      console.log(`Modal fechado`)
    }

    // apenas resete o state original
    const activeLineSet =
      modalCachedCardExerciseData?.workoutExerciseSets?.[activeIndex]

    if (!activeLineSet) return
    const sets = JSON.parse(JSON.stringify(activeLineSet.repetitionData))

    setNewSets(sets)
  }, [visible])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // 'padding' para iOS e 'height' para Android
    >
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <OverLayTop />
      </TouchableWithoutFeedback>
      <OverLayBottom>
        <Container>
          <TipsNoteBodyWrapper>
            <TipsNoteWrapper>
              <Header>
                <TextHeader>
                  <HeaderTittle>{exerciseName}</HeaderTittle>
                  <HeaderSubTittle>
                    Rep da {activeIndex + 1}º série
                  </HeaderSubTittle>
                  <HeaderSubTittle>
                    {newSets && newSets.length === 1
                      ? 'Repetição'
                      : rangedType
                        ? 'Range'
                        : 'Isometria'}
                  </HeaderSubTittle>
                </TextHeader>
              </Header>
              <PickerContainer>
                {newSets &&
                  newSets.map((v, i, dataArray) => (
                    <PickerWrapper key={i}>
                      <PickerColumWrapper>
                        <Picker
                          style={{ width: 100 }}
                          selectedValue={newSets[i].sets_insensitive}
                          onValueChange={(itemValue) =>
                            handleSetChange(itemValue, i)
                          }
                        >
                          {v.isReps
                            ? defaultRep.map((v, i) => (
                                <Picker.Item
                                  key={i}
                                  label={v.sets_insensitive}
                                  value={v.sets_insensitive}
                                  color="black"
                                />
                              ))
                            : defaultTime.map((v, i) => (
                                <Picker.Item
                                  key={i}
                                  label={v.sets_insensitive}
                                  value={v.sets_insensitive}
                                  color="black"
                                />
                              ))}
                        </Picker>
                      </PickerColumWrapper>
                      {i !== dataArray.length - 1 && (
                        <SeparatorWrapper>
                          <ActText>{rangedType ? ' -' : ' ->'}</ActText>
                        </SeparatorWrapper>
                      )}
                    </PickerWrapper>
                  ))}
              </PickerContainer>
            </TipsNoteWrapper>

            <RepOrTimeButtonWrapper>
              <ButtonBorderWrapper disabled={rangedType}>
                <ActButton
                  disabled={rangedType}
                  onPress={() => addNewSelector('reps')}
                >
                  <ActText>Repetição</ActText>
                </ActButton>
              </ButtonBorderWrapper>
              <ButtonBorderWrapper redColor={true}>
                <ActButton onPress={removeLastSelector}>
                  <ActText redColor={true}>Remover</ActText>
                </ActButton>
              </ButtonBorderWrapper>
              <ButtonBorderWrapper disabled={rangedType}>
                <ActButton
                  disabled={rangedType}
                  onPress={() => addNewSelector('time')}
                >
                  <ActText>Tempo</ActText>
                </ActButton>
              </ButtonBorderWrapper>
            </RepOrTimeButtonWrapper>

            <SaveButtonWrapper>
              <SaveButton onPress={updateWeight}>
                <TipsButtonLinearGradientSave colors={['#000000', '#FFFFFF']}>
                  <TipsButtonText>Salvar</TipsButtonText>
                </TipsButtonLinearGradientSave>
              </SaveButton>
            </SaveButtonWrapper>
          </TipsNoteBodyWrapper>
        </Container>
      </OverLayBottom>
    </KeyboardAvoidingView>
  )
}
