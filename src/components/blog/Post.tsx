import { FunctionComponent } from 'react'

import Head from 'next/head'

import Body from './Body'
import Footer from './Footer'
import Header from './Header'
import { BlogPost as BlogPostType } from '../../../types/blog'

interface Props {
  post: BlogPostType
}

const BlogPost: FunctionComponent<Props> = ({ post }) => (
  <article className="prose dark:prose-dark dark:md:prose-xl-dark">
    <Head>
      {post.ogImage?.url ? (
        <meta property="og:image" content={post.ogImage.url} />
      ) : null}
    </Head>

    <Header
      title={post.title}
      coverImage={post.coverImage}
      date={post.date}
      timeToRead={post.timeToRead}
    />

    <Body content={post.content} />

    <Footer author={post.author} />
  </article>
)

export default BlogPost
