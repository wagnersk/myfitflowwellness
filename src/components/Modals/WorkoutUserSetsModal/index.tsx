import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInputProps,
  Platform,
  View,
  Button,
  Alert,
} from 'react-native'

import {
  Container,
  TipsNoteBodyWrapper,
  TipsNoteWrapper,
  TipsTitleNoteWrapper,
  TipsTitleNote,
  TipsInputNotes,
  TipsButton,
  TipsButtonText,
  TipsButtonLinearGradientSave,
  OverLayTop,
  OverLayBottom,
  InputsWrapper,
  TipsButtonWrapper,
} from './styles'
import { ICachedSetsProps } from '@hooks/authTypes'

interface InputProps extends TextInputProps {
  closeModal: () => void
  handleUpdateSets: (
    set: number,
    rangeOfSets: number[],
    isActivedRangeOfSets: boolean,
  ) => void
  setsIndex: number
  exerciseName?: string
  isActivedRangeOfSets: boolean
  rangeOfSets: number[]
  sets: ICachedSetsProps[]
}

export function WorkoutUserSetsModal({
  closeModal,
  handleUpdateSets,
  sets,
  setsIndex,
  exerciseName,
  rangeOfSets,
  isActivedRangeOfSets,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [newSets, setNewSets] = useState({
    sets,
    rangeOfSets,
    isActivedRangeOfSets,
  })

  function handleOverlayPress() {
    Keyboard.dismiss()
    closeModal()
  }

  function handleInputFocus() {
    setIsFocused(true)
  }

  function handleInputBlur() {
    setIsFocused(false)
  }

  async function updateWeight() {
    // a diferenca entre os numeros naop pode ser maior que 4
    const diff = Math.abs(Number(rangeOfSets[0]) - Number(rangeOfSets[1]))
    if (diff > 6) {
      return Alert.alert(
        'Erro',
        'A diferença entre os números não pode ser maior que 4',
      )
    }
    handleUpdateSets(
      newSets.sets,
      newSets.rangeOfSets,
      newSets.isActivedRangeOfSets,
    )
  }

  function handleSetChange(x: string) {
    if (x === undefined) return

    const set = x.replace(/[^0-9]/g, '').slice(0, 2)

    setNewSets({
      ...newSets,
      sets: Number(set),
      isActivedRangeOfSets: false,
    })
  }

  function handleRangeFirstPositionChange(x: string) {
    if (x === undefined) return

    const rangeOfSetsFirstPosition = x.replace(/[^0-9]/g, '').slice(0, 2)

    // Permitir que o campo seja apagado completamente
    if (rangeOfSetsFirstPosition === '') {
      return
    }
    setNewSets({
      ...newSets,
      rangeOfSets: [Number(rangeOfSetsFirstPosition), newSets.rangeOfSets[1]],
      isActivedRangeOfSets: true,
    })
  }

  function handleRangeSecondPositionChange(x: string) {
    if (x === undefined) return

    const rangeOfSetsSecondPosition = x.replace(/[^0-9]/g, '').slice(0, 2)

    // Permitir que o campo seja apagado completamente
    if (rangeOfSetsSecondPosition === '') {
      return
    }

    setNewSets({
      ...newSets,
      rangeOfSets: [newSets.rangeOfSets[0], Number(rangeOfSetsSecondPosition)],
      isActivedRangeOfSets: true,
    })
  }

  function addSecondInput() {
    setNewSets({
      ...newSets,
      sets,
      rangeOfSets: [newSets.sets, newSets.sets + 4],
      isActivedRangeOfSets: true,
    })
    console.log(newSets)
  }

  function removeSecondInput() {
    setNewSets({
      ...newSets,
      rangeOfSets: [],
      isActivedRangeOfSets: false,
    })
  }
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
              <TipsTitleNoteWrapper>
                <TipsTitleNote>{exerciseName}</TipsTitleNote>
                <TipsTitleNote>Rep da {setsIndex}º série</TipsTitleNote>
              </TipsTitleNoteWrapper>
              <InputsWrapper>
                {!newSets.isActivedRangeOfSets && (
                  <TipsInputNotes
                    value={String(newSets.sets)}
                    onChangeText={handleSetChange}
                    textAlignVertical="top"
                    multiline={true}
                    isFocused={isFocused}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    keyboardType="numeric"
                    {...rest}
                  />
                )}
                {newSets.isActivedRangeOfSets && (
                  <>
                    <TipsInputNotes
                      value={String(newSets.rangeOfSets[0])}
                      onChangeText={handleRangeFirstPositionChange}
                      textAlignVertical="top"
                      multiline={true}
                      isFocused={isFocused}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      keyboardType="numeric"
                      {...rest}
                    />

                    <TipsInputNotes
                      value={String(newSets.rangeOfSets[1])}
                      onChangeText={handleRangeSecondPositionChange}
                      textAlignVertical="top"
                      multiline={true}
                      isFocused={isFocused}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      keyboardType="numeric"
                      {...rest}
                    />
                  </>
                )}

                {newSets.isActivedRangeOfSets ? (
                  <Button title="Remover" onPress={removeSecondInput} />
                ) : (
                  <View>
                    <Button title="Adicionar" onPress={addSecondInput} />
                  </View>
                )}
              </InputsWrapper>
            </TipsNoteWrapper>

            <TipsButtonWrapper>
              <TipsButton onPress={updateWeight}>
                <TipsButtonLinearGradientSave colors={['#000000', '#FFFFFF']}>
                  <TipsButtonText>Salvar</TipsButtonText>
                </TipsButtonLinearGradientSave>
              </TipsButton>
            </TipsButtonWrapper>
          </TipsNoteBodyWrapper>
        </Container>
      </OverLayBottom>
    </KeyboardAvoidingView>
  )
}
/* import React, { useEffect, useState } from 'react'
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
  TipsTitleNoteWrapper,
  TipsTitleNote,
  TipsInputNotes,
  TipsButton,
  TipsButtonText,
  TipsButtonLinearGradientSave,
  OverLayTop,
  OverLayBottom,
  InputsWrapper,
  TipsButtonWrapper,
  ItensButton,
  TitteText,
  SubTitteText,
  SubTittleWrapper,
  DeleteButton,
  DeleteText,
} from './styles'
import { ICachedSetsProps } from '@hooks/authTypes'

interface InputProps extends TextInputProps {
  closeModal: () => void
  handleUpdateRangeOfSets: (
    set: number,
    rangeOfSets: number[],
    isActivedRangeOfSets: boolean,
  ) => void
  handleDeleteRangeOfSets: () => void
  sets: ICachedSetsProps[]
  rangeOfSets: number[]
  tittle: string
  subTittle: string
  isActivedRangeOfSets: boolean
}

export function WorkoutUserRangeOfSetsModal({
  closeModal,
  handleUpdateRangeOfSets,
  handleDeleteRangeOfSets,
  tittle,
  subTittle,
  sets,
  rangeOfSets,
  isActivedRangeOfSets,
}: InputProps) {
  console.log(`sets`, sets)
  console.log(`rangeOfSets`, rangeOfSets)
  console.log(`isActivedRangeOfSets`, isActivedRangeOfSets)
  function generateRange(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }
  const rangeOfSet = generateRange(rangeOfSets[0], rangeOfSets[1]).map((v) => ({
    value: v,
    selected: sets === v,
  }))

  // const rangeOfSet = rangeOfSets.map((v) => ({ value: v, selected: false }))
  console.log(`rangeOfSet`, rangeOfSet)

  function handleOverlayPress() {
    Keyboard.dismiss()
    closeModal()
  }

  async function updateWeight(index: number) {
    if (index === -1) return

    const selecteSet = rangeOfSet[index].value
    handleUpdateRangeOfSets(selecteSet, rangeOfSets, true)
    handleOverlayPress()
  }
  async function deleteRangeOfSets() {
    handleDeleteRangeOfSets()
    handleOverlayPress()
  }

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
              <TipsTitleNoteWrapper>
                <TitteText>
                  {tittle} ( {sets} )
                </TitteText>
                <SubTittleWrapper>
                  <SubTitteText>{subTittle}</SubTitteText>
                  <DeleteButton
                    selected={true}
                    onPress={() => deleteRangeOfSets()}
                  >
                    <DeleteText>Deletar</DeleteText>
                  </DeleteButton>
                </SubTittleWrapper>
              </TipsTitleNoteWrapper>
              <InputsWrapper>
                {rangeOfSet.map((v, _i) => {
                  return (
                    <ItensButton
                      selected={v.selected}
                      key={_i}
                      onPress={() => updateWeight(_i)}
                    >
                      <TipsButtonText selected={v.selected}>
                        {v.value}
                      </TipsButtonText>
                    </ItensButton>
                  )
                })}
              </InputsWrapper>
            </TipsNoteWrapper>
          </TipsNoteBodyWrapper>
        </Container>
      </OverLayBottom>
    </KeyboardAvoidingView>
  )
}
 */
