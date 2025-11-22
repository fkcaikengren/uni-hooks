import type { InjectionKey } from 'vue'

import type { UseRequestOptions } from './types'

const USEREQUEST_GLOBAL_OPTIONS: Record<string, any> = {}

export const USEREQUEST_GLOBAL_OPTIONS_PROVIDE_KEY: InjectionKey<string> = Symbol(
  'USEREQUEST_GLOBAL_OPTIONS_PROVIDE_KEY',
)

export function setGlobalOptions(config: UseRequestOptions<unknown, any, []>) {
  Object.keys(config).forEach((key) => {
    USEREQUEST_GLOBAL_OPTIONS[key] = config[key as keyof typeof config]
  })
}

export function getGlobalOptions() {
  return USEREQUEST_GLOBAL_OPTIONS
}

export function clearGlobalOptions() {
  Object.keys(USEREQUEST_GLOBAL_OPTIONS).forEach((key) => {
    delete USEREQUEST_GLOBAL_OPTIONS[key]
  })
}
