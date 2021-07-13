import { FunctionComponent } from 'react';
import Image from './Image';

interface Props {
  alt: string;
  className?: string;
  picture: string;
}

const Avatar: FunctionComponent<Props> = ({ alt, className, picture }) => (
  <Image
    alt={alt}
    className={className}
    imgClassName="!m-0"
    height="3rem"
    src={picture}
    width="3rem"
  />
);

export default Avatar;
