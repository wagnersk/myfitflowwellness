import React, { useCallback, useState } from 'react'
import {
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Image,
  View,
  Text,
  ProgressBarAndroid,
} from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { BackButton } from '@components/Buttons/BackButton'
import { useAuth } from '@hooks/auth'
import backgroundImg from '../../../../../assets/back.png'

import {
  Container,
  Body,
  BodyImageWrapper,
  ImageBackgroundContainer,
  SettingsWrapper,
  UserName,
  ListWrapper,
  Header,
} from './styles'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { setStatusBarStyle } from 'expo-status-bar'

export function UserChallenges() {
  const { user, isWaitingApiResponse } = useAuth()
  const navigation = useNavigation()

  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: 'Desafio 30 Dias de Cardio',
      description: 'Complete 30 minutos de cardio todos os dias por 30 dias.',
      progress: 50,
      image:
        'https://img.freepik.com/fotos-premium/homem-barbudo-tatuado-musculoso-se-exercitando_136403-9395.jpg?w=826', // Placeholder para fotos ausentes
      createdBy: 'Amigo 1',
    },
    {
      id: 2,
      title: 'Desafio de Força',
      description:
        'Aumente sua força com treinos focados em levantamento de peso.',
      progress: 20,
      image:
        'https://totalpass.com/wp-content/uploads/2024/09/desafio-fitness-1.png',
      createdBy: 'Amigo 2',
    },
    {
      id: 3,
      title: 'Desafio de Flexibilidade',
      description: 'Melhore sua flexibilidade com yoga e alongamentos diários.',
      progress: 80,
      image:
        'https://img.freepik.com/fotos-gratis/pessoas-malhando-em-ambientes-fechados-com-halteres_23-2149175410.jpg?t=st=1744599504~exp=1744603104~hmac=66aba05aa0093a03369df6ac30675db66012ee3fb6a15c07243610acb41e668f&w=826',
      createdBy: 'Amigo 3',
    },
  ])

  function handleGoBack() {
    navigation.goBack()
  }

  function handleJoinChallenge(challengeId: number) {
    console.log(`Participando do desafio ${challengeId}`)
  }

  function handleViewDetails(challengeId: number) {
    console.log(`Visualizando detalhes do desafio ${challengeId}`)
  }

  function handleCreateChallenge() {
    console.log('Criar novo desafio')
    // Navegar para a tela de criação de desafios
  }
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
            <SafeAreaProvider style={{ width: `100%` }}>
              <SafeAreaView style={{ flex: 1 }}>
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
                      ? `Desafios`
                      : `Challenges`}
                  </UserName>
                </Header>
                <Body>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <ListWrapper>
                      {challenges.map((challenge) => (
                        <View
                          key={challenge.id}
                          style={{
                            backgroundColor: '#fff',
                            borderRadius: 10,
                            marginBottom: 20,
                            padding: 15,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            elevation: 5,
                          }}
                        >
                          <Image
                            alt="Challenge Image"
                            // Placeholder padrão
                            source={{
                              uri: challenge.image,
                            }}
                            style={{
                              width: '100%',
                              height: 150,
                              borderRadius: 10,
                              marginBottom: 10,
                            }}
                          />
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: 'bold',
                              marginBottom: 5,
                            }}
                          >
                            {challenge.title}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#666',
                              marginBottom: 10,
                            }}
                          >
                            {challenge.description}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#999',
                              marginBottom: 10,
                            }}
                          >
                            {user?.selectedLanguage === 'pt-br'
                              ? `Criado por: ${challenge.createdBy}`
                              : `Created by: ${challenge.createdBy}`}
                          </Text>
                          <ProgressBarAndroid
                            styleAttr="Horizontal"
                            indeterminate={false}
                            progress={challenge.progress / 100}
                            color="#4caf50"
                          />
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#4caf50',
                              marginTop: 5,
                            }}
                          >
                            {challenge.progress}%{' '}
                            {user?.selectedLanguage === 'pt-br'
                              ? 'Concluído'
                              : 'Completed'}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: 15,
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => handleJoinChallenge(challenge.id)}
                              style={{
                                backgroundColor: '#4caf50',
                                padding: 10,
                                borderRadius: 5,
                                flex: 1,
                                marginRight: 5,
                              }}
                            >
                              <Text
                                style={{
                                  color: '#fff',
                                  textAlign: 'center',
                                  fontWeight: 'bold',
                                }}
                              >
                                {user?.selectedLanguage === 'pt-br'
                                  ? 'Participar'
                                  : 'Join'}
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => handleViewDetails(challenge.id)}
                              style={{
                                backgroundColor: '#2196f3',
                                padding: 10,
                                borderRadius: 5,
                                flex: 1,
                                marginLeft: 5,
                              }}
                            >
                              <Text
                                style={{
                                  color: '#fff',
                                  textAlign: 'center',
                                  fontWeight: 'bold',
                                }}
                              >
                                {user?.selectedLanguage === 'pt-br'
                                  ? 'Detalhes'
                                  : 'Details'}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))}
                    </ListWrapper>
                  </ScrollView>
                  <TouchableOpacity
                    onPress={handleCreateChallenge}
                    style={{
                      backgroundColor: '#ff5722',
                      padding: 15,
                      borderRadius: 10,
                      alignItems: 'center',
                      marginTop: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}
                    >
                      {user?.selectedLanguage === 'pt-br'
                        ? 'Criar Novo Desafio'
                        : 'Create New Challenge'}
                    </Text>
                  </TouchableOpacity>
                </Body>
              </SafeAreaView>
            </SafeAreaProvider>
          </ImageBackgroundContainer>
        </ImageBackground>
      </BodyImageWrapper>
    </Container>
  )
}
