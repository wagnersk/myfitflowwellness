import React, { useRef } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { Video as ExpoVideo, ResizeMode } from 'expo-av'

interface Props {
  closeVideoPlayer: () => void
  localPath: string
}

export function CachedVideoPlayerModal({ localPath, closeVideoPlayer }: Props) {
  const videoRef = useRef<ExpoVideo>(null)
  return (
    <View style={styles.container}>
      {localPath ? (
        <ExpoVideo
          ref={videoRef}
          style={styles.video}
          source={{ uri: localPath }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          shouldPlay
          //  onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
      ) : (
        <View style={styles.loadingContainer}>
          {/* Adicione um indicador de carregamento aqui, se necessário */}
        </View>
      )}
      <View style={styles.buttons}>
        <Button title="Voltar" onPress={closeVideoPlayer} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
})
