import { initializeApp } from 'firebase/app'

import {
   initializeAuth, 
  // @ts-ignore
  getReactNativePersistence 
} from 'firebase/auth'

import AsyncStorage from '@react-native-async-storage/async-storage'

export const firebaseApp = initializeApp({
  apiKey: 'AIzaSyCLyGGDic5SUZUMU2TdzgthNDG9v80On1I',
  authDomain: 'myfitflow-cfc19.firebaseapp.com',
  databaseURL: 'https://myfitflow-cfc19-default-rtdb.firebaseio.com',
  projectId: 'myfitflow-cfc19',
  storageBucket: 'myfitflow-cfc19.appspot.com',
  messagingSenderId: '290011374047',
  appId: '1:290011374047:web:c70b18a491129e9e4c246a',
  measurementId: 'G-4DGBF2DHW0',
})

// Initialize Firebase
export const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
})

export default firebaseApp
