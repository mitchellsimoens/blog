import { FunctionComponent } from 'react'

import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import Author from '@/components/Author'
import List from '@/components/blog/List'
import BlogLoading from '@/components/blog/Loading'
import TagList from '@/components/blog/TagList'
import { author } from '@/content/authors/default'
import { Meta } from '@/layout/Meta'
import { getAllPosts, getAllTags } from '@/lib/api'
import { Main } from '@/templates/Main'
import { BlogPost } from '@/types/blog'

interface Props {
  allPosts: BlogPost[]
  allTags: string[]
}

const IndexList: FunctionComponent<Pick<Props, 'allPosts'>> = ({
  allPosts,
}) => <List page={1} perPage={10} total={allPosts.length} posts={allPosts} />

const Blog: FunctionComponent<Props> = ({ allPosts, allTags }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <BlogLoading />
  }

  const hasTags = allTags?.length > 0

  return (
    <Main meta={<Meta title="Blog" description="Blog articles" />}>
      <Author author={author} />

      <div className="flex items-start">
        <div className="flex-1">
          <IndexList allPosts={allPosts} />
        </div>
        {hasTags && (
          <div className="px-8 py-4 sm:mt-12 sm:ml-0 md:ml-12 md:mt-0">
            <TagList tags={allTags} />
          </div>
        )}
      </div>
    </Main>
  )
}

export default Blog

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPosts()
  const allTags = getAllTags()

  return {
    props: { allPosts, allTags },
  }
}
