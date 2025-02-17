import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { UserProfile } from '@screens/Users/Profile/1-UserProfile'

import { UserSelectFreeEquipamentList } from '@screens/Users/Profile/2.2-UserSelectFreeEquipamentList'
import { UserSelectPulleyEquipamentList } from '@screens/Users/Profile/2.3-UserSelectPulleyEquipamentList'
import { UserSelectMachineEquipamentList } from '@screens/Users/Profile/2.4-UserSelectMachineEquipamentList'

import { UserFormEditProfile } from '@screens/Users/Profile/3-UserFormEditProfile'
import { UserSupport } from '@screens/Users/Profile/2.1-UserSupport'
import { UserPlan } from '@screens/Users/Profile/2.1-UserPlan'
import { UserFriendList } from '@screens/Users/Profile/4-UserFriendList'
import { UserFriendProfile } from '@screens/Users/Profile/5-UserFriendProfile'
import { UserWorkouts } from '@screens/Users/Profile/6-UserWorkouts'
import { UserPhotoTimeline } from '@screens/Users/Profile/7-UserPhotoTimeline'

const { Navigator, Screen } = createStackNavigator()

export function AppStackUserProfileRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="userProfile"
    >
      <Screen name="userProfile" component={UserProfile} />

      <Screen name="userFormEditProfile" component={UserFormEditProfile} />
      <Screen name="userFriendProfile" component={UserFriendProfile} />
      <Screen name="userSupport" component={UserSupport} />
      <Screen name="userPlan" component={UserPlan} />
      <Screen name="userFriendList" component={UserFriendList} />
      <Screen name="userWorkouts" component={UserWorkouts} />
      <Screen name="userPhotoTimeline" component={UserPhotoTimeline} />

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
