import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import BlogLoading from '../components/blog/Loading';
import Layout from '../components/Layout';
import List from '../components/blog/List';
import { getAllPosts } from '../lib/api';
import { siteTitle } from '../components/constants';

import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/plugins/autolinker/prism-autolinker.css';
import 'prismjs/plugins/command-line/prism-command-line.css';
import 'prismjs/plugins/diff-highlight/prism-diff-highlight.css';
import 'prismjs/plugins/inline-color/prism-inline-color.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/treeview/prism-treeview.css';

interface Props {
  allPosts: any[];
}

const Index: FunctionComponent<Props> = ({ allPosts }) => {
  const router = useRouter();

  return (
    <Layout containerVariant="narrow" title={siteTitle}>
      {
        router.isFallback
          ? <BlogLoading />
          : <List page={1} perPage={10} total={allPosts.length} posts={allPosts} />
      }
    </Layout>
  );
};

export default Index;

export async function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: { allPosts },
  }
}
