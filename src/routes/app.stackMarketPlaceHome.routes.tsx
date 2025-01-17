import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { MarketPlaceHome } from '@screens/Users/Marketplace/1-MarketPlaceHome'
import { MarketPlaceWorkoutList } from '@screens/Users/Marketplace/2-MarketPlaceWorkoutList'
import { MarketPlaceWorkoutDetail } from '@screens/Users/Marketplace/3-MarketPlaceWorkoutDetail'
import { MarketPlacePersonalsList } from '@screens/Users/Marketplace/4-MarketPlacePersonalsList'
import { MarketPlacePersonalsDetail } from '@screens/Users/Marketplace/5-MarketPlacePersonalsDetail'

const { Navigator, Screen } = createStackNavigator()

export function AppStackMarketPlaceHomeRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="marketPlaceHome"
    >
      <Screen
        name="marketPlaceHome"
        component={MarketPlaceHome}
        options={{
          gestureEnabled: false,
        }}
      />
      <Screen
        name="marketPlaceWorkoutList"
        component={MarketPlaceWorkoutList}
      />
      <Screen
        name="marketPlaceWorkoutDetail"
        component={MarketPlaceWorkoutDetail}
      />
      <Screen
        name="marketPlacePersonalsList"
        component={MarketPlacePersonalsList}
      />
      <Screen
        name="marketPlacePersonalsDetail"
        component={MarketPlacePersonalsDetail}
      />
      {/* 
      <Screen name="userWorkoutInfoList" component={UserWorkoutInfoList} /> */}
    </Navigator>
  )
}
