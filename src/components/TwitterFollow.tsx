import { FunctionComponent } from 'react'

// https://github.com/saurabhnemade/react-twitter-embed/pull/89 is blocking this, doesn't work with React version
// import { TwitterFollowButton } from 'react-twitter-embed'

interface Props {
  handle: string
  size?: string
}

// const Author: FunctionComponent<Props> = ({ handle, size = 'large' }) => (
//   <TwitterFollowButton options={{ size }} screenName={handle} />
// )

const Author: FunctionComponent<Props> = () => null

export default Author
