import { FunctionComponent, useCallback } from 'react'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
  Divider,
  Pagination,
} from '@nextui-org/react'
import { useRouter } from 'next/router'

import { BlogPost } from '../../../types/blog'
import DateFormatter from '../DateFormatter'

interface Props {
  page: number
  perPage: number
  posts: BlogPost[]
  total: number
}

const List: FunctionComponent<Props> = ({ page, perPage, posts, total }) => {
  const router = useRouter()
  const pageNum = page > 0 ? page : 1
  const offset = (pageNum - 1) * perPage
  const pagePosts = posts.slice(offset, offset + perPage)
  const totalPages = Math.ceil(total / perPage)

  const onChange = useCallback(
    (newPage: number) => {
      const url = newPage === 1 ? '/blog' : `/blog/page/${newPage}`

      router.push(url)
    },
    [router],
  )

  return (
    <>
      {pagePosts
        .filter((post) => Boolean(post.slug))
        .map((post) => (
          <Card key={post.slug} fullWidth className="mb-4">
            <CardHeader className="flex">
              <div className="flex flex-col">
                <p className="text-md">{post.title}</p>
                <p className="text-small text-default-500">
                  <DateFormatter dateString={post.date} />
                </p>
              </div>
            </CardHeader>

            <Divider />

            <CardBody>
              <p>{post.excerpt}</p>
            </CardBody>

            <Divider />

            <CardFooter>
              {post.tags?.map((tag) => <Chip key={tag}>#{tag}</Chip>)}
            </CardFooter>
          </Card>
        ))}

      <Pagination
        disableAnimation
        page={page}
        total={totalPages}
        onChange={onChange}
        className="mt-5 mb-1"
      />
    </>
  )
}

export default List
