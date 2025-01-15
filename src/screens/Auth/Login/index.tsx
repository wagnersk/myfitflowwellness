import React, { useEffect, useState } from 'react'
import {
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  BackHandler,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native'

import { useAuth } from '@hooks/auth'
import { useTheme } from 'styled-components'

import { useNavigation } from '@react-navigation/core'

import { CTAButton } from '@components/Buttons/CTAButton'
import { ViewWithLineAndIcon } from '@components/ViewWithLineAndIcon'
import Forward from '@assets/Forward.svg'

import {
  Header,
  MyFitFlowLogoComponent,
  BodyTop,
  ForgotPasswordWrapper,
  ForgotPasswordText,
  ForgotPasswordButtonWrapper,
  Footer,
  IconContainer,
  FooterWrapper,
  FooterText,
  LinearGradientContainer,
  ButtonWithIcon,
} from './styles'
import { EmailInput } from '@components/Forms/Inputs/EmailInput'
import { PasswordInput } from '@components/Forms/Inputs/PasswordInput'

export function Login() {
  const { firebaseSignIn, firebaseForgotPassword, isLogging, user } = useAuth()

  const [activeErrorCheck, setActiveErrorCheck] = useState(false)
  const navigation = useNavigation()
  const theme = useTheme()

  const [userForm, setUserForm] = useState({
    email: { value: '', errorBoolean: false },
    password: { value: '', errorBoolean: false },
  })

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  // firebaseSignIn('wagnereletroskateet@gmail.com', '123456')

  async function handleSignIn() {
    const letActiveErrorCheck = true
    setActiveErrorCheck(letActiveErrorCheck)

    try {
      await checkEmail()
      await checkPassword()

      await firebaseSignIn(userForm.email.value, userForm.password.value)
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

  async function handleSignUp() {
    navigation.navigate('newAccount')
  }

  async function handleForgotPassword() {
    if (!user) return
    if (!userForm.email.value) {
      return Alert.alert(
        user.selectedLanguage === 'pt-br'
          ? 'E-mail não informado'
          : 'Email not provided',
        user.selectedLanguage === 'pt-br'
          ? 'Preencha o campo E-mail'
          : 'Please fill in the Email field',
      )
    }

    await firebaseForgotPassword(userForm.email.value)
    Alert.alert(
      user.selectedLanguage === 'pt-br'
        ? 'Verifique sua caixa de Email'
        : 'Check your Email inbox',
      user.selectedLanguage === 'pt-br'
        ? `Foi enviado um link para o email \n ${userForm.email.value}`
        : `A link has been sent to the email \n ${userForm.email.value}`,
    )
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })
  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradientContainer colors={['#000000', '#FFFFFF']}>
        <KeyboardAvoidingView
          style={{ width: '100%', flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Header>
              <MyFitFlowLogoComponent width={500} height={500} />
            </Header>
            <BodyTop>
              <EmailInput
                handleChangeEmail={handleChangeEmail}
                value={userForm.email.value}
                errorBoolean={userForm.email.errorBoolean}
                onFocus={() => {}}
                type="transparent"
                borderDesign="up"
                order="top"
                topPosition={2}
                editable={!isLogging}
              />
              <PasswordInput
                handleChangePassword={handleChangePassword}
                value={userForm.password.value}
                errorBoolean={userForm.password.errorBoolean}
                onFocus={() => {}}
                type="transparent"
                borderDesign="down"
                order="bottom"
                editable={!isLogging}
              />

              <ForgotPasswordWrapper>
                <ForgotPasswordButtonWrapper
                  onPress={handleForgotPassword}
                  disabled={!isLogging}
                >
                  <ForgotPasswordText>esqueci minha senha</ForgotPasswordText>
                </ForgotPasswordButtonWrapper>
              </ForgotPasswordWrapper>

              <ButtonWithIcon>
                <CTAButton
                  disabled={isLogging}
                  loading={isLogging}
                  title="Entrar"
                  onPress={handleSignIn}
                />
                <ViewWithLineAndIcon />
              </ButtonWithIcon>
            </BodyTop>
          </ScrollView>
        </KeyboardAvoidingView>
        <Footer>
          <FooterWrapper onPress={handleSignUp} disabled={isLogging}>
            <IconContainer style={{ width: 48 }}></IconContainer>

            <FooterText>Criar uma conta</FooterText>
            <IconContainer>
              <Forward
                width={40}
                height={40}
                stroke={theme.COLORS.TEXT_LIGHT}
                style={{ top: 2 }}
                strokeWidth={2}
              />
            </IconContainer>
          </FooterWrapper>
        </Footer>
      </LinearGradientContainer>
    </TouchableWithoutFeedback>
  )
}
