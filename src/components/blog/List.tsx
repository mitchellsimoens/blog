import { FunctionComponent } from 'react'

import { BlogPost } from '../../../types/blog'
import DateFormatter from '../DateFormatter'
import Link from '../Link'
import Pager from '../Pager'

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
      <ul>
        {pagePosts
          .filter((post) => Boolean(post.slug))
          .map((post) => (
            <li key={post.slug} className="mb-12 px-8 py-4">
              <Link as={post.slug} href="/blog/[...slug]">
                <span className="text-xl">{post.title}</span>
              </Link>

              <div className="my-2 flex text-xs">
                <div>
                  <DateFormatter dateString={post.date} />
                </div>

                <div className="ml-8">{post.timeToRead}</div>
              </div>

              <div>{post.excerpt}</div>
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
