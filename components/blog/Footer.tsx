import { FunctionComponent } from 'react';
import { BlogPost } from '../../types/blog';
import Author from '../Author';

type Props = Pick<BlogPost, 'author'>;

const Footer: FunctionComponent<Props> = ({ author }) => (
  <div className="mt-12 pt-12 border-t">
    <Author author={author} />
  </div>
);

export default Footer;
