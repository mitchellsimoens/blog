import { FunctionComponent } from 'react';
import { Author as AuthorType } from '../types/blog';
import Avatar from './Avatar';
import TwitterFollow from './TwitterFollow';

interface Props {
  author: AuthorType;
}

const Author: FunctionComponent<Props> = ({ author }) => (
  <div className="max-w-2xl mx-auto">
    <div className="hidden md:block md:mb-12">
      <Avatar name={author.name} picture={author.picture} />

      {
        author.twitter
          ? <TwitterFollow handle={author.twitter}/>
          : null
      }
    </div>

    {
      <div className="block md:hidden mb-6">
        <Avatar name={author.name} picture={author.picture} />

        {
          author.twitter
            ? <TwitterFollow handle={author.twitter}/>
            : null
        }
      </div>
    }
  </div>
);

export default Author;
