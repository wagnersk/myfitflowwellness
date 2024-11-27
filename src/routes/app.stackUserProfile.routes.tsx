import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { UserProfile } from '@screens/Users/Profile/1-UserProfile'
import { UserSelectEditHomeProfile } from '@screens/Users/Profile/2-UserSelectEditHomeProfile'
import { UserSelectList } from '@screens/Users/Profile/2.1-UserSelectList'

import { UserSelectFreeEquipamentList } from '@screens/Users/Profile/2.2-UserSelectFreeEquipamentList'
import { UserSelectPulleyEquipamentList } from '@screens/Users/Profile/2.3-UserSelectPulleyEquipamentList'
import { UserSelectMachineEquipamentList } from '@screens/Users/Profile/2.4-UserSelectMachineEquipamentList'

import { UserFormEditProfile } from '@screens/Users/Profile/3-UserFormEditProfile'

const { Navigator, Screen } = createStackNavigator()

export function AppStackUserProfileRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="userProfile"
    >
      <Screen name="userProfile" component={UserProfile} />

      <Screen
        name="userSelectEditHomeProfile"
        component={UserSelectEditHomeProfile}
      />
      <Screen name="userFormEditProfile" component={UserFormEditProfile} />
      <Screen name="userSelectList" component={UserSelectList} />
      <Screen
        name="userSelectFreeEquipamentList"
        component={UserSelectFreeEquipamentList}
      />
      <Screen
        name="userSelectPulleyEquipamentList"
        component={UserSelectPulleyEquipamentList}
      />
      <Screen
        name="userSelectMachineEquipamentList"
        component={UserSelectMachineEquipamentList}
      />
    </Navigator>
  )
}
