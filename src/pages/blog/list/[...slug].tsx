import { FunctionComponent } from 'react'

import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import Author from '@/components/Author'
import List from '@/components/blog/List'
import BlogLoading from '@/components/blog/Loading'
import { siteTitle } from '@/components/constants'
import { author } from '@/content/authors/default'
import { Meta } from '@/layout/Meta'
import { getAllPosts, getAllTags } from '@/lib/api'
import { Main } from '@/templates/Main'
import { BlogPost } from '@/types/blog'

interface Props {
  list: string
  posts: BlogPost[]
}

const PostList: FunctionComponent<Props> = ({ list, posts }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <BlogLoading />
  }

  return (
    <Main
      meta={<Meta title={`Blog List: ${list} | ${siteTitle}`} description="" />}
    >
      <Author author={author} />
      <List page={1} perPage={9999999999} total={posts.length} posts={posts} />
    </Main>
  )
}

export default PostList

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const [list] = params.slug
  const posts = getAllPosts().filter((post) => {
    if (!post.tags) {
      return false
    }

    return post.tags.indexOf(list) !== -1
  })

  return {
    props: {
      list,
      posts,
    },
  }
}

export const getStaticPaths = async () => {
  const paths: string[] = []
  const tags = getAllTags()

  tags.forEach((tag) => paths.push(`/blog/list/${tag}`))

  return {
    paths,
    fallback: false,
  }
}
