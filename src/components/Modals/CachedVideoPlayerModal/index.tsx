import React, { useRef } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { useVideoPlayer, VideoView } from 'expo-video'
import { useEvent } from 'expo'

interface Props {
  closeVideoPlayer: () => void
  localPath: string
}

export function CachedVideoPlayerModal({ localPath, closeVideoPlayer }: Props) {
  const player = useVideoPlayer(localPath, (player) => {
    player.loop = true
    player.play()
  })

  const { isPlaying } = useEvent(player, 'playingChange', {
    isPlaying: player.playing,
  })
  return (
    <View style={styles.contentContainer}>
      {localPath ? (
        <>
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />
          <View style={styles.controlsContainer}>
            <Button
              title={isPlaying ? 'Pause' : 'Play'}
              onPress={() => {
                if (isPlaying) {
                  player.pause()
                } else {
                  player.play()
                }
              }}
            />
          </View>
        </>
      ) : (
        <View style={styles.contentContainer}>
          {/* Adicione um indicador de carregamento aqui, se necessário */}
        </View>
      )}
      <Button title="Voltar" onPress={closeVideoPlayer} />
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
})
