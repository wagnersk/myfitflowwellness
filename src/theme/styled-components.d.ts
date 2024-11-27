import 'styled-components/native'
import theme from './index'

declare module 'styled-components/native' {
  type ThemeType = typeof theme

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeType {}
}
