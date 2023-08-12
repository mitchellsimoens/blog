import { FunctionComponent } from 'react'

import { Avatar } from '@nextui-org/react'

import TwitterFollow from './TwitterFollow'
import { Author as AuthorType } from '../../types/blog'

interface Props {
  author: AuthorType
}

const Author: FunctionComponent<Props> = ({ author }) => (
  <div className="max-w-2xl">
    <div className="hidden md:mb-12 md:block">
      <div className="flex items-start p-4">
        <Avatar
          src={author.picture}
          imgProps={{
            alt: author.name,
          }}
        />

        <div className="ml-7 flex-1 text-lg">{author.shortBio}</div>
      </div>

      {author.twitter ? (
        <div className="mt-7">
          <TwitterFollow handle={author.twitter} />
        </div>
      ) : null}
    </div>

    {
      <div className="mb-6 block md:hidden">
        <div className="flex items-start p-4">
          <Avatar
            src={author.picture}
            imgProps={{
              alt: author.name,
            }}
          />

          <div className="ml-7 flex-1 text-xl">{author.shortBio}</div>
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
