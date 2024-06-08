export type Key = string | number | symbol

export type PartialRecord<T extends Key, U> = { [K in T]?: U }
