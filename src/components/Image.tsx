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

const Image: FunctionComponent<ImageProps> = ({
  alt,
  className,
  height,
  quality = 75,
  src,
  width,
}) => {
  const router = useRouter()
  let url: URL

  try {
    // src could be the full URI
    url = new URL(src as string)
  } catch {
    if (process.env.NODE_ENV === 'development') {
      // during development, we don't need to proxy thru worker
      url = new URL(src as string, 'http://localhost:3000')
    } else {
      // src was not full URI so let's build the relative path
      url = new URL(`/api/image${src}`, router.basePath || 'http://example.com')
    }
  }

  if (quality) {
    url.searchParams.set('quality', `${quality}`)
  }

  if (width) {
    url.searchParams.set('width', `${width}`)
  }

  return (
    <img
      src={`${url.pathname}${url.search}`}
      alt={alt}
      className={className}
      height={height}
      width={width}
    />
  )
}
// process.env.NODE_ENV === 'development' ? (
//   <NextImage unoptimized={true} {...props} />
// ) : (
//   <NextImage {...props} loader={cloudflareImageLoader} />
// )

export default Image
