import React, { useState, FC, ReactNode, Dispatch, SetStateAction } from 'react';
import { isWechat, getURLQueryString } from '@/utils';
import createCtx from './createCtx';

export interface IBrowserEnvContext {
  currentEnv: 'wx' | 'android' | 'sdk' | 'ios' | 'h5' | 'uc';
  version: string;
  isClient: boolean;
  setUpdateTick: Dispatch<SetStateAction<number>>;
  updateTick: number;
}

function getEnv() {
  let currentEnv: IBrowserEnvContext['currentEnv'] = 'h5';
  let isClient = false;
  let version = '0.0.0';
  if (isWechat()) {
    currentEnv = 'wx';
  }
  const UA = navigator.userAgent;
  if (/iPhone(.*)SogouMobileBrowser/.test(UA)) {
    currentEnv = 'ios';
    isClient = true;
    const match = UA.match(/SogouMobileBrowser\/(\d+\.\d+\.\d+)/);
    if (match && match[1]) {
      version = match[1];
    }
  }
  if (/Android(.*)SogouMobileBrowser/.test(UA)) {
    currentEnv = 'android';
  }
  if (/Android(.*)UCBrowser/.test(UA) || /iPhone(.*)baiduboxapp/.test(UA)) {
    currentEnv = 'uc';
  }
  const qs: { env?: IBrowserEnvContext['currentEnv']; version?: IBrowserEnvContext['version'] } = getURLQueryString(
    window.location.search
  );
  if (qs.env) {
    currentEnv = qs.env;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    version = qs.version!;
    isClient = false;
  }
  console.log('当前环境', currentEnv, version, isClient, window.location.href, UA);
  console.log('当前环境', window.location);
  return {
    currentEnv,
    version,
    isClient,
  };
}

interface IBrowserEnvContextProviderProps {
  children: ReactNode;
}

const [useBrowserEnvContext, Provider] = createCtx<IBrowserEnvContext>();

const BrowserEnvContextProvider: FC<IBrowserEnvContextProviderProps> = ({ children }) => {
  const [updateTick, setUpdateTick] = useState<number>(0);
  const [env] = useState<IBrowserEnvContext>({ ...getEnv(), updateTick, setUpdateTick });

  return (
    <Provider value={env} key={updateTick}>
      {children}
    </Provider>
  );
};

export { useBrowserEnvContext, BrowserEnvContextProvider };
