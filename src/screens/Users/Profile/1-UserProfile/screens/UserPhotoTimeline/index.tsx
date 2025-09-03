import React, { useCallback, useState } from 'react'
import {
  ImageBackground,
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { BackButton } from '@components/Buttons/BackButton'
import { useAuth } from '@hooks/auth'
import backgroundImg from '@assetsApp/back.png'

import {
  Container,
  Body,
  BodyImageWrapper,
  ImageBackgroundContainer,
  Header,
  SettingsWrapper,
  UserName,
  ListWrapper,
} from './styles'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { setStatusBarStyle } from 'expo-status-bar'

export function UserPhotoTimeline() {
  const { user, isWaitingApiResponse } = useAuth()
  const [photos, setPhotos] = useState<{
    [key: string]: { profile: string; side: string; gym: string }
  }>({})
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  function handleUploadPhoto(month: string, type: 'profile' | 'side' | 'gym') {
    console.log(`Uploading ${type} photo for ${month}`)
  }

  const months =
    user?.selectedLanguage === 'pt-br'
      ? [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro',
        ]
      : [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ]

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()!.setOptions({ tabBarStyle: { display: 'none' } })
      setStatusBarStyle('dark')
    }, []),
  )

  return (
    <Container>
      <BodyImageWrapper>
        <ImageBackground
          source={backgroundImg}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <ImageBackgroundContainer>
            <SafeAreaView style={{ flex: 1, width: '100%' }}>
              <Header>
                <SettingsWrapper>
                  <BackButton
                    onPress={handleGoBack}
                    changeColor
                    disabled={isWaitingApiResponse}
                  />
                </SettingsWrapper>
                <UserName>
                  {user?.selectedLanguage === 'pt-br'
                    ? `Linha do Tempo`
                    : `Timeline`}
                </UserName>
              </Header>
              <Body>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <ListWrapper>
                    {months.map((month) => (
                      <View key={month} style={styles.monthCard}>
                        <Text style={styles.monthTitle}>{month}</Text>
                        <View style={styles.photoRow}>
                          {/* Profile Photo */}
                          <TouchableOpacity
                            onPress={() => handleUploadPhoto(month, 'profile')}
                            style={styles.photoContainer}
                          >
                            {photos[month]?.profile ? (
                              <Image
                                alt=""
                                source={{ uri: photos[month].profile }}
                                style={styles.photo}
                              />
                            ) : (
                              <View style={styles.placeholder}>
                                <Text style={styles.placeholderText}>
                                  {user?.selectedLanguage === 'pt-br'
                                    ? 'Perfil'
                                    : 'Profile'}
                                </Text>
                              </View>
                            )}
                            <Text style={styles.photoLabel}>
                              {user?.selectedLanguage === 'pt-br'
                                ? 'Foto de Perfil'
                                : 'Profile Photo'}
                            </Text>
                          </TouchableOpacity>

                          {/* Side Photo */}
                          <TouchableOpacity
                            onPress={() => handleUploadPhoto(month, 'side')}
                            style={styles.photoContainer}
                          >
                            {photos[month]?.side ? (
                              <Image
                                alt=""
                                source={{ uri: photos[month].side }}
                                style={styles.photo}
                              />
                            ) : (
                              <View style={styles.placeholder}>
                                <Text style={styles.placeholderText}>
                                  {user?.selectedLanguage === 'pt-br'
                                    ? 'Lado'
                                    : 'Side'}
                                </Text>
                              </View>
                            )}
                            <Text style={styles.photoLabel}>
                              {user?.selectedLanguage === 'pt-br'
                                ? 'Foto de Lado'
                                : 'Side Photo'}
                            </Text>
                          </TouchableOpacity>

                          {/* Gym Photo */}
                          <TouchableOpacity
                            onPress={() => handleUploadPhoto(month, 'gym')}
                            style={styles.photoContainer}
                          >
                            {photos[month]?.gym ? (
                              <Image
                                alt=""
                                source={{ uri: photos[month].gym }}
                                style={styles.photo}
                              />
                            ) : (
                              <View style={styles.placeholder}>
                                <Text style={styles.placeholderText}>
                                  {user?.selectedLanguage === 'pt-br'
                                    ? 'Academia'
                                    : 'Gym'}
                                </Text>
                              </View>
                            )}
                            <Text style={styles.photoLabel}>
                              {user?.selectedLanguage === 'pt-br'
                                ? 'Foto na Academia'
                                : 'Gym Photo'}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  </ListWrapper>
                </ScrollView>
              </Body>
            </SafeAreaView>
          </ImageBackgroundContainer>
        </ImageBackground>
      </BodyImageWrapper>
    </Container>
  )
}

const styles = StyleSheet.create({
  monthCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  photoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10, // Adiciona um gap entre as fotos (se suportado)
  },
  photoContainer: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5, // Espaçamento horizontal entre fotos
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  placeholderText: {
    color: '#888',
    fontSize: 12,
  },
  photoLabel: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
  },
})
