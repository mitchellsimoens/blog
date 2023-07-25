import { FunctionComponent } from 'react'

import PostTitle from './Title'
import { BlogPost } from '../../../types/blog'
import CoverImage from '../CoverImage'
import DateFormatter from '../DateFormatter'

type Props = Pick<BlogPost, 'coverImage' | 'date' | 'timeToRead' | 'title'>

const Header: FunctionComponent<Props> = ({
  coverImage,
  date,
  timeToRead,
  title,
}) => (
  <>
    <PostTitle>{title}</PostTitle>

    {coverImage ? (
      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage title={title} src={coverImage} height={620} width={1240} />
      </div>
    ) : null}

    <div className="max-w-2xl">
      <div className="mb-6 text-sm">
        <DateFormatter dateString={date} />
        <div>{timeToRead}</div>
      </div>
    </div>
  </>
)

export default Header
