import React, { useEffect, Suspense } from 'react';
import { compile, PathFunction } from 'path-to-regexp';
import Loading from '@/components/commons/Loading/Loading';
import { BrowserRouter, Routes, Route, Navigate, PathRouteProps } from 'react-router-dom';
import routesConfig from './config';

export type RoutesType = typeof routesConfig;
export type RoutesTypeKeys = keyof RoutesType;
type RoutesConfigType = Record<RoutesTypeKeys, PathFunction>;

/**
 * routerJump
 * 基于路由配置生成每个路由的信息, 用于跳转
 */
export const routerJump = Object.keys(routesConfig).reduce((preValue, curValue) => {
  const key = curValue as RoutesTypeKeys;
  const tempPathFun = compile(routesConfig[key].path);
  preValue[key] = tempPathFun;
  return preValue;
}, {} as RoutesConfigType);

const RouterComponent = () => {
  useEffect(() => {
    // console.log('vv');
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading></Loading>}>
        <Routes>
          {Object.keys(routesConfig).map((key) => {
            const { path, index } = routesConfig[key as RoutesTypeKeys] as PathRouteProps;
            // @bug: https://github.com/facebook/react/issues/14299
            const LazyComponent = React.lazy(() => import(/* webpackChunkName: "[request]" */ `@/components/pages/${key}`));
            return <Route key={key} index={index} path={path} element={<LazyComponent />} />;
          })}
          <Route path="*" element={<Navigate to={routerJump.Error404()} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default RouterComponent;
