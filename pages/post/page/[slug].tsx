import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { TwitterFollowButton } from 'react-twitter-embed';
import BlogLoading from '../../../components/blog/Loading';
import Layout from '../../../components/Layout';
import List from '../../../components/blog/List';
import { getAllPosts } from '../../../lib/api';
import { BlogPost } from '../../../types/blog';
import { siteTitle } from '../../../components/constants';

interface Props {
  page: number;
  posts: BlogPost[];
}

const PostPager: FunctionComponent<Props> = props => {
  const router = useRouter();

  return (
    <Layout containerVariant="narrow" title={`Posts Page ${props.page} | ${siteTitle}`}>
      <TwitterFollowButton options={{size: 'large'}} screenName="LikelyMitch" />

      {
        router.isFallback
          ? <BlogLoading />
          : <List page={props.page} perPage={10} total={props.posts.length} posts={props.posts} />
      }
    </Layout>
  );
};

export default PostPager;

export async function getStaticProps({ params }: any) {
  const posts = getAllPosts();

  return {
    props: {
      page: parseInt(params.slug),
      posts,
    },
  }
}

export async function getStaticPaths() {
  const perPage = 10;
  const posts = getAllPosts();
  const numPages = Math.ceil(posts.length / perPage);
  const paths = [];

  for (let i = 1; i <= numPages; i++) {
    paths.push(`/post/page/${i}`);
  }

  return {
    paths,
    fallback: false,
  };
}
