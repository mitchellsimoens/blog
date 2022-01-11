import { FunctionComponent } from 'react'

// import { TwitterFollowButton } from 'react-twitter-embed'

interface Props {
  handle: string
  size?: string
}

const Author: FunctionComponent<Props> = ({ handle, size = 'large' }) => (
  // <TwitterFollowButton options={{ size }} screenName={handle} />
  <div>
    coming back soon: {handle} and size {size}
  </div>
)

export default Author
