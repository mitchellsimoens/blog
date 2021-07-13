import { FunctionComponent } from 'react';
import { BlogPost } from '../../types/blog';
import Avatar from '../Avatar';
import Author from '../Author';
import CoverImage from '../CoverImage';
import DateFormatter from '../DateFormatter';
import PostTitle from './Title';

type Props = Pick<BlogPost, 'author' | 'coverImage' | 'date' | 'title'>;

const Header: FunctionComponent<Props> = ({ author, coverImage, date, title }) => (
  <>
    <PostTitle>{title}</PostTitle>

    {
      author
        ? (
          <div className="hidden md:block md:mb-12">
            <Avatar name={author.name} picture={author.picture} />
          </div>
        )
        : null
    }

    {
      coverImage
        ? (
          <div className="mb-8 md:mb-16 sm:mx-0">
            <CoverImage title={title} src={coverImage} height={620} width={1240} />
          </div>
        )
        : null
    }

    <div className="max-w-2xl mx-auto">
      <Author author={author} />

      <div className="mb-6 text-lg">
        <DateFormatter dateString={date} />
      </div>
    </div>
  </>
);

export default Header;
