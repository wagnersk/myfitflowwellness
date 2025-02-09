import React from 'react'

import { useAuth } from '@hooks/auth'
import { NavigationContainer } from '@react-navigation/native'

import { AppTabRoutes } from './app.tab.routes'
import { AuthRoutes } from './auth.routes'
import { LoadAnimation } from '../components/LoadAnimation'
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth()
  const svgSize = Math.min(width, height) * 0.7 // Ajuste a proporção conforme necessário
  /*
      isLogging é quando ta fazendo login
      isLoadingUserStorageData é quando carregou os dados do async
       */
  return isLoadingUserStorageData ? (
    <LoadAnimation width={svgSize} height={svgSize} />
  ) : (
    <NavigationContainer>
      {user?.id ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
