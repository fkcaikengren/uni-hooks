# Type Alias: EventFilter\<Args, This, Invoke\>

> **EventFilter**\<`Args`, `This`, `Invoke`\> = (`invoke`, `options`) => `ReturnType`\<`Invoke`\> \| `Promisify`\<`ReturnType`\<`Invoke`\>\> & `object`

Defined in: packages/uni-hooks-shared/dist/index.d.ts:180

事件拦截器类型，用于包装目标调用以实现防抖/节流/可暂停等过滤能力。

## Type Declaration

### cancel()?

> `optional` **cancel**: () => `void`

#### Returns

`void`

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `Args` *extends* `any`[] | `any`[] | 目标函数的参数类型元组 |
| `This` | `any` | 执行时的 `this` 绑定类型 |
| `Invoke` *extends* [`AnyFn`](AnyFn.md) | [`AnyFn`](AnyFn.md) | 要被过滤器控制调用的函数类型 |

## Param

实际执行的函数，由过滤器决定何时触发

## Param

包含原始函数、`this` 与参数的封装信息

## Returns

执行结果或其 Promise
