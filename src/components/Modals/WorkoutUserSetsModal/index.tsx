import React, { useState } from 'react'
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
import { ICachedCardExerciseData, ICachedSetsProps } from '@hooks/authTypes'
import { Picker } from '@react-native-picker/picker'

interface InputProps extends TextInputProps {
  closeModal: () => void
  handleUpdateSets: (newRangeData: ICachedSetsProps[]) => void
  modalCachedCardExerciseData: ICachedCardExerciseData
  activeIndex: number
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
    sets_insensitive: `5"`,
    isReps: false,
    isTime: true,
    timeInSeconds: 5,
  },
  {
    sets_insensitive: `10"`,
    isReps: false,
    isTime: true,
    timeInSeconds: 10,
  },
  {
    sets_insensitive: `15"`,
    isReps: false,
    isTime: true,
    timeInSeconds: 15,
  },
  {
    sets_insensitive: `20"`,
    isReps: false,
    isTime: true,
    timeInSeconds: 20,
  },
  {
    sets_insensitive: `25"`,
    isReps: false,
    isTime: true,
    timeInSeconds: 25,
  },
  {
    sets_insensitive: `30"`,
    isReps: false,
    isTime: true,
    timeInSeconds: 30,
  },
]
export function WorkoutUserSetsModal({
  closeModal,
  handleUpdateSets,

  selectedLanguage,
  modalCachedCardExerciseData,
  activeIndex,
}: InputProps) {
  const activeLineSet =
    modalCachedCardExerciseData?.workoutExerciseSets?.[activeIndex]

  const sets = activeLineSet?.repetitionData || []

  const exerciseName =
    modalCachedCardExerciseData.workoutExerciseName?.[selectedLanguage]

  const [newSets, setNewSets] = useState(sets)

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
    handleUpdateSets(newSets)
  }

  function handleSetChange(value: string, rangeIndex: number) {
    console.log(`handleSetChange`, value)
    console.log(`rangeIndex`, rangeIndex)
    const copy = [...newSets]

    copy[rangeIndex].sets_insensitive = value

    setNewSets(copy)
  }

  function addNewSelector(type: 'time' | 'reps') {
    if (newSets.length >= 3) return
    console.log(type, 'type')
    console.log(newSets, 'newSets')
    const copy = [...newSets]

    const time = new Date().getTime()

    const newSet = {
      isReps: type === 'reps',
      isTime: type === 'time',
      sets_insensitive: `1`,
      timeInSeconds: 0,
      createdAt: time,
      updatedAt: time,
    }

    copy.push(newSet)

    setNewSets(copy)
    console.log(newSets)
  }

  function removeLastSelector() {
    if (newSets.length === 1) return
    const copy = [...newSets]

    copy.pop()

    setNewSets(copy)
  }

  const rangedType = newSets && newSets[1] && newSets[1].isReps

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
                    {newSets.length === 1
                      ? 'Repetição'
                      : rangedType
                        ? 'Range'
                        : 'Isometria'}
                  </HeaderSubTittle>
                </TextHeader>
              </Header>
              <PickerContainer>
                {newSets.map((v, i, dataArray) => (
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
                              />
                            ))
                          : defaultTime.map((v, i) => (
                              <Picker.Item
                                key={i}
                                label={v.sets_insensitive}
                                value={v.sets_insensitive}
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
