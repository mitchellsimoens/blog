import { FunctionComponent } from 'react'

import { ImageProps } from 'next/image'
import { useRouter } from 'next/router'

// const cloudflareImageLoader = ({
//   quality = 75,
//   src,
//   width,
// }: ImageLoaderProps) => {
//   const imageUrl = new URL(global?.window?.document?.location?.href || blogUrl)

//   imageUrl.pathname = src

//   return `${imageWorkersUrl}?width=${width}&quality=${quality}&image=${imageUrl.toString()}`
// }

const Image: FunctionComponent<ImageProps> = (props) => {
  const router = useRouter()

  return <img src={`${router.basePath}/${props.src}`} alt={props.alt} />
}
// process.env.NODE_ENV === 'development' ? (
//   <NextImage unoptimized={true} {...props} />
// ) : (
//   <NextImage {...props} loader={cloudflareImageLoader} />
// )

export default Image
