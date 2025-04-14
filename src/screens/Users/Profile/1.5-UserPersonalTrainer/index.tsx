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
  BodyImageWrapper,
  BodyWrapper,
  Container,
  Header,
  ImageBackgroundContainer,
  SettingsWrapper,
  Title,
} from './styles'
import { BodyImageBackground } from '@components/ImageBackgrounds/BodyImageBackground'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { BackButton } from '@components/Buttons/BackButton'
import { setStatusBarStyle } from 'expo-status-bar'

export function UserPersonalTrainer() {
  const { user } = useAuth()
  const navigation = useNavigation()

  const [selectedTrainer, setSelectedTrainer] = useState({
    id: 1,
    name: 'João Silva',
    specialty: 'Musculação e Cardio',
    rating: 4.8,
    image: 'https://via.placeholder.com/150',
  })

  const trainers = [
    {
      id: 1,
      name: 'João Silva',
      specialty: 'Musculação e Cardio',
      rating: 4.8,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Maria Oliveira',
      specialty: 'Yoga e Pilates',
      rating: 4.6,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Carlos Santos',
      specialty: 'Crossfit e HIIT',
      rating: 4.9,
      image: 'https://via.placeholder.com/150',
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
                  <View>
                    <Title>Personal: </Title>
                  </View>
                </Header>
                {/* Header */}
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>
                    {user?.selectedLanguage === 'pt-br'
                      ? 'Seu Personal Trainer'
                      : 'Your Personal Trainer'}
                  </Text>
                </View>

                {/* Plano com o Personal Trainer Escolhido */}
                <View style={styles.selectedTrainerCard}>
                  <Image
                    source={{ uri: selectedTrainer.image }}
                    style={styles.trainerImage}
                  />
                  <View style={styles.trainerInfo}>
                    <Text style={styles.trainerName}>
                      {selectedTrainer.name}
                    </Text>
                    <Text style={styles.trainerSpecialty}>
                      {selectedTrainer.specialty}
                    </Text>
                    <Text style={styles.trainerRating}>
                      {user?.selectedLanguage === 'pt-br'
                        ? `Avaliação: ${selectedTrainer.rating}`
                        : `Rating: ${selectedTrainer.rating}`}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.managePlanButton}
                    onPress={handleManagePlan}
                  >
                    <Text style={styles.managePlanButtonText}>
                      {user?.selectedLanguage === 'pt-br'
                        ? 'Gerenciar Plano'
                        : 'Manage Plan'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Lista de Personal Trainers */}
                <Text style={styles.listTitle}>
                  {user?.selectedLanguage === 'pt-br'
                    ? 'Todos os Personal Trainers'
                    : 'All Personal Trainers'}
                </Text>
                <FlatList
                  data={trainers}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.trainerCard}>
                      <Image
                        source={{ uri: item.image }}
                        style={styles.trainerImage}
                      />
                      <View style={styles.trainerInfo}>
                        <Text style={styles.trainerName}>{item.name}</Text>
                        <Text style={styles.trainerSpecialty}>
                          {item.specialty}
                        </Text>
                        <Text style={styles.trainerRating}>
                          {user?.selectedLanguage === 'pt-br'
                            ? `Avaliação: ${item.rating}`
                            : `Rating: ${item.rating}`}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.selectTrainerButton}
                        onPress={() => handleSelectTrainer(item.id)}
                      >
                        <Text style={styles.selectTrainerButtonText}>
                          {user?.selectedLanguage === 'pt-br'
                            ? 'Selecionar'
                            : 'Select'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  contentContainerStyle={styles.listContainer}
                />
              </BodyWrapper>
            </SafeAreaView>
          </SafeAreaProvider>
        </ImageBackgroundContainer>
      </BodyImageWrapper>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedTrainerCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  trainerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  trainerInfo: {
    flex: 1,
  },
  trainerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  trainerSpecialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  trainerRating: {
    fontSize: 12,
    color: '#999',
  },
  managePlanButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
  },
  managePlanButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  trainerCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectTrainerButton: {
    backgroundColor: '#2196f3',
    padding: 10,
    borderRadius: 5,
  },
  selectTrainerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
