import { FunctionComponent } from 'react'

import { GetStaticProps } from 'next'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

import BlogLoading from '@/components/blog/Loading'
import BlogPost from '@/components/blog/Post'
import { Meta } from '@/layout/Meta'
import { getAllPosts, getPostBySlug } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'
import { Main } from '@/templates/Main'
import { BlogPost as BlogPostType } from '@/types/blog'

import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/plugins/autolinker/prism-autolinker.css'
import 'prismjs/plugins/command-line/prism-command-line.css'
import 'prismjs/plugins/diff-highlight/prism-diff-highlight.css'
import 'prismjs/plugins/inline-color/prism-inline-color.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/treeview/prism-treeview.css'

interface Props {
  post: BlogPostType
}

const Post: FunctionComponent<Props> = ({ post }) => {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  if (router.isFallback) {
    return <BlogLoading />
  }

  return (
    <Main
      meta={
        <Meta
          title={`${post.title} | Mitchell Simoens Blog`}
          description={post.excerpt ?? ''}
        />
      }
    >
      <BlogPost post={post} />
    </Main>
  )
}

export default Post

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const slug = Array.isArray(params.slug) ? [...params.slug] : [params.slug]

  slug.unshift('', 'blog')

  const post = getPostBySlug(slug)
  const content = await markdownToHtml(post.content || '', post.file)

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export const getStaticPaths = async () => {
  const paths = getAllPosts().map((item) => item.slug)

  return {
    paths,
    fallback: false,
  }
}
