import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import BlogLoading from '../../components/blog/Loading';
import BlogPost from '../../components/blog/Post';
import Layout from '../../components/Layout';
import { getAllPosts, getPostBySlug } from '../../lib/api';
import markdownToHtml from '../../lib/markdownToHtml';
import { BlogPost as BlogPostType } from '../../types/blog';

import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/plugins/autolinker/prism-autolinker.css';
import 'prismjs/plugins/command-line/prism-command-line.css';
import 'prismjs/plugins/diff-highlight/prism-diff-highlight.css';
import 'prismjs/plugins/inline-color/prism-inline-color.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/treeview/prism-treeview.css';

// https://github.com/vercel/next.js/tree/canary/examples/blog-starter

interface Props {
  post: BlogPostType;
}

const Post: FunctionComponent<Props> = ({ post }) => {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout title="Test">
      {
        router.isFallback
          ? <BlogLoading />
          : <BlogPost post={post} />
      }
    </Layout>
  );
};

export default Post;

export async function getStaticProps({ params }: any) {
  const slug = Array.isArray(params.slug) ? [...params.slug] : [params.slug];

  slug.unshift('', 'post');

  const post = getPostBySlug(slug);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const paths = getAllPosts().map(item => item.slug);

  return {
    paths,
    fallback: true,
  };
}
