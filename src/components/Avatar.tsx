import { FunctionComponent } from 'react'

import Image from './Image'

interface Props {
  alt: string
  className?: string
  picture: string
}

const Avatar: FunctionComponent<Props> = ({ alt, className, picture }) => (
  <Image alt={alt} className={className} height={48} src={picture} width={48} />
)

export default Avatar
