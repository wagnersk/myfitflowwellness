import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { UserHome } from '@screens/Users/Home/1-UserHome'
import { UserWorkoutList } from '@screens/Users/Home/2-UserWorkoutList'
import { UserWorkout } from '@screens/Users/Home/3-UserWorkout'
import { Camera } from '@screens/Users/Home/1.1-CameraComponent/Camera'
import { ParQ } from '@screens/Users/Profile/1-UserProfile/screens/3-Questionnaires/screens/ParQ'
import { UserAllCategories } from '@screens/Users/Marketplace/1-UserAllCategories'
import { MarketPlaceWorkoutList } from '@screens/Users/Marketplace/2-MarketPlaceWorkoutList'
import { MarketPlaceWorkoutDetail } from '@screens/Users/Marketplace/3-MarketPlaceWorkoutDetail'

/*
import { UserWorkoutInfoList } from '@screens/Users/1.2-UserWorkoutInfoList' */

const { Navigator, Screen } = createStackNavigator()

export function AppStackUserHomeRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="userHome"
    >
      <Screen
        name="userHome"
        component={UserHome}
        options={{
          gestureEnabled: false,
        }}
      />

      <Screen name="userWorkoutList" component={UserWorkoutList} />
      <Screen
        name="userAllCategories"
        component={UserAllCategories}
        options={{
          gestureEnabled: false,
        }}
      />
      <Screen
        name="marketPlaceWorkoutList"
        component={MarketPlaceWorkoutList}
        options={{
          gestureEnabled: false,
        }}
      />
      <Screen
        name="marketPlaceWorkoutDetail"
        component={MarketPlaceWorkoutDetail}
        options={{
          gestureEnabled: false,
        }}
      />

      <Screen
        name="parQ"
        component={ParQ}
        options={{
          gestureEnabled: false,
        }}
      />

      <Screen name="userWorkout" component={UserWorkout} />

      <Screen name="camera" component={Camera} />
    </Navigator>
  )
}
