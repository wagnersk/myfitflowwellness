import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { UserProfile } from '@screens/Users/Profile/1-UserProfile'

import { UserSelectFreeEquipamentList } from '@screens/Users/Profile/1.4-UserPrefferences/Components/1.1.1-UserSelectFreeEquipamentList'
import { UserSelectPulleyEquipamentList } from '@screens/Users/Profile/1.4-UserPrefferences/Components/1.1.2-UserSelectPulleyEquipamentList'
import { UserSelectMachineEquipamentList } from '@screens/Users/Profile/1.4-UserPrefferences/Components/1.1.3-UserSelectMachineEquipamentList'

import { UserFormEditProfile } from '@screens/Users/Profile/1.1-UserFormEditProfile'
import { UserSupport } from '@screens/Users/Profile/1.7-UserSupport'
import { UserPlan } from '@screens/Users/Profile/1.6-UserPlan'
import { UserFriendList } from '@screens/Users/Profile/1.3-UserFriendList'
import { UserFriendProfile } from '@screens/Users/Profile/1.3.1-UserFriendProfile'
import { UserWorkouts } from '@screens/Users/Profile/1.2-UserWorkouts'
import { UserChallenges } from '@screens/Users/Profile/1.3-UserChallenges'
import { UserPhotoTimeline } from '@screens/Users/Profile/1.4-UserPhotoTimeline'

import { UserPrefferences } from '@screens/Users/Profile/1.4-UserPrefferences'
import { UserPrefferencesSelectList } from '@screens/Users/Profile/1.4-UserPrefferences/Components/1.1.0-UserPrefferencesSelectList'
import { UserPersonalTrainer } from '@screens/Users/Profile/1.5-UserPersonalTrainer'
import ParQ from '@screens/Users/Profile/1.1-ParQ'
import AnamnesisForm from '@screens/Users/Profile/1.1-AnamnesisQuestion'

const { Navigator, Screen } = createStackNavigator()

export function AppStackUserProfileRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="userProfile"
    >
      <Screen name="userProfile" component={UserProfile} />

      <Screen name="userFormEditProfile" component={UserFormEditProfile} />
      <Screen name="userWorkouts" component={UserWorkouts} />
      <Screen name="userChallenges" component={UserChallenges} />
      <Screen name="userFriendList" component={UserFriendList} />
      <Screen name="userFriendProfile" component={UserFriendProfile} />
      <Screen name="userPhotoTimeline" component={UserPhotoTimeline} />

      <Screen name="userPlan" component={UserPlan} />
      <Screen name="userSupport" component={UserSupport} />

      <Screen name="parQ" component={ParQ} />
      <Screen name="anamnese" component={AnamnesisForm} />

      <Screen name="userPrefferences" component={UserPrefferences} />
      <Screen name="userPersonalTrainer" component={UserPersonalTrainer} />
      <Screen
        name="userPrefferencesSelectList"
        component={UserPrefferencesSelectList}
      />

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
