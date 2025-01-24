import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../assets/Home.svg'
import Profile from '../assets/Profile_tabbar.svg'
import ChartLineUp from '../assets/ChartLineUp.svg'
import UserCircle from '../assets/UserCircle.svg'
import Barbell from '../assets/Barbell.svg'
import House from '../assets/House.svg'

import { AppStackUserHomeRoutes } from './app.stackUserHome.routes'
import { AppStackMarketPlaceHomeRoutes } from './app.stackMarketPlaceHome.routes'
import { AppStackUserProfileRoutes } from './app.stackUserProfile.routes'
import { AppStackUserStatisticsRoutes } from './app.stackUserStatistics.routes'
import { useTheme } from 'styled-components'

const { Navigator, Screen, Group } = createBottomTabNavigator()

export function AppTabRoutes() {
  const theme = useTheme()

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.COLORS.BLUE_STROKE,
        tabBarInactiveTintColor: theme.COLORS.BLUE_STROKE,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopColor: '#1B077F',
        },
      }}
      initialRouteName="home"
    >
      <Screen
        name="userhome"
        component={AppStackUserHomeRoutes}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <House
              width={32}
              height={32}
              opacity={focused ? 1 : 0.4}
              fill={color}
            />
          ),
          tabBarHideOnKeyboard: true,
        }}
      />

      <Screen
        name="marketplacehome"
        component={AppStackMarketPlaceHomeRoutes}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Barbell
              width={32}
              height={32}
              opacity={focused ? 1 : 0.4}
              fill={color}
            />
          ),
          tabBarHideOnKeyboard: true,
        }}
      />

      {/* TODO , ATIVAR PERSONAL- estatisticas  */}
      {false && (
        <Screen
          name="estatisticas"
          component={AppStackUserStatisticsRoutes}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <ChartLineUp
                width={32}
                height={32}
                opacity={focused ? 1 : 0.4}
                fill={color}
              />
            ),
            tabBarHideOnKeyboard: true,
          }}
        />
      )}

      <Screen
        name="profile"
        component={AppStackUserProfileRoutes}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <UserCircle
              width={32}
              height={32}
              opacity={focused ? 1 : 0.4}
              fill={color}
            />
          ),
          tabBarHideOnKeyboard: true,
        }}
      />
    </Navigator>
  )
}
