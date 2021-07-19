import { FunctionComponent } from 'react'
import { BlogPost } from '../../types/blog'
import CoverImage from '../CoverImage'
import DateFormatter from '../DateFormatter'
import PostTitle from './Title'

type Props = Pick<BlogPost, 'coverImage' | 'date' | 'title'>

const Header: FunctionComponent<Props> = ({ coverImage, date, title }) => (
  <>
    <PostTitle>{title}</PostTitle>

    {coverImage ? (
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} height={620} width={1240} />
      </div>
    ) : null}

    <div className="max-w-2xl">
      <div className="mb-6 text-lg">
        <DateFormatter dateString={date} />
      </div>
    </div>
  </>
)

export default Header
