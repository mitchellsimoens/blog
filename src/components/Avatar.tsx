import { FunctionComponent } from 'react'

interface Props {
  alt: string
  className?: string
  picture: string
}

const Avatar: FunctionComponent<Props> = ({ alt, className, picture }) => (
  <img alt={alt} className={className} height={48} src={picture} width={48} />
)

export default Avatar
