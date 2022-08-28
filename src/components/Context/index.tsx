import React, { FC, ReactNode } from 'react';
import { BrowserEnvContextProvider } from './browserEnvContext';

interface ICtxProps {
  children: ReactNode;
}

const Ctx: FC<ICtxProps> = (props) => {
  return <BrowserEnvContextProvider>{props.children}</BrowserEnvContextProvider>;
};

export default Ctx;
