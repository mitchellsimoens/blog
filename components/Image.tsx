import { CSSProperties, FunctionComponent } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  alt: string;
  className?: string;
  height?: number | string;
  imgClassName?: string;
  src: string;
  width?: number | string;
}

// TODO support multiple src with <picture>
const Image: FunctionComponent<Props> = ({ alt, className, height, imgClassName, src, width }) => {
  const { ref } = useInView();
  let style: CSSProperties | undefined;

  if (width != null || height != null) {
    style = {};

    if (width) {
      if (Number.isFinite(width)) {
        style.width = `${width}px`;
      } else {
        style.width = width;
      }
    }

    if (height) {
      if (Number.isFinite(height)) {
        style.height = `${height}px`;
      } else {
        style.height = height;
      }
    }
  }

  return (
    <div ref={ref} className={className} style={style}>
      <img alt={alt} className={imgClassName} src={src} style={style} />
    </div>
  );
};

export default Image;
