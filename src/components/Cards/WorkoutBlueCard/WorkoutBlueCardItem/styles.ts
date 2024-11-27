import styled from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableOpacity } from 'react-native'

export const Container = styled(TouchableOpacity)`
  border-radius: 12px;
  margin-left: 32px;
  margin-right: 32px;
`

export const WorkoutCircleOfLetterSequence = styled.View`
  align-items: center;
  justify-content: center;

  width: 66px;
  height: 66px;
  border-radius: 33px;

  margin-left: 16px;
  margin-right: 16px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_CARD_BALL_BG};
`

export const GradientText = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.H1};
  font-size: ${RFValue(28)}px;
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
`

export const WorkoutCardInfoWrapper = styled.View`
  justify-content: center;
  flex: 1;
  height: 100%;
  justify-content: space-between;
  padding-top: 8px;
  padding-bottom: 8px;
`

export const WorkoutCardName = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
  font-family: ${({ theme }) => theme.FONTS.SUBTITLE};
  font-size: ${RFValue(14)}px;
  padding-bottom: 8px;
`

export const WorkoutCardDateWrapper = styled.View`
  flex-direction: row;
  border-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
`

export const WorkoutCardDateWrapperWithLine = styled.View`
  border-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
`

export const WorkoutCardDay = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(14)}px;
  opacity: 0.5;
`

export const WorkoutCardDateSeparator = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(14)}px;
`

export const WorkoutCardLineSeparator = styled.View`
  border: 0.5px solid;
  border-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
  margin-top: 2px;
  margin-bottom: 8px;
  border-radius: 2px;
  width: 100%;
`

export const WorkoutCardBulletsWrapper = styled.View`
  padding-bottom: 8px;
  flex-direction: row;
`

export const WorkoutCardBullets = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
  margin-right: 8px;
`

export const WorkoutCardForwardButton = styled.View`
  padding-right: 4px;
`

// por shadow no card para destacar a borda shadow styledcomp
export const ContainerGradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT_CARD,
  start: { x: 0, y: 1 },
  end: { x: 1, y: 0 },
}))`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 126px;
  width: 100%;
  border: 3px solid;
  border-color: #ffffff;
  border-radius: 12px;
`
