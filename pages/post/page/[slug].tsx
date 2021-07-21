import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import { siteTitle } from '../../../components/constants'
import Author from '../../../components/Author'
import BlogLoading from '../../../components/blog/Loading'
import Layout from '../../../components/Layout'
import List from '../../../components/blog/List'
import TagList from '../../../components/blog/TagList'
import { author } from '../../../content/authors/default'
import { getAllPosts, getAllTags } from '../../../lib/api'
import { BlogPost } from '../../../types/blog'

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

  return (
    <Layout
      containerVariant={hasTags ? undefined : 'narrow'}
      title={`Posts Page ${page} | ${siteTitle}`}
    >
      <Author author={author} />

      {router.isFallback ? (
        <BlogLoading />
      ) : (
        <div className="flex">
          <div className="flex-1">
            <PostList page={page} posts={posts} />
          </div>
          {hasTags ? (
            <div className="md:ml-12 sm:mt-12 md:mt-0 sm:ml-0">
              <TagList tags={tags} />
            </div>
          ) : null}
        </div>
      )}
    </Layout>
  )
}

export default PostPager

export async function getStaticProps({ params }: any): StaticProps<Props> {
  const posts = getAllPosts()
  const tags = getAllTags()

  return {
    props: {
      page: parseInt(params.slug),
      posts,
      tags,
    },
  }
}

export async function getStaticPaths() {
  const perPage = 10
  const posts = getAllPosts()
  const numPages = Math.ceil(posts.length / perPage)
  const paths = []

  for (let i = 1; i <= numPages; i++) {
    paths.push(`/post/page/${i}`)
  }

  return {
    paths,
    fallback: false,
  }
}
