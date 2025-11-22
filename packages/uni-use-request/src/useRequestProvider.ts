import type { UseRequestOptions } from './types'

import { provide } from 'vue'
import { USEREQUEST_GLOBAL_OPTIONS_PROVIDE_KEY } from './config'

export default function useRequestProvider(config: UseRequestOptions<unknown, any, any>) {
  provide<typeof config>(USEREQUEST_GLOBAL_OPTIONS_PROVIDE_KEY, config)
}
