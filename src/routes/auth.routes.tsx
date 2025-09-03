import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Splash } from '@screens/Auth/Splash'
import { OnBoarding1 } from '@screens/Auth/onBoarding/Onboarding1'
import { OnBoarding2 } from '@screens/Auth/onBoarding/Onboarding2'
import { OnBoarding3 } from '@screens/Auth/onBoarding/Onboarding3'
import { OnBoarding4 } from '@screens/Auth/onBoarding/Onboarding4'
import { Login } from '@screens/Auth/Login'
import { NewAccount } from '@screens/Auth/NewAccount'

const { Navigator, Screen } = createStackNavigator()

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        headerLeft: () => null,
      }}
      initialRouteName="splash"
    >
      <Screen name="splash" component={Splash} />
      <Screen name="onBoarding1" component={OnBoarding1} />
      <Screen name="onBoarding2" component={OnBoarding2} />
      <Screen name="onBoarding3" component={OnBoarding3} />
      <Screen name="onBoarding4" component={OnBoarding4} />

      <Screen name="login" component={Login} />

      <Screen name="newAccount" component={NewAccount} />
    </Navigator>
  )
}
