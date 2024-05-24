import type { Key, PartialRecord } from './types'

export type EndpointArgs<
  EndpointsConst extends Record<Key, string>,
  EndpointsType extends PartialRecord<keyof EndpointsConst, any>,
  T extends keyof EndpointsConst,
> = T extends keyof EndpointsType ? [T, EndpointsType[T]] : [T]

export function declareGetEndpoint<
  EndpointsConst extends Record<Key, string>,
  EndpointsType extends PartialRecord<keyof EndpointsConst, any>,
>(ENDPOINTS: EndpointsConst) {
  return <T extends keyof EndpointsConst>([name, args]: EndpointArgs<EndpointsConst, EndpointsType, T>) => {
    const endpoint: string | undefined = ENDPOINTS[name]

    if (!args)
      return endpoint

    return Object.entries(args).reduce((acc, [key, value]) => acc.replaceAll(`{${key}}`, String(value)), endpoint)
  }
}
