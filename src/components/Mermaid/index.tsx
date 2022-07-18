import { FunctionComponent, useEffect } from 'react'

import mermaid from 'mermaid'

// TODO get mermaid typing back
const DEFAULT_CONFIG: any = {
  startOnLoad: true,
  theme: 'dark',
  // stop user configs in the mermaid files from overriding these keys
  secure: ['secure', 'securityLevel', 'startOnLoad', 'maxTextSize'],
  // escape tags and disable click events within the diagram
  securityLevel: 'strict',
  sequence: {
    diagramMarginY: 40,
  },
}

interface Props {
  config?: any
}

const Mermaid: FunctionComponent<Props> = ({ config }) => {
  mermaid.initialize({ ...DEFAULT_CONFIG, ...config })

  useEffect(() => {
    mermaid.contentLoaded()
  }, [config])

  return null
}

export default Mermaid
