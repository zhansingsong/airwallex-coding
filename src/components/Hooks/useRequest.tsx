// import { useEffect, useReducer } from 'react';
// import { useHistory } from 'react-router-dom';
// import { IAPIs, APIs } from '@/constant';
// import { isEmptyObj } from '@/utils';
// import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// import { useMountedState } from 'react-use';
// import qs from 'qs';
// import { routerJump } from '@/routes/routes';
// import { ValuesOf } from '@/types/typeHelpers';
// import { useToastContext } from '@/components/Context/ToastContext';
// import useJumpLogin from './useJumpLogin';
// import useJumpBindmobile from './useJumpBindmobile';

// export { APIs };

// type ActionType = 'FETCH_INIT' | 'FETCH_SUCCESS' | 'FETCH_ERROR';
// type State<T = any> = {
//   data: T;
//   loading: boolean;
//   error: boolean;
// };

// type Action<T = any> = {
//   type: ActionType;
//   payload?: T;
// };

// type RequestParams<T> = AxiosRequestConfig & {
//   // 兼容 `/api/{params}` 类型接口（封装的前提是保证接口现有参数可用）
//   url: ValuesOf<IAPIs> | string;
//   configDatas?: Object;
//   trigger?: boolean;
//   isPage?: boolean;
//   openDefaultFunc?: boolean; //页面级别的接口开启（接口错误跳错误页面），模块级别的接口不开启（接口错误做相应处理）
//   PostWithGetMethod?: boolean; //使用Post请求，但是把请求参数链接到url上
//   handleData?: (res: AxiosResponse) => T;
// };

// const fetchDataReducer: (state: State, action: Action) => State = (state: State, action: Action) => {
//   switch (action.type) {
//     case 'FETCH_INIT':
//       return {
//         ...state,
//         loading: true,
//         error: false,
//       };
//     case 'FETCH_SUCCESS':
//       return {
//         ...state,
//         loading: false,
//         error: false,
//         data: action.payload,
//       };
//     case 'FETCH_ERROR':
//       return {
//         ...state,
//         loading: false,
//         error: true,
//       };
//     default:
//       throw new Error();
//   }
// };

// const useRequest: <T = any>(params: RequestParams<T>) => [State<T>, (config?: {}) => Promise<any>] = ({
//   //设置默认值
//   url,
//   method = 'GET',
//   configDatas = {}, //默认传递数据都是json格式
//   trigger = true,
//   headers = {},
//   openDefaultFunc = true,
//   isPage = false,
//   PostWithGetMethod = false,
//   handleData,
// }) => {
//   const history = useHistory();
//   const jumpLogin = useJumpLogin();
//   const jumpBindmobile = useJumpBindmobile();
//   const { addToast } = useToastContext();
//   const [state, dispatch] = useReducer<(state: State, action: Action) => State>(fetchDataReducer, {
//     data: null,
//     loading: true,
//     error: false,
//   });
//   const getIsMounted = useMountedState();

//   const loadData = async (config = {}) => {
//     configDatas = { ...configDatas, ...config };
//     //有参数
//     if (!isEmptyObj(configDatas)) {
//       //GET请求
//       if (method.toUpperCase() === 'GET') {
//         url += `?${qs.stringify(configDatas)}`;
//         configDatas = {};
//       } else {
//         //其他请求
//         if (PostWithGetMethod) {
//           url += url.indexOf('?') === -1 ? `?${qs.stringify(configDatas)}` : `&${qs.stringify(configDatas)}`;
//         }
//         if (headers['content-type'] === 'application/x-www-form-urlencoded') {
//           configDatas = qs.stringify(configDatas);
//         }
//       }
//     }

//     dispatch({ type: 'FETCH_INIT' });

//     let promise = axios
//       .request({
//         url: url,
//         method: method,
//         data: configDatas,
//       })
//       .then((res) => {
//         //使用getIsMounted()判断如果请求返回的时候原来的页面已经卸载，则不更新状态，否则会报warning：Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function
//         if (!getIsMounted()) {
//           return res;
//         }
//         if (res.data.code === 0) {
//           // 404 的情况也会返回 200
//           // if (res.data.code === 0 || res.status === 200) {
//           dispatch({
//             type: 'FETCH_SUCCESS',
//             payload: handleData ? handleData(res) : res.data.data,
//           });
//         } else {
//           dispatch({ type: 'FETCH_ERROR' });
//           if (openDefaultFunc) {
//             //401
//             if (res.data.code === 401) {
//               addToast('需要用户登录', () => {
//                 history.replace(jumpLogin);
//               });
//             } else if (res.data.code === 407) {
//               history.replace(jumpBindmobile);
//             } else {
//               if (isPage) {
//                 //页面错误
//                 if (res.data.code >= 400) {
//                   history.replace(routerJump.Error404());
//                 } else if (res.data.code >= 500) {
//                   history.replace(routerJump.Error500());
//                 }
//               }
//             }
//           }
//         }
//         return res; //请求有返回的情况下都会把res返回，这样方便后续使用.then()进行扩展，更灵活
//       })
//       .catch((error) => {
//         history.replace(routerJump.Error404());
//         dispatch({ type: 'FETCH_ERROR' });
//         // https://javascript.info/promise-error-handling
//         // 抛下个 catch
//         throw error;
//       });
//     return promise;
//   };

//   useEffect(() => {
//     if (trigger && url) {
//       loadData();
//     }
//   }, [url, JSON.stringify(configDatas)]); // eslint-disable-line
//   //JSON.stringify(variables)这里不能直接用variables，应为对象每次都会认为是不一样的
//   //为什么把configDatas当成参数呢：举个例子：在分页请求中，会把page作为请求参数，在点击加载更多时，只需要让page+1，就会自动发下一次请求，不需要其他的监听操作了
//   return [state, loadData];
// };

// export default useRequest;
export default {};
