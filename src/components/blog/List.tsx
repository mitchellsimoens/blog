import { FunctionComponent } from 'react'

import { BlogPost } from '../../../types/blog'
import DateFormatter from '../DateFormatter'
import Link from '../Link'
import Pager from '../Pager'
import Tags from './Tags'

interface Props {
  page: number
  perPage: number
  posts: BlogPost[]
  total: number
}

const List: FunctionComponent<Props> = ({ page, perPage, posts, total }) => {
  const pageNum = page > 0 ? page : 1
  const offset = (pageNum - 1) * perPage
  const pagePosts = posts.slice(offset, offset + perPage)
  const totalPages = Math.ceil(total / perPage)

  return (
    <>
      <ul className="!mt-0">
        {pagePosts
          .filter((post) => Boolean(post.slug))
          .map((post) => (
            <li
              key={post.slug}
              className="mb-12 rounded bg-white px-8 py-4 shadow dark:bg-slate-800"
            >
              <Link as={post.slug} href="/blog/[...slug]">
                <span className="text-xl">{post.title}</span>
              </Link>

              <div className="my-2 flex border-b border-gray-200 pb-4 text-xs">
                <div>
                  <DateFormatter dateString={post.date} />
                </div>

                <div className="ml-8">{post.timeToRead}</div>
              </div>

              <div className="text-base">{post.excerpt}</div>

              {post.tags?.length && (
                <div className="mt-4">
                  <Tags tags={post.tags} />
                </div>
              )}
            </li>
          ))}
      </ul>
      <Pager
        page={page}
        total={totalPages}
        uriPrefix="/blog/page/"
        firstPageUri="/blog"
      />
    </>
  )
}

export default List
