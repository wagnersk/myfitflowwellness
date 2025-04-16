import React, { useCallback, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useAuth } from '@hooks/auth'
import {
  Body,
  BodyImageWrapper,
  BodyWrapper,
  Container,
  Header,
  ImageBackgroundContainer,
  ListTitle,
  ManagePlanButton,
  ManagePlanButtonText,
  PersonalTrainerCard,
  SelectButton,
  SettingsWrapper,
  Title,
  TrainerInfo,
  TrainerName,
  TrainerRating,
  TrainerSpecialty,
  TrainerImage,
} from './styles'
import { BodyImageBackground } from '@components/ImageBackgrounds/BodyImageBackground'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { BackButton } from '@components/Buttons/BackButton'
import { setStatusBarStyle } from 'expo-status-bar'

export function UserPersonalTrainer() {
  const { user } = useAuth()
  const navigation = useNavigation()
  const [selectedTrainer, setSelectedTrainer] = useState(
    user?.selectedLanguage === 'pt-br'
      ? {
          id: 1,
          name: 'João Silva',
          specialty: 'Musculação e Cardio',
          rating: 4.8,
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj-CcjqvRBrCvwU7uAn4IP0ra2LPIuUgKCzA&s',
        }
      : {
          id: 1,
          name: 'John Silva',
          specialty: 'Weightlifting and Cardio',
          rating: 4.8,
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj-CcjqvRBrCvwU7uAn4IP0ra2LPIuUgKCzA&s',
        },
  )

  const trainers =
    user?.selectedLanguage === 'pt-br'
      ? [
          {
            id: 1,
            name: 'João Silva',
            specialty: 'Musculação e Cardio',
            rating: 4.8,
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj-3xemvkCCe4QDvf3w2N0jSy4S3t2sbNluA&s',
          },
          {
            id: 2,
            name: 'Maria Oliveira',
            specialty: 'Yoga e Pilates',
            rating: 4.6,
            image:
              'https://ogimg.infoglobo.com.br/in/25209322-ef7-e13/FT1086A/meme-chloe.png',
          },
          {
            id: 3,
            name: 'Carlos Santos',
            specialty: 'Crossfit e HIIT',
            rating: 4.9,
            image:
              'https://bordalo.observador.pt/v2/q:60/rs:fill:980/c:770:433:nowe:0:0/plain/https://s3.observador.pt/wp-content/uploads/2016/09/29124952/meme_770x433_acf_cropped.jpg',
          },
        ]
      : [
          {
            id: 1,
            name: 'John Silva',
            specialty: 'Weightlifting and Cardio',
            rating: 4.8,
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj-3xemvkCCe4QDvf3w2N0jSy4S3t2sbNluA&s',
          },
          {
            id: 2,
            name: 'Mary Oliveira',
            specialty: 'Yoga and Pilates',
            rating: 4.6,
            image:
              'https://ogimg.infoglobo.com.br/in/25209322-ef7-e13/FT1086A/meme-chloe.png',
          },
          {
            id: 3,
            name: 'Charles Santos',
            specialty: 'Crossfit and HIIT',
            rating: 4.9,
            image:
              'https://bordalo.observador.pt/v2/q:60/rs:fill:980/c:770:433:nowe:0:0/plain/https://s3.observador.pt/wp-content/uploads/2016/09/29124952/meme_770x433_acf_cropped.jpg',
          },
        ]

  function handleManagePlan() {
    console.log('Gerenciar plano com o personal trainer selecionado')
  }

  function handleSelectTrainer(trainerId: number) {
    console.log(`Selecionar personal trainer com ID: ${trainerId}`)
  }
  function handleGoBack() {
    navigation.goBack()
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
        <BodyImageBackground />

        <ImageBackgroundContainer>
          <SafeAreaProvider style={{ width: `100%` }}>
            <SafeAreaView style={{ flex: 1 }}>
              <BodyWrapper>
                <Header>
                  <SettingsWrapper>
                    <BackButton
                      onPress={handleGoBack}
                      changeColor
                      disabled={false}
                    />
                  </SettingsWrapper>
                  <Title>
                    {user?.selectedLanguage === 'pt-br'
                      ? 'Seu Personal Trainer'
                      : 'Your Personal Trainer'}
                  </Title>
                </Header>
                <Body>
                  <PersonalTrainerCard>
                    <TrainerImage
                      alt=""
                      source={{ uri: selectedTrainer.image }}
                    />
                    <TrainerInfo>
                      <TrainerName>{selectedTrainer.name}</TrainerName>
                      <TrainerSpecialty>
                        {selectedTrainer.specialty}
                      </TrainerSpecialty>
                      <TrainerRating>
                        {user?.selectedLanguage === 'pt-br'
                          ? `Avaliação: ${selectedTrainer.rating}`
                          : `Rating: ${selectedTrainer.rating}`}
                      </TrainerRating>
                    </TrainerInfo>
                    <ManagePlanButton onPress={handleManagePlan}>
                      <ManagePlanButtonText>
                        {user?.selectedLanguage === 'pt-br'
                          ? 'Gerenciar'
                          : 'Manage'}
                      </ManagePlanButtonText>
                    </ManagePlanButton>
                  </PersonalTrainerCard>

                  {/* Lista de Personal Trainers */}
                  <ListTitle>
                    {user?.selectedLanguage === 'pt-br'
                      ? 'Todos os Personal Trainers'
                      : 'All Personal Trainers'}
                  </ListTitle>
                  <FlatList
                    data={trainers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <PersonalTrainerCard>
                        <TrainerImage alt="" source={{ uri: item.image }} />
                        <TrainerInfo>
                          <TrainerName>{item.name}</TrainerName>
                          <TrainerSpecialty>{item.specialty}</TrainerSpecialty>
                          <TrainerRating>
                            {user?.selectedLanguage === 'pt-br'
                              ? `Avaliação: ${item.rating}`
                              : `Rating: ${item.rating}`}
                          </TrainerRating>
                        </TrainerInfo>
                        <SelectButton
                          onPress={() => handleSelectTrainer(item.id)}
                        >
                          <ManagePlanButtonText>
                            {user?.selectedLanguage === 'pt-br'
                              ? 'Selecionar'
                              : 'Select'}
                          </ManagePlanButtonText>
                        </SelectButton>
                      </PersonalTrainerCard>
                    )}
                    contentContainerStyle={{ paddingBottom: 20 }}
                  />
                </Body>
              </BodyWrapper>
            </SafeAreaView>
          </SafeAreaProvider>
        </ImageBackgroundContainer>
      </BodyImageWrapper>
    </Container>
  )
}
