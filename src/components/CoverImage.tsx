import { FunctionComponent } from 'react'

import cn from 'classnames'

import Image from './Image'
import Link from './Link'

interface Props {
  height: number
  slug?: string
  src: string
  title: string
  width: number
}

const CoverImage: FunctionComponent<Props> = ({
  title,
  src,
  slug,
  height,
  width,
}) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-sm', {
        'hover:shadow-md transition-shadow duration-200': slug,
      })}
      width={width}
      height={height}
    />
  )

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default CoverImage
