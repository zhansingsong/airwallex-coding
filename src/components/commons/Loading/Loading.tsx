import React, { FC, ReactNode } from 'react';
import { ReactComponent as Loadsvg } from '@/assets/loading.svg';
import './Loading.scss';

interface ILoadingProps {
  type?: string;
  className?: string;
  children?: ReactNode;
  isLink?: boolean;
  href?: string;
}

const Loading: FC<ILoadingProps> = () => {
  return (
    <section className="loading">
      <Loadsvg className="loading-svg"></Loadsvg>
    </section>
  );
};

export default Loading;
