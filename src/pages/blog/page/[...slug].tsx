import { FunctionComponent } from 'react'

import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import Author from '@/components/Author'
import List from '@/components/blog/List'
import BlogLoading from '@/components/blog/Loading'
import TagList from '@/components/blog/TagList'
import { siteTitle } from '@/components/constants'
import { author } from '@/content/authors/default'
import { Meta } from '@/layout/Meta'
import { getAllPosts, getAllTags } from '@/lib/api'
import { Main } from '@/templates/Main'
import { BlogPost } from '@/types/blog'

interface Props {
  page: number
  posts: BlogPost[]
  tags: string[]
}

const PostList: FunctionComponent<Pick<Props, 'page' | 'posts'>> = ({
  page,
  posts,
}) => <List page={page} perPage={10} total={posts.length} posts={posts} />

const PostPager: FunctionComponent<Props> = ({ page, posts, tags }) => {
  const router = useRouter()
  const hasTags = tags.length > 0

  if (router.isFallback) {
    return <BlogLoading />
  }

  return (
    <Main
      meta={<Meta title={`Posts Page ${page} | ${siteTitle}`} description="" />}
    >
      <Author author={author} />
      <div className="flex items-start">
        <div className="flex-1">
          <PostList page={page} posts={posts} />
        </div>
        {hasTags ? (
          <div className="px-8 py-4 sm:mt-12 sm:ml-0 md:ml-12 md:mt-0">
            <TagList tags={tags} />
          </div>
        ) : null}
      </div>
    </Main>
  )
}

export default PostPager

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const posts = getAllPosts()
  const tags = getAllTags()

  return {
    props: {
      page: parseInt(params.slug, 10),
      posts,
      tags,
    },
  }
}

export const getStaticPaths = async () => {
  const perPage = 10
  const posts = getAllPosts()
  const numPages = Math.ceil(posts.length / perPage)
  const paths = []

  for (let i = 1; i <= numPages; i += 1) {
    paths.push(`/blog/page/${i}`)
  }

  return {
    paths,
    fallback: false,
  }
}
