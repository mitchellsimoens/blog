import { FunctionComponent } from 'react';
import { TwitterFollowButton } from 'react-twitter-embed';

interface Props {
  handle: string;
  size?: string;
}

const Author: FunctionComponent<Props> = ({ handle, size = 'large' }) => (
  <TwitterFollowButton options={{ size }} screenName={handle} />
);

export default Author;
