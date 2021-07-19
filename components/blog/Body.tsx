import { FunctionComponent } from 'react'
import { BlogPost } from '../../types/blog'

type Props = Pick<BlogPost, 'content'>

const BlogBody: FunctionComponent<Props> = ({ content }) => (
  <div dangerouslySetInnerHTML={{ __html: content }} />
)

export default BlogBody
