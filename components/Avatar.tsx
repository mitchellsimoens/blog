import Image from 'next/image';
import { FunctionComponent } from 'react';

interface Props {
  name: string;
  picture: string;
}

const Avatar: FunctionComponent<Props> = ({ name, picture }) => (
  <div className="flex items-center">
    <Image
      src={picture}
      alt={name}
      width={48}
      height={48}
    />

    <div className="text-xl font-bold">{name}</div>
  </div>
);

export default Avatar;
