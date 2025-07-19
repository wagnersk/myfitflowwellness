/* eslint-disable camelcase */
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import React, { useCallback, useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { StatusBar } from 'expo-status-bar'

import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter'
import {
  RobotoSlab_500Medium,
  RobotoSlab_700Bold,
} from '@expo-google-fonts/roboto-slab'
import { ThemeProvider } from 'styled-components'

import { AuthProvider } from '@hooks/auth'
import { Routes } from './src/routes'
//
import theme from './src/theme'
import { SafeAreaProvider } from 'react-native-safe-area-context'

SplashScreen.preventAutoHideAsync()
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Inter_400Regular,
          Inter_700Bold,
          RobotoSlab_500Medium,
          RobotoSlab_700Bold,
        })
        // await new Promise(resolve => setTimeout(resolve,2000));
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider theme={theme}>
        <StatusBar style="light" translucent />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}
