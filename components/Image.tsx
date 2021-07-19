import NextImage, { ImageLoaderProps, ImageProps } from 'next/image'
import { FunctionComponent } from 'react'

const normalizeSrc = (src: string) => (src[0] === '/' ? src.slice(1) : src)

const cloudflareLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const params = [`width=${width}`]

  if (quality) {
    params.push(`quality=${quality}`)
  }

  const paramsString = params.join(',')

  return `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`
}

const Image: FunctionComponent<ImageProps> = (props) =>
  process.env.NODE_ENV === 'development' ? (
    <NextImage unoptimized={true} {...props} />
  ) : (
    <NextImage {...props} loader={cloudflareLoader} />
  )

export default Image
