import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { UserProfile } from '@screens/Users/Profile/1-UserProfile'

import { UserSelectFreeEquipamentList } from '@screens/Users/Profile/1-UserProfile/screens/UserPrefferences/Components/1.1.1-UserSelectFreeEquipamentList'
import { UserSelectPulleyEquipamentList } from '@screens/Users/Profile/1-UserProfile/screens/UserPrefferences/Components/1.1.2-UserSelectPulleyEquipamentList'
import { UserSelectMachineEquipamentList } from '@screens/Users/Profile/1-UserProfile/screens/UserPrefferences/Components/1.1.3-UserSelectMachineEquipamentList'
import { UserPrefferencesSelectList } from '@screens/Users/Profile/1-UserProfile/screens/UserPrefferences/Components/1.1.0-UserPrefferencesSelectList'

/* screens UserProfile */
import { UserWorkouts } from '@screens/Users/Profile/1-UserProfile/screens/1-UserWorkouts'
import { UserPlan } from '@screens/Users/Profile/1-UserProfile/screens/2-UserPlan'
import { Questionnaires } from '@screens/Users/Profile/1-UserProfile/screens/3-Questionnaires'
import { UserSupport } from '@screens/Users/Profile/1-UserProfile/screens/4-UserSupport'

import { UserFormEditProfile } from '@screens/Users/Profile/1-UserProfile/screens/UserFormEditProfile'
import { UserFriendList } from '@screens/Users/Profile/1-UserProfile/screens/UserFriendList'
import { UserFriendProfile } from '@screens/Users/Profile/1-UserProfile/screens/UserFriendProfile'
import { UserChallenges } from '@screens/Users/Profile/1-UserProfile/screens/UserChallenges'
import { UserPhotoTimeline } from '@screens/Users/Profile/1-UserProfile/screens/UserPhotoTimeline'

import { UserPrefferences } from '@screens/Users/Profile/1-UserProfile/screens/UserPrefferences'
import { UserPersonalTrainer } from '@screens/Users/Profile/1-UserProfile/screens/UserPersonalTrainer'

import { ViewParQ } from '@screens/Users/Profile/1-UserProfile/screens/3-Questionnaires/screens/ViewParQ'
import { ParQ } from '@screens/Users/Profile/1-UserProfile/screens/3-Questionnaires/screens/ParQ'

/* import ViewAnamnesisForm from '@screens/Users/Profile/1.1-Questionnaires/screens/ViewAnamnesis'
import AnamnesisForm from '@screens/Users/Profile/1.1-Questionnaires/screens/AnamnesisForm'
 */
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

      <Screen name="questionnaires" component={Questionnaires} />
      <Screen name="parQ" component={ParQ} />

      <Screen name="viewParQ" component={ViewParQ} />

      {/*       <Screen name="anamneseForm" component={AnamnesisForm} />
      <Screen name="viewAnamneseForm" component={ViewAnamnesisForm} />
 */}
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
