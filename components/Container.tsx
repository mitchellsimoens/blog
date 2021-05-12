import { FunctionComponent } from 'react';
import { Variants } from '../types/components/Container';

interface Props {
  variant?: Variants;
}

const Container: FunctionComponent<Props> = ({ children, variant }) => (
  <div className={`${variant === 'narrow' ? 'max-w-2xl' : 'container'} mx-auto px-5`}>{children}</div>
);

export default Container;
