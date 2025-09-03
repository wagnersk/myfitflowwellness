import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { MarketPlaceHome } from '@screens/Users/Marketplace/1-MarketPlaceHome'
import { MarketPlaceWorkoutList } from '@screens/Users/Marketplace/2-MarketPlaceWorkoutList'
import { MarketPlaceWorkoutDetail } from '@screens/Users/Marketplace/3-MarketPlaceWorkoutDetail'
import { MarketPlacePersonalsList } from '@screens/Users/Marketplace/4-MarketPlacePersonalsList'
import { MarketPlacePersonalsDetail } from '@screens/Users/Marketplace/5-MarketPlacePersonalsDetail'
import { UserAllCategories } from '@screens/Users/Marketplace/1-UserAllCategories'

const { Navigator, Screen } = createStackNavigator()

export function AppStackMarketPlaceHomeRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
      initialRouteName="marketPlaceHome"
    >
      <Screen name="marketPlaceHome" component={MarketPlaceHome} />
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

      <Screen name="userAllCategories" component={UserAllCategories} />

      {/* 
      <Screen name="userWorkoutInfoList" component={UserWorkoutInfoList} /> */}
    </Navigator>
  )
}
