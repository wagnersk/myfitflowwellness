import React from 'react'

import { useAuth } from '@hooks/auth'
import { NavigationContainer } from '@react-navigation/native'

import { AppTabRoutes } from './app.tab.routes'
import { AuthRoutes } from './auth.routes'
import { LoadAnimation } from '../components/LoadAnimation'

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth()
  /*
      isLogging é quando ta fazendo login
      isLoadingUserStorageData é quando carregou os dados do async
       */
  return isLoadingUserStorageData ? (
    <LoadAnimation />
  ) : (
    <NavigationContainer>
      {user?.id ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
