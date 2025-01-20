import React, { useEffect, useState } from 'react'
import {
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

import { useTheme } from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/core'
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
  Container,
  AuxText,
  AuxTextWrapper,
} from './styles'
import { EmailInput } from '@components/Forms/Inputs/EmailInput'
import { PasswordInput } from '@components/Forms/Inputs/PasswordInput'
import { UserNameInput } from '@components/Forms/Inputs/UserNameInput'
import { WhatsappInput } from '@components/Forms/Inputs/WhatsappInput'
import { CalendarInput } from '@components/Forms/Inputs/CalendarInput'
import { checkBirthdayDate } from '@utils/checkBirthdayDate'
import { emailRegex } from '@utils/emailRegex'
import { INewAccount } from '@src/@types/navigation'
import { BodyWrapper } from '../Login/styles'
import { IUnconfirmedUserData } from '@hooks/authTypes'

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
  const {
    isWaitingApiResponse,
    firebaseCreateUserAndSendEmailVerification,
    saveNewUserTempUnconfirmedData,
    isLogging,
    user,
  } = useAuth()
  const [activeErrorCheck, setActiveErrorCheck] = useState(false)

  const route = useRoute()

  const { selectedLanguage } = route.params as INewAccount

  const [userForm, setUserForm] = useState<IUserForm>({
    name: { value: '', errorBoolean: false },
    email: { value: '', errorBoolean: false },
    password: { value: '', errorBoolean: false },
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
      await checkBirthdate()

      const userData: IUnconfirmedUserData = {
        email: userForm.email.value,
        password: userForm.password.value,
        name: userForm.name.value,
        birthdate: userForm.birthdate.value,
        selectedLanguage: userForm.selectedLanguage.value,
      }

      const userId = await firebaseCreateUserAndSendEmailVerification(
        userForm.email.value,
        userForm.password.value,
      )

      if (userId) {
        await saveNewUserTempUnconfirmedData(userData, userId).then(() => {
          navigation.navigate('login', { selectedLanguage })
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(
          user?.selectedLanguage === 'pt-br' ? 'Erro' : 'Error',
          error.message,
        )
      } else {
        Alert.alert(
          user?.selectedLanguage === 'pt-br' ? 'Erro' : 'Error',
          user?.selectedLanguage === 'pt-br'
            ? 'Ocorreu um erro desconhecido'
            : 'An unknown error occurred',
        )
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

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })
  }, [])
  return (
    <Container>
      <LinearGradientContainer colors={['#000000', '#FFFFFF']}>
        <SafeAreaProvider style={{ width: `100%` }}>
          <SafeAreaView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <BodyWrapper>
                <KeyboardAvoidingView
                  style={{ width: '100%', flex: 1 }}
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <Header>
                      <MyFitFlowLogoComponent width={500} height={500} />
                    </Header>
                    <BodyTop>
                      <UserNameInput
                        placeholder={
                          selectedLanguage === 'pt-br' ? 'Nome' : 'Name'
                        }
                        handleChangeUserName={handleChangeUserName}
                        value={userForm.name.value}
                        errorBoolean={userForm.name.errorBoolean}
                        onFocus={() => {}}
                        type="transparent"
                        borderDesign="up"
                        order="top"
                        editable={!isLogging}
                        topPosition={4}
                      />
                      <EmailInput
                        placeholder={
                          selectedLanguage === 'pt-br' ? 'E-mail' : 'Email'
                        }
                        handleChangeEmail={handleChangeEmail}
                        value={userForm.email.value}
                        errorBoolean={userForm.email.errorBoolean}
                        onFocus={() => {}}
                        type="transparent"
                        borderDesign="up"
                        order="middle"
                        editable={!isLogging}
                        topPosition={2}
                      />
                      <PasswordInput
                        placeholder={
                          selectedLanguage === 'pt-br' ? 'Senha' : 'Password'
                        }
                        handleChangePassword={handleChangePassword}
                        value={userForm.password.value}
                        errorBoolean={userForm.password.errorBoolean}
                        onFocus={() => {}}
                        type="transparent"
                        borderDesign="down"
                        order="bottom"
                        editable={!isLogging}
                        topPosition={2}
                      />
                      <SpaceBetweenInput />
                      <AuxTextWrapper>
                        <AuxText>
                          {selectedLanguage === 'pt-br'
                            ? 'Apenas maiores de 18 anos.'
                            : 'Only for those over 18 years old.'}
                        </AuxText>
                      </AuxTextWrapper>

                      <CalendarInput
                        placeholder={
                          selectedLanguage === 'pt-br'
                            ? 'Data de nascimento'
                            : 'Date of Birth'
                        }
                        handleChangeBirthday={handleChangeBirthdate}
                        value={userForm.birthdate.value}
                        errorBoolean={userForm.birthdate.errorBoolean}
                        onFocus={() => {}}
                        type="transparent"
                        borderDesign="up-down"
                        order="alone"
                        editable={!isLogging}
                      />

                      <SpaceBetweenFormAndButton />
                      <SpaceBetweenFormAndButton />
                      <ViewWithLineAndIcon />
                      <SpaceBetweenFormAndButton />
                      <SpaceBetweenFormAndButton />
                      <CTAButton
                        onPress={handleSignUp}
                        title={
                          selectedLanguage === 'pt-br'
                            ? 'Cadastrar'
                            : 'Register'
                        }
                        loading={isWaitingApiResponse}
                      />
                    </BodyTop>
                  </ScrollView>
                </KeyboardAvoidingView>

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
                    <FooterText>
                      {selectedLanguage === 'pt-br'
                        ? 'Voltar para o login'
                        : 'Back to login'}
                    </FooterText>

                    <IconContainer style={{ width: 48 }}></IconContainer>
                  </FooterWrapper>
                </Footer>
              </BodyWrapper>
            </TouchableWithoutFeedback>
          </SafeAreaView>
        </SafeAreaProvider>
      </LinearGradientContainer>
    </Container>
  )
}
