import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import Author from '../components/Author'
import BlogLoading from '../components/blog/Loading'
import Layout from '../components/Layout'
import List from '../components/blog/List'
import TagList from '../components/blog/TagList'
import { getAllPosts, getAllTags } from '../lib/api'
import { siteTitle } from '../components/constants'
import { author } from '../content/authors/default'
import { BlogPost } from '../types/blog'

import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/plugins/autolinker/prism-autolinker.css'
import 'prismjs/plugins/command-line/prism-command-line.css'
import 'prismjs/plugins/diff-highlight/prism-diff-highlight.css'
import 'prismjs/plugins/inline-color/prism-inline-color.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/treeview/prism-treeview.css'

interface Props {
  allPosts: BlogPost[]
  allTags: string[]
}

const IndexList: FunctionComponent<Pick<Props, 'allPosts'>> = ({
  allPosts,
}) => <List page={1} perPage={10} total={allPosts.length} posts={allPosts} />

const Index: FunctionComponent<Props> = ({ allPosts, allTags }) => {
  const router = useRouter()
  const hasTags = allTags.length > 0

  return (
    <Layout containerVariant="narrow" title={siteTitle}>
      <Author author={author} />

      {router.isFallback ? (
        <BlogLoading />
      ) : (
        <div className="flex items-start">
          <div className="flex-1">
            <IndexList allPosts={allPosts} />
          </div>
          {hasTags ? (
            <div className="md:ml-12 sm:mt-12 md:mt-0 sm:ml-0 px-8 py-4 backdrop-blur">
              <TagList tags={allTags} />
            </div>
          ) : null}
        </div>
      )}
    </Layout>
  )
}

export default Index

export async function getStaticProps(): StaticProps<Props> {
  const allPosts = getAllPosts()
  const allTags = getAllTags()

  return {
    props: { allPosts, allTags },
  }
}
