import { FunctionComponent } from 'react';
import Link from './Link';

interface Props {
  page: number;
  total: number;
  uriPrefix?: string
}

const Pager: FunctionComponent<Props> = ({ page, total, uriPrefix }) => (
  <div className="flex">
    {
      page === 1
        ? null
        : <Link href={`${uriPrefix || '/page/'}${page - 1}`}>← Newer Posts</Link>
    }

    <div className="flex-1" />

    {
      page === total
        ? null
        : <Link href={`${uriPrefix || '/page/'}${page + 1}`}>Older Posts →</Link>
    }
  </div>
);

export default Pager;
