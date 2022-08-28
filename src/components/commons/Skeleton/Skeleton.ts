import React, { createElement, FC } from 'react';
import './Skeleton.scss';

interface ISkeletonProps {
  count?: number;
  duration?: number;
  width?: number;
  height?: number;
  circle?: boolean;
  className?: string;
  colorStart?: string;
  colorEnd?: string;
  style?: React.CSSProperties;
  rem2px?: boolean;
}

type IStyleType = Pick<ISkeletonProps, 'width' | 'height'> & {
  borderRadius?: string;
  animationDuration?: string;
  backgroundColor?: string;
  backgroundImage?: string;
};

const Skeleton: FC<ISkeletonProps> = ({
  count = 1,
  duration = 2,
  circle = false,
  colorStart,
  colorEnd,
  width,
  height,
  className,
  style,
  rem2px = false,
}) => {
  const elements: React.ReactElement[] = [];

  for (let i = 0; i < count; i++) {
    const curStyle = {} as IStyleType;

    if (width) {
      curStyle.width = width;
      if (rem2px) {
        curStyle.width = (108 * window.devicePixelRatio) / 3;
      }
    }

    if (height) {
      curStyle.height = height;
      if (rem2px) {
        curStyle.height = (108 * window.devicePixelRatio) / 3;
      }
    }

    if (width && height && circle) {
      curStyle.borderRadius = '50%';
    }

    if (duration) {
      curStyle.animationDuration = `${duration}s`;
    }

    if (colorStart && colorEnd) {
      curStyle.backgroundColor = colorStart;
      curStyle.backgroundImage = `linear-gradient(90deg, ${colorStart}, ${colorEnd}, ${colorStart})`;
    }

    let curClassName = 'react-loading-skeleton';
    if (className) {
      curClassName += ' ' + className;
    }

    elements.push(
      createElement('span', {
        key: i,
        className: curClassName,
        style: {
          ...curStyle,
          ...style,
        },
        dangerouslySetInnerHTML: { __html: '&zwnj;' },
      })
    );
  }

  return createElement(React.Fragment, null, elements);
};

export default Skeleton;
