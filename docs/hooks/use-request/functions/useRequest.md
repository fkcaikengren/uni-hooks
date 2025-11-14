# Function: useRequest()

**`Function`**

请求管理

## See

https://inhiblabcore.github.io/vue-hooks-plus/hooks/useRequest/quick-start

 useRequest
基于vue-hooks-plus改造的支持uni-app/h5跨端请求hook

实现参考 https://github.com//InhiblabCore/vue-hooks-plus

## Call Signature

> **useRequest**\<`TData`, `TParams`, `PluginsOptions`, `SR`\>(`service`, `options`, `plugins?`): `useRequestResult`\<`TData`, `TParams`, (`res`) => `TData`, `TData` *extends* `R` ? `R` : `TData`\>

Defined in: useRequest.ts:33

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TData` | - |
| `TParams` *extends* `unknown`[] | `unknown`[] |
| `PluginsOptions` *extends* `UseRequestPlugin`\<`TData`, `TParams`, `any`\>[] | `UseRequestPlugin`\<`TData`, `TParams`, `any`\>[] |
| `SR` | `any` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `service` | `UseRequestService`\<`SR`, `TParams`\> |
| `options` | `UseRequestBasicOptions`\<`TData`, `TParams`\> & `object` & `object` & `UseRequestBasicOptions`\<`SR`, `TParams`\> & `object` & `object` |
| `plugins?` | `PluginsOptions` |

### Returns

`useRequestResult`\<`TData`, `TParams`, (`res`) => `TData`, `TData` *extends* `R` ? `R` : `TData`\>

## Call Signature

> **useRequest**\<`TData`, `TParams`, `PluginsOptions`, `SR`\>(`service`, `options`, `plugins?`): `useRequestResult`\<`TData`, `TParams`, (`res`) => `TData`, `false`\>

Defined in: useRequest.ts:68

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TData` | - |
| `TParams` *extends* `unknown`[] | `unknown`[] |
| `PluginsOptions` *extends* `UseRequestPlugin`\<`TData`, `TParams`, `any`\>[] | `UseRequestPlugin`\<`TData`, `TParams`, `any`\>[] |
| `SR` | `any` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `service` | `UseRequestService`\<`SR`, `TParams`\> |
| `options` | `UseRequestOptionsWithFormatResult`\<`TData`, `TParams`, `PluginsMiddleOptionsType`\<`PluginsOptions`, `TData`, `TParams`\>, `SR`\> |
| `plugins?` | `PluginsOptions` |

### Returns

`useRequestResult`\<`TData`, `TParams`, (`res`) => `TData`, `false`\>

## Call Signature

> **useRequest**\<`TData`, `TParams`, `PluginsOptions`\>(`service`, `options`, `plugins?`): `useRequestResult`\<`TData`, `TParams`, `false`, `TData` *extends* `R` ? `R` : `TData`\>

Defined in: useRequest.ts:98

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TData` | - |
| `TParams` *extends* `unknown`[] | `unknown`[] |
| `PluginsOptions` *extends* `UseRequestPlugin`\<`TData`, `TParams`, `any`\>[] | `UseRequestPlugin`\<`TData`, `TParams`, `any`\>[] |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `service` | `UseRequestService`\<`TData`, `TParams`\> |
| `options` | `UseRequestOptionsWithInitialData`\<`TData`, `TParams`, `PluginsMiddleOptionsType`\<`PluginsOptions`, `TData`, `TParams`\>\> |
| `plugins?` | `PluginsOptions` |

### Returns

`useRequestResult`\<`TData`, `TParams`, `false`, `TData` *extends* `R` ? `R` : `TData`\>

## Call Signature

> **useRequest**\<`TData`, `TParams`, `PluginsOptions`\>(`service`, `options?`, `plugins?`): `useRequestResult`\<`TData`, `TParams`, `false`, `false`\>

Defined in: useRequest.ts:125

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TData` | - |
| `TParams` *extends* `unknown`[] | `unknown`[] |
| `PluginsOptions` *extends* `UseRequestPlugin`\<`TData`, `TParams`, `any`\>[] | `UseRequestPlugin`\<`TData`, `TParams`, `any`\>[] |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `service` | `UseRequestService`\<`TData`, `TParams`\> |
| `options?` | `UseRequestOptions`\<`TData`, `TParams`, `PluginsMiddleOptionsType`\<`PluginsOptions`, `TData`, `TParams`\>\> |
| `plugins?` | `PluginsOptions` |

### Returns

`useRequestResult`\<`TData`, `TParams`, `false`, `false`\>
