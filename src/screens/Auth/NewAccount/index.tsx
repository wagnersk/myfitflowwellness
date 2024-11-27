import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  BackHandler,
  Alert,
} from 'react-native'

import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/core'
import { useAuth } from '@hooks/auth'

import { ViewWithLineAndIcon } from '@components/ViewWithLineAndIcon'
import { CTAButton } from '@components/Buttons/CTAButton'
import Back from '@assets/Back.svg'

import {
  Header,
  MyFitFlowLogoComponent,
  BodyTop,
  Footer,
  FooterWrapper,
  FooterText,
  IconContainer,
  SpaceBetweenInput,
  SpaceBetweenFormAndButton,
  LinearGradientContainer,
} from './styles'
import { EmailInput } from '@components/Forms/Inputs/EmailInput'
import { PasswordInput } from '@components/Forms/Inputs/PasswordInput'
import { UserNameInput } from '@components/Forms/Inputs/UserNameInput'
import { WhatsappInput } from '@components/Forms/Inputs/WhatsappInput'
import { CalendarInput } from '@components/Forms/Inputs/CalendarInput'
import { checkBirthdayDate } from '@utils/checkBirthdayDate'
import { emailRegex } from '@utils/emailRegex'

interface IUserForm {
  name: {
    value: string
    errorBoolean: boolean
  }
  email: {
    value: string
    errorBoolean: boolean
  }
  password: {
    value: string
    errorBoolean: boolean
  }
  whatsappNumber: {
    value: string
    errorBoolean: boolean
  }
  birthdate: {
    value: string
    errorBoolean: boolean
  }
  selectedLanguage: {
    value: 'pt-br' | 'us'
    errorBoolean: boolean
  }
}
export function NewAccount() {
  const { isWaitingApiResponse, firebaseSignUp, isLogging } = useAuth()
  const [isComponentAVisible, setIsComponentAVisible] = useState(true)
  const [isComponentBVisible, setIsComponentBVisible] = useState(true)
  const [activeErrorCheck, setActiveErrorCheck] = useState(false)

  const [userForm, setUserForm] = useState<IUserForm>({
    name: { value: '', errorBoolean: false },
    email: { value: '', errorBoolean: false },
    password: { value: '', errorBoolean: false },
    whatsappNumber: { value: '', errorBoolean: false },
    birthdate: { value: '', errorBoolean: false },
    selectedLanguage: { value: 'pt-br', errorBoolean: false },
  })

  const navigation = useNavigation()

  const theme = useTheme()

  async function handleSignUp() {
    const letActiveErrorCheck = true
    setActiveErrorCheck(letActiveErrorCheck)

    try {
      await checkName()
      await checkEmail()
      await checkPassword()
      await checkWhatsappNumber()
      await checkBirthdate()

      await firebaseSignUp(
        userForm.email.value,
        userForm.password.value,
        userForm.name.value,
        userForm.birthdate.value,
        userForm.whatsappNumber.value,
        userForm.selectedLanguage.value,
      )
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Erro', error.message)
      } else {
        Alert.alert('Erro', 'Ocorreu um erro desconhecido')
      }
    }

    async function checkName() {
      if ((activeErrorCheck || letActiveErrorCheck) && !userForm.name.value) {
        setUserForm((prev) => {
          return {
            ...prev,
            name: { value: prev.name.value, errorBoolean: true },
          }
        })
        throw new Error('Por favor, insira um nome válido')
      }
    }
    async function checkEmail() {
      const emailIsValid = emailRegex.test(userForm.email.value)
      if (
        (activeErrorCheck || letActiveErrorCheck) &&
        (!userForm.email.value || !emailIsValid)
      ) {
        setUserForm((prev) => {
          return {
            ...prev,
            email: { value: prev.email.value, errorBoolean: true },
          }
        })
        throw new Error('Por favor, insira um e-mail válido')
      }
    }
    async function checkPassword() {
      if (
        (activeErrorCheck || letActiveErrorCheck) &&
        (!userForm.password.value || userForm.password.value.length < 6)
      ) {
        setUserForm((prev) => {
          return {
            ...prev,
            password: { value: prev.password.value, errorBoolean: true },
          }
        })
        throw new Error('A senha deve ter pelo menos 6 caracteres')
      }
    }
    async function checkWhatsappNumber() {
      if (
        (activeErrorCheck || letActiveErrorCheck) &&
        (!userForm.whatsappNumber.value ||
          userForm.whatsappNumber.value.length < 15)
      ) {
        setUserForm((prev) => {
          return {
            ...prev,
            whatsappNumber: {
              value: prev.whatsappNumber.value,
              errorBoolean: true,
            },
          }
        })
        throw new Error(
          'O número de whatsapp deve ter pelo menos 11 caracteres',
        )
      }
    }
    async function checkBirthdate() {
      const isDateValid = checkBirthdayDate(userForm.birthdate.value)
      if ((activeErrorCheck || letActiveErrorCheck) && !isDateValid) {
        setUserForm((prev) => {
          return {
            ...prev,
            birthdate: {
              value: prev.birthdate.value,
              errorBoolean: true,
            },
          }
        })
        throw new Error(
          'A data de nascimento é invalida ou tem menos de 18 anos.',
        )
      }
    }
  }

  async function handleGoBack() {
    navigation.goBack()
  }

  function handleChangeUserName(value: string) {
    let checkError = false

    if (activeErrorCheck && !value) {
      checkError = true
    }

    setUserForm((prev) => {
      return {
        ...prev,
        name: { value, errorBoolean: checkError },
      }
    })
  }

  function handleChangeEmail(value: string) {
    let checkError = false

    const emailIsValid = emailRegex.test(value)

    if (activeErrorCheck && !emailIsValid) {
      console.log(`entrando`)
      checkError = true
    }

    setUserForm((prev) => {
      return {
        ...prev,
        email: { value, errorBoolean: checkError },
      }
    })
  }

  function handleChangePassword(value: string) {
    let checkError = false
    if (activeErrorCheck && value.length < 5) {
      checkError = true
    }
    setUserForm((prev) => {
      return {
        ...prev,
        password: { value, errorBoolean: checkError },
      }
    })
  }

  function handleChangeWhatsappNumber(value: string) {
    let checkError = false

    if (activeErrorCheck && value.length < 15) {
      checkError = true
    }

    setUserForm((prev) => {
      return {
        ...prev,
        whatsappNumber: { value, errorBoolean: checkError },
      }
    })
  }

  function handleChangeBirthdate(value: string) {
    const isDateValid = checkBirthdayDate(value)
    let checkError = false

    if (activeErrorCheck && !isDateValid) {
      checkError = true
    }
    setUserForm((prev) => {
      return {
        ...prev,
        birthdate: { value, errorBoolean: checkError },
      }
    })
  }

  function toggleComponentAVisibility() {
    setIsComponentBVisible(false)
  }

  function toggleComponentBVisibility() {
    setIsComponentAVisible(false)
  }
  useEffect(() => {
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'

    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })

    const keyboardDidHideListener = Keyboard.addListener(hideEvent, () => {
      setIsComponentAVisible(true)
      setIsComponentBVisible(true)
    })

    return () => {
      keyboardDidHideListener.remove()
    }
  }, [])
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradientContainer colors={[]}>
        <KeyboardAvoidingView
          style={{ width: '100%' }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled
        >
          <Header>
            <MyFitFlowLogoComponent width={500} height={500} />
          </Header>

          <BodyTop>
            {isComponentAVisible && (
              <>
                <UserNameInput
                  handleChangeUserName={handleChangeUserName}
                  value={userForm.name.value}
                  errorBoolean={userForm.name.errorBoolean}
                  onFocus={toggleComponentAVisibility}
                  type="transparent"
                  borderDesign="up"
                  order="top"
                  editable={!isLogging}
                  topPosition={4}
                />
                <EmailInput
                  handleChangeEmail={handleChangeEmail}
                  value={userForm.email.value}
                  errorBoolean={userForm.email.errorBoolean}
                  onFocus={toggleComponentAVisibility}
                  type="transparent"
                  borderDesign="up"
                  order="middle"
                  editable={!isLogging}
                  topPosition={2}
                />
                <PasswordInput
                  handleChangePassword={handleChangePassword}
                  value={userForm.password.value}
                  errorBoolean={userForm.password.errorBoolean}
                  onFocus={toggleComponentAVisibility}
                  type="transparent"
                  borderDesign="down"
                  order="bottom"
                  editable={!isLogging}
                  topPosition={2}
                />
                <SpaceBetweenInput />
              </>
            )}
            {isComponentBVisible && (
              <>
                <WhatsappInput
                  handleChangeWhatsapp={handleChangeWhatsappNumber}
                  value={userForm.whatsappNumber.value}
                  errorBoolean={userForm.whatsappNumber.errorBoolean}
                  onFocus={toggleComponentBVisibility}
                  type="transparent"
                  borderDesign="up"
                  order="top"
                  editable={!isLogging}
                  topPosition={2}
                />

                <CalendarInput
                  handleChangeBirthday={handleChangeBirthdate}
                  value={userForm.birthdate.value}
                  errorBoolean={userForm.birthdate.errorBoolean}
                  onFocus={toggleComponentBVisibility}
                  type="transparent"
                  borderDesign="down"
                  order="bottom"
                  editable={!isLogging}
                />
              </>
            )}

            <SpaceBetweenFormAndButton />
            {isComponentBVisible && isComponentAVisible && (
              <>
                <ViewWithLineAndIcon />

                <CTAButton
                  onPress={handleSignUp}
                  title="Cadastrar"
                  loading={isWaitingApiResponse}
                />
              </>
            )}
          </BodyTop>
        </KeyboardAvoidingView>

        {isComponentBVisible && isComponentAVisible && (
          <>
            <Footer>
              <FooterWrapper onPress={handleGoBack}>
                <IconContainer>
                  <Back
                    width={40}
                    height={40}
                    stroke={theme.COLORS.TEXT_LIGHT}
                    style={{ top: 2 }}
                    strokeWidth={2}
                  />
                </IconContainer>
                <FooterText>Voltar para o login</FooterText>

                <IconContainer style={{ width: 48 }}></IconContainer>
              </FooterWrapper>
            </Footer>
          </>
        )}
      </LinearGradientContainer>
    </TouchableWithoutFeedback>
  )
}
