// 工具类型
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export type ValuesOf<T> = T[keyof T];

export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType[number];
