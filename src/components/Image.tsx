import { FunctionComponent } from 'react'

import { ImageProps } from 'next/image'

// const cloudflareImageLoader = ({
//   quality = 75,
//   src,
//   width,
// }: ImageLoaderProps) => {
//   const imageUrl = new URL(global?.window?.document?.location?.href || blogUrl)

//   imageUrl.pathname = src

//   return `${imageWorkersUrl}?width=${width}&quality=${quality}&image=${imageUrl.toString()}`
// }

const Image: FunctionComponent<ImageProps> = (props) => (
  <img src={props.src as string} alt={props.alt} />
)
// process.env.NODE_ENV === 'development' ? (
//   <NextImage unoptimized={true} {...props} />
// ) : (
//   <NextImage {...props} loader={cloudflareImageLoader} />
// )

export default Image
