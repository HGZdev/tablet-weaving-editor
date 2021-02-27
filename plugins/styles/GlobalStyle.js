import {createGlobalStyle} from './styled-components'
import Reset from './Reset'
import ResetBoxModel from './ResetBoxModel'
import ResetInput from './ResetInput'

const GlobalStyle = createGlobalStyle`
	${Reset}
	${ResetBoxModel}
	${ResetInput}
`

export default GlobalStyle
