import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { UserStatistics } from '@screens/Users/Statistics/1-UserStatistics'

const { Navigator, Screen } = createStackNavigator()

export function AppStackUserStatisticsRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="userStatistics"
    >
      <Screen name="userStatistics" component={UserStatistics} />
    </Navigator>
  )
}
