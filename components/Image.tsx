import NextImage, { ImageLoaderProps, ImageProps } from 'next/image';
import { FunctionComponent } from 'react';

const normalizeSrc = (src: string) => {
  return src[0] === '/' ? src.slice(1) : src;
};
const cloudflareLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const params = [`width=${width}`];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  const paramsString = params.join(',');
  return `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
};

const Image: FunctionComponent<ImageProps> = (props) => {
  if (process.env.NODE_ENV === 'development') {
    return <NextImage unoptimized={true} {...props} />;
  } else {
    return <NextImage {...props} loader={cloudflareLoader} />;
  }
};

export default Image;
