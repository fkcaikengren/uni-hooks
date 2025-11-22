# Function: useUniInterceptor()

> **useUniInterceptor**\<`F`\>(`method`, `interceptor`): () => `void`

Defined in: [packages/uni-hooks/src/useUniInterceptor/index.ts:176](https://github.com/fkcaikengren/uni-hooks/blob/main/packages/uni-hooks/src/useUniInterceptor/index.ts#L176)

**`Function`**

注册拦截器，在活跃的 effect 作用域停止时自动移除
参考实现 https://github.com/uni-helper/uni-use/blob/main/src/useInterceptor
 useUniInterceptor

## Type Parameters

| Type Parameter |
| ------ |
| `F` *extends* `UniMethod` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `method` | `F` | uni-app中的方法名 |
| `interceptor` | `InterceptorOptions`\<`F`\> | 拦截器配置选项 |

## Returns

停止拦截器的函数

> (): `void`

### Returns

`void`

## Example

```ts
import { useUniInterceptor } from '@caikengren/uni-hooks';
const event = 'request';

// 设置拦截器
const stop = useUniInterceptor(event, {
  invoke: (args) => {
    args[0].url = `https://www.example.com/${args[0].url}`;
  },
  success: (response) => {
    console.log('interceptor-success', response);
    response.data.code = 1;
  },
  fail: (error) => {
    console.log('interceptor-fail', error);
  },
  complete: () => {
    console.log('interceptor-complete');
  },
});

// 删除拦截器
stop();
```
