import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  align-items: center;
  justify-content: center;
`

export const ImageContainer = styled.View`
  flex: 3;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #eaeaea;
`

export const StyledImage = styled.Image`
  width: 90%;
  height: 90%;
`

export const Controls = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 10px;
  background-color: #fff;
`

export const Button = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`

export const SaveButton = styled.TouchableOpacity`
  background-color: #28a745;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`

export const SaveButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`
