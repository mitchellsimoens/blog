import Head from 'next/head';
import { FunctionComponent } from 'react';
import Body from './Body';
import Header from './Header';
import { BlogPost as BlogPostType } from '../../types/blog';

interface Props {
  post: BlogPostType;
}

const BlogPost: FunctionComponent<Props> = ({ post }) => (
  <article className="prose md:prose-xl dark:prose-dark dark:md:prose-xl-dark">
    <Head>
      {
        post.ogImage?.url
          ? <meta property="og:image" content={post.ogImage.url} />
          : null
      }
    </Head>

    <Header
      title={post.title}
      coverImage={post.coverImage}
      date={post.date}
      author={post.author}
    />

    <Body content={post.content} />
  </article>
);

export default BlogPost;
