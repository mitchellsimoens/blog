import { FunctionComponent } from 'react'

import Link from '../Link'

interface Props {
  tags: string[]
}

const TagList: FunctionComponent<Props> = ({ tags }) => (
  <>
    <h3 className="text-xl mb-6">Lists:</h3>
    <ul>
      {tags.map((tag, idx) => (
        <li key={tag} className={idx + 1 < tags.length ? 'mb-6' : ''}>
          <Link as={`/post/list/${tag}`} href="/post/list/[...slug]">
            <span className="text-base">{tag}</span>
          </Link>
        </li>
      ))}
    </ul>
  </>
)

export default TagList