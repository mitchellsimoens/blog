import NextImage, { ImageLoaderProps, ImageProps } from 'next/image'
import { FunctionComponent } from 'react'
import { blogUrl, imageWorkersUrl } from './constants'

const cloudflareImageLoader = ({ quality, src, width }: ImageLoaderProps) => {
  if (!quality) {
    quality = 75
  }

  const imageUrl = new URL(global?.window?.document?.location?.href || blogUrl)

  imageUrl.pathname = src

  return `${imageWorkersUrl}?width=${width}&quality=${quality}&image=${imageUrl.toString()}`
}

const Image: FunctionComponent<ImageProps> = (props) =>
  process.env.NODE_ENV === 'development' ? (
    <NextImage unoptimized={true} {...props} />
  ) : (
    <NextImage {...props} loader={cloudflareImageLoader} />
  )

export default Image
