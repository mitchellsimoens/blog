import { FunctionComponent } from 'react'
import { Author as AuthorType } from '../types/blog'
import Avatar from './Avatar'
import TwitterFollow from './TwitterFollow'

interface Props {
  author: AuthorType
}

const Author: FunctionComponent<Props> = ({ author }) => (
  <div className="max-w-2xl">
    <div className="hidden md:block md:mb-12">
      <div className="flex items-start backdrop-blur p-4">
        <Avatar
          alt={author.name}
          className="overflow-hidden rounded-3xl"
          picture={author.picture}
        />

        <div className="flex-1 ml-7 text-lg">{author.shortBio}</div>
      </div>

      {author.twitter ? (
        <div className="mt-7">
          <TwitterFollow handle={author.twitter} />
        </div>
      ) : null}
    </div>

    {
      <div className="block md:hidden mb-6">
        <div className="flex items-start backdrop-blur p-4">
          <Avatar
            alt={author.name}
            className="overflow-hidden rounded-3xl"
            picture={author.picture}
          />

          <div className="flex-1 ml-7 text-xl">{author.shortBio}</div>
        </div>

        {author.twitter ? (
          <div className="mt-7">
            <TwitterFollow handle={author.twitter} />
          </div>
        ) : null}
      </div>
    }
  </div>
)

export default Author
