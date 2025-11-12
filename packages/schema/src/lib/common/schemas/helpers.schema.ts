// // The object must have exactly one of the keys, but not both.
export type ExactlyOne<T, Keys extends keyof T = keyof T> = {
  [K in Keys]: Required<Pick<T, K>> &
    Partial<Record<Exclude<Keys, K>, never>> &
    Omit<T, Keys>;
}[Keys];

// // Combine multiple exclusive groups into one type
// export type CombineExclusives<Base, Groups extends (keyof Base)[][]> = Base &
//   {
//     [I in keyof Groups]: ExactlyOne<
//       Pick<Base, Groups[I][number]>,
//       Groups[I][number]
//     >;
//   }[number];
