# Function: useStorage()

**`Function`**

响应式的本地缓存hook（异步），支持小程序和H5环境
参考实现 https://github.com/uni-helper/uni-use
 useStorage

## Param

存储的键名

## Param

初始值，可以是ref、getter或普通值

## Param

配置选项

## Param

控制何时将值写入存储

## Param

是否深度监听对象变化

## Param

是否监听外部存储变化

## Param

是否/如何合并默认值和存储值

## Param

是否使用shallowRef

## Param

错误回调函数

## Param

是否在组件挂载后读取存储

## Example

```ts
// 基本用法
const data = useStorage('key', 'defaultValue');

// 使用配置选项, 如果key对应的缓存不存在, 会写入默认值
const data = useStorage('key', { foo: 'bar' }, {
  deep: true,
  mergeDefaults: true
});

// 修改data会同时将数据写入缓存
data.value = { foo: 'baz' };
```

## Call Signature

> **useStorage**\<`T`\>(`key`, `initialValue?`, `options?`): [`RemovableRef`](../type-aliases/RemovableRef.md)\<`T`\>

Defined in: [packages/uni-hooks/src/useStorage/index.ts:162](https://github.com/fkcaikengren/uni-hooks/blob/main/packages/uni-hooks/src/useStorage/index.ts#L162)

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |
| `initialValue?` | `MaybeRefOrGetter`\<`null`\> |
| `options?` | `UseStorageOptions`\<`T`\> |

### Returns

[`RemovableRef`](../type-aliases/RemovableRef.md)\<`T`\>

## Call Signature

> **useStorage**\<`T`\>(`key`, `initialValue`, `options?`): [`RemovableRef`](../type-aliases/RemovableRef.md)\<`T`\>

Defined in: [packages/uni-hooks/src/useStorage/index.ts:168](https://github.com/fkcaikengren/uni-hooks/blob/main/packages/uni-hooks/src/useStorage/index.ts#L168)

### Type Parameters

| Type Parameter |
| ------ |
| `T` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |
| `initialValue` | `MaybeRefOrGetter`\<`T`\> |
| `options?` | `UseStorageOptions`\<`T`\> |

### Returns

[`RemovableRef`](../type-aliases/RemovableRef.md)\<`T`\>
