import { FunctionComponent } from 'react'

interface Props {
  children: React.ReactNode
}

const BlogTitle: FunctionComponent<Props> = ({ children }) => (
  <h1>{children}</h1>
)

export default BlogTitle
