import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Splash } from '@screens/Auth/Splash'
import { Login } from '@screens/Auth/Login'
import { NewAccount } from '@screens/Auth/NewAccount'

const { Navigator, Screen } = createStackNavigator()

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="splash">
      <Screen name="splash" component={Splash} />

      <Screen
        name="login"
        component={Login}
        options={{
          gestureEnabled: false,
        }}
      />

      <Screen name="newAccount" component={NewAccount} />
    </Navigator>
  )
}
