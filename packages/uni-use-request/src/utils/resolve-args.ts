import type { RequestHook, UseRequestMiddleware, UseRequestOptions, UseRequestPlugin, useRequestResult, UseRequestService } from '../types'

export function withArgs<TData, TParams extends any[]>(hook: RequestHook<TData, TParams>, use?: UseRequestMiddleware<TData, TParams>[]) {
  return function useRequestArgs(
    service: UseRequestService<TData, TParams>,
    options: UseRequestOptions<TData, TParams, any> = {},
    plugins: UseRequestPlugin<TData, TParams>[] = [],
  ): useRequestResult<TData, TParams> {
    let next = hook
    const middleware = use || []
    for (let i = middleware.length; i--;) {
      next = middleware[i](next)
    }
    return next(service, options, plugins)
  }
}
