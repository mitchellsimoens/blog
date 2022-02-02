import { FunctionComponent } from 'react'

import { BlogPost } from '../../../types/blog'

type Props = Pick<BlogPost, 'tags'>

const Tags: FunctionComponent<Props> = ({ tags }) => (
  <div className="flex space-x-3">
    {tags?.map((tag) => (
      <div
        key={tag}
        className="rounded-full bg-indigo-100 py-2 px-4 text-xs leading-3 text-indigo-700 dark:bg-slate-900 dark:text-slate-400"
      >
        #{tag}
      </div>
    ))}
  </div>
)

export default Tags
