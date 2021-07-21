import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import { siteTitle } from '../../../components/constants'
import Author from '../../../components/Author'
import BlogLoading from '../../../components/blog/Loading'
import Layout from '../../../components/Layout'
import List from '../../../components/blog/List'
import { author } from '../../../content/authors/default'
import { getAllPosts, getAllTags } from '../../../lib/api'
import { BlogPost } from '../../../types/blog'

interface Props {
  list: string
  posts: BlogPost[]
}

const PostList: FunctionComponent<Props> = ({ list, posts }) => {
  const router = useRouter()

  return (
    <Layout
      containerVariant="narrow"
      title={`Blog List: ${list} | ${siteTitle}`}
    >
      <Author author={author} />

      {router.isFallback ? (
        <BlogLoading />
      ) : (
        <List
          page={1}
          perPage={9999999999}
          total={posts.length}
          posts={posts}
        />
      )}
    </Layout>
  )
}

export default PostList

export async function getStaticProps({ params }: any): StaticProps<Props> {
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

export async function getStaticPaths() {
  const paths = []
  const tags = getAllTags()

  for (const tag of tags) {
    paths.push(`/post/list/${tag}`)
  }

  return {
    paths,
    fallback: false,
  }
}
