import React, { useEffect, useState } from 'react'
import { Modal, View } from 'react-native'
import { Image } from 'expo-image'
import { useTheme } from 'styled-components/native'
import {
  WorkoutNameAndVideoWrapper,
  WorkoutNameWrapper,
  WorkoutName,
  WorkoutVideoPlayerButton,
  WorkoutTechieTittle,
} from './styles'
import PlayVideo from '@assets/PlayVideo.svg'
import { getTrimmedName } from '@utils/getTrimmedName'
import { IFormattedCardExerciseData, IUser } from '@hooks/authTypes'
import { useAuth } from '@hooks/auth'
import * as FileSystem from 'expo-file-system'
import { CachedVideoPlayerModal } from '@components/Modals/CachedVideoPlayerModal'
import { getMockedVideo } from './MockedVideos/getMockedVideo'

interface WorkoutNameAndVideoProps {
  isFocused: boolean
  disabled: boolean
  isOpenModalVideoPlayer: boolean
  item: IFormattedCardExerciseData
  selectedLanguage: 'pt-br' | 'us'
  exerciseIndex: number
  user: IUser
  openVideoPlayer: () => void
  closeModal: (
    type: 'videoplayer' | 'weight' | 'sets' | 'notes' | 'rangeOfSets',
  ) => void
}

const WorkoutNameAndVideo: React.FC<WorkoutNameAndVideoProps> = ({
  isFocused,
  disabled,
  isOpenModalVideoPlayer,
  item,
  selectedLanguage,
  user,
  openVideoPlayer,
  closeModal,
}) => {
  const theme = useTheme()
  const { updateCachedVideoTable, cachedVideoTable } = useAuth()

  const [modalVideoLocalPathState, setModalVideoLocalPathState] =
    useState<string>('')

  useEffect(() => {
    if (user.anonymousUser) return
    if (!cachedVideoTable) {
      startDownload(
        item.workoutExerciseVideoUrl,
        item.workoutExerciseVideoFileName,
        item.workoutExerciseVideoMIME,
        item.workoutExerciseId,
      )
    }

    const mySelectedCachedWorkoutIndex = cachedVideoTable?.findIndex(
      (v) => v.workoutExerciseId === item.workoutExerciseId,
    )

    const isNewCachedVideo = mySelectedCachedWorkoutIndex === -1

    const {
      workoutExerciseVideoUrl,
      workoutExerciseVideoFileName,
      workoutExerciseVideoMIME,
      workoutExerciseId,
    } = item

    if (isNewCachedVideo) {
      startDownload(
        workoutExerciseVideoUrl,
        workoutExerciseVideoFileName,
        workoutExerciseVideoMIME,
        workoutExerciseId,
      )
    }

    if (
      !isNewCachedVideo &&
      !!cachedVideoTable &&
      mySelectedCachedWorkoutIndex !== undefined
    ) {
      const getPath =
        cachedVideoTable[mySelectedCachedWorkoutIndex].cachedLocalPathVideo

      checkIfPathIsValidAndDownloadAgainIfNothandleCheckFileExists()

      async function checkIfPathIsValidAndDownloadAgainIfNothandleCheckFileExists() {
        const fileExists = await checkFileExists(getPath)

        if (!fileExists) {
          startDownload(
            workoutExerciseVideoUrl,
            workoutExerciseVideoFileName,
            workoutExerciseVideoMIME,
            workoutExerciseId,
          )
        }

        async function checkFileExists(path: string) {
          try {
            const fileInfo = await FileSystem.getInfoAsync(path)
            return fileInfo.exists
          } catch (error) {
            console.error('Erro ao verificar arquivo:', error)
            return false
          }
        }
      }

      setModalVideoLocalPathState(getPath)
    }

    async function startDownload(
      url?: string,
      name?: string,
      mime?: string,
      id?: string,
    ) {
      if (!url || !name || !mime || !id) return
      // const cachedVideo = await downloadAndCacheVideo(name, mime, url, id)
      const videoPath = await downloadVideo(name, mime, url)

      if (videoPath) {
        await cacheVideo(videoPath, id)
        return videoPath
      }

      if (videoPath) {
        setModalVideoLocalPathState(videoPath)
      }
    }

    async function cacheVideo(
      videoPath: string,
      exerciseId: string,
    ): Promise<void> {
      try {
        await updateCachedVideoTable(videoPath, exerciseId)
      } catch (error) {
        console.error('Erro ao salvar o vídeo no cache:', error)
      }
    }
  }, [cachedVideoTable, cachedVideoTable?.length])

  useEffect(() => {
    if (!user.anonymousUser) return
    if (!item.workoutExerciseId) return

    if (isOpenModalVideoPlayer) {
      const videoPath = getMockedVideo(item.workoutExerciseId) // Usando a função getFakeVideo

      if (!item.workoutExerciseVideoFileName) return
      if (!item.workoutExerciseVideoMIME) return
      if (!videoPath) return

      checkFileExists(
        item.workoutExerciseVideoFileName,
        item.workoutExerciseVideoMIME,
        videoPath,
      )
    }
    async function checkFileExists(
      fileName: string,
      mime: string,
      url: string,
    ) {
      const getPath = await downloadVideo(fileName, mime, url)
      if (!getPath) return
      console.log(`getPath`, getPath)
      setModalVideoLocalPathState(getPath)
    }
  }, [isOpenModalVideoPlayer])

  async function downloadVideo(
    fileName: string,
    mime: string,
    url: string,
  ): Promise<string | null> {
    try {
      const fileUri = `${FileSystem.documentDirectory}${fileName}${mime}`

      const downloadResumable = FileSystem.createDownloadResumable(
        url,
        fileUri,
        {},
      )
      const downloadResult = await downloadResumable.downloadAsync()

      if (!downloadResult?.uri) return null

      return downloadResult.uri
    } catch (error) {
      console.error('Erro ao baixar o vídeo:', error)
      return null
    }
  }
  return (
    <WorkoutNameAndVideoWrapper pointerEvents={disabled ? 'none' : 'auto'}>
      <WorkoutNameWrapper style={{ opacity: isFocused ? 1 : 0.4 }}>
        <WorkoutName>
          {getTrimmedName(
            23,
            item &&
              selectedLanguage &&
              item.workoutExerciseName &&
              item.workoutExerciseName[selectedLanguage],
          )}
        </WorkoutName>
        {item &&
          item.workoutTechiesTittle &&
          item.workoutTechiesTittle[selectedLanguage] && (
            <WorkoutTechieTittle>
              {getTrimmedName(
                23,
                item &&
                  selectedLanguage &&
                  item.workoutTechiesTittle &&
                  item.workoutTechiesTittle[selectedLanguage],
              )}
            </WorkoutTechieTittle>
          )}
      </WorkoutNameWrapper>

      {item.workoutExerciseThumbnailUrl && (
        <WorkoutVideoPlayerButton
          onPress={isFocused ? openVideoPlayer : () => {}}
          enabled={isFocused}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 12,
                borderWidth: 2,
                backgroundColor: `gray`,
                opacity: isFocused ? 0.6 : 0.3,
              }}
              source={{ uri: item.workoutExerciseThumbnailUrl }} // TODO aplicar cachedImage Aqui
              contentFit="cover"
              cachePolicy={'memory-disk'}
              alt=""
            />
          </View>

          <PlayVideo
            width={88}
            height={88}
            strokeWidth={2}
            style={{ position: 'absolute', opacity: isFocused ? 1 : 0.4 }}
            stroke={theme.COLORS.NEUTRA_LETTER_AND_STROKE}
          />
        </WorkoutVideoPlayerButton>
      )}
      <Modal visible={isOpenModalVideoPlayer}>
        {modalVideoLocalPathState && (
          <CachedVideoPlayerModal
            closeVideoPlayer={() => closeModal('videoplayer')}
            localPath={modalVideoLocalPathState}
          />
        )}
      </Modal>
    </WorkoutNameAndVideoWrapper>
  )
}

export default WorkoutNameAndVideo
