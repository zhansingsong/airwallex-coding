import { createContext, useContext } from 'react';

// 只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。
// 这有助于在不使用 Provider 包装组件的情况下对组件进行测试。
// 注意：将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效。
// export default function useCreateCtx<ContextType>() {
//   const ctx = createContext<
//     ContextType | undefined
//     // 如果不用使用 not-null assertion，需要在使用对`undefined`处理
//   >(undefined!);
export default function useCreateCtx<ContextType>() {
  const ctx = createContext<ContextType | null>(null);
  // 如果不用使用 not-null assertion，需要在使用对`undefined`处理
  function useCtx() {
    const c = useContext(ctx);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  // Notice also we use a const assertion (as const) on the last line to ensure TypeScript infers a tuple type rather than an array of union types.
  return [useCtx, ctx.Provider] as const;
}
