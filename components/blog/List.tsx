import { FunctionComponent } from 'react';
import Link from '../Link';
import Pager from '../Pager';
import { BlogPost } from '../../types/blog';

interface Props {
  page: number;
  perPage: number;
  posts: BlogPost[];
  total: number;
}

const List: FunctionComponent<Props> = ({ page, perPage, posts, total }) => {
  const pageNum = page > 0 ? page : 1;
  const offset = (pageNum - 1) * perPage;
  const pagePosts = posts.slice(offset, offset + perPage);
  const totalPages = Math.ceil(total / perPage);

  return (
    <>
      <ul>
        {
          pagePosts.map(post => {
            if (!post.slug) {
              return null;
            }

            return (
              <li key={post.slug}>
                <Link as={post.slug} href="/post/[...slug]">{post.title}</Link>
              </li>
            );
          })
        }
      </ul>
      <Pager page={page} total={totalPages} uriPrefix="/post/page/" />
    </>
  );
};

export default List;
