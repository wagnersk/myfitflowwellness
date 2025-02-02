import React from 'react'
import { View } from 'react-native'
import { Image } from 'expo-image'
import { useTheme } from 'styled-components/native'
import {
  WorkoutNameAndVideoWrapper,
  WorkoutNameWrapper,
  WorkoutName,
  WorkoutVideoPlayerButton,
} from './styles'
import PlayVideo from '@assets/PlayVideo.svg'
import { getTrimmedName } from '@utils/getTrimmedName'
import { IFormattedCardExerciseData, SignInProps } from '@hooks/authTypes'
import { IModalStateWorkoutLogData } from '../..'

interface WorkoutNameAndVideoProps {
  isFocused: boolean
  item: IFormattedCardExerciseData
  selectedLanguage: 'pt-br' | 'us'
  modalWeightState: IModalStateWorkoutLogData
  exerciseIndex: number
  user: SignInProps
  openVideoPlayer: () => void
}

const WorkoutNameAndVideo: React.FC<WorkoutNameAndVideoProps> = ({
  isFocused,
  item,
  selectedLanguage,
  modalWeightState,
  exerciseIndex,
  user,
  openVideoPlayer,
}) => {
  const theme = useTheme()

  return (
    <WorkoutNameAndVideoWrapper>
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
      </WorkoutNameWrapper>

      {item.workoutExerciseThumbnailUrl && (
        <WorkoutVideoPlayerButton
          disabled={exerciseIndex !== 0 && user?.anonymousUser}
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
    </WorkoutNameAndVideoWrapper>
  )
}

export default WorkoutNameAndVideo
