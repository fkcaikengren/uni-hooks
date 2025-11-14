# Function: useStorageSync()

**`Function`**

响应式的本地缓存hook（同步版本），支持小程序和H5环境
参考实现 https://github.com/uni-helper/uni-use
 useStorageSync

## Param

存储的键名

## Param

初始值，可以是ref、getter或普通值

## Param

配置选项

## Param

强制同步写入存储

## Param

自定义存储实现

## Example

```ts
const data = useStorageSync('key', { foo: 'bar' });
data.value = { bar: 'foo' }; //此时立即存入了本地缓存，不同于useStorage是异步存入的
```

## Call Signature

> **useStorageSync**(`key`, `initialValue`, `options?`): `RemovableRef`\<`string`\>

Defined in: uni-hooks/src/useStorageSync/index.ts:66

### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |
| `initialValue` | `MaybeRefOrGetter`\<`string`\> |
| `options?` | `UseStorageSyncOptions`\<`string`\> |

### Returns

`RemovableRef`\<`string`\>

## Call Signature

> **useStorageSync**(`key`, `initialValue`, `options?`): `RemovableRef`\<`boolean`\>

Defined in: uni-hooks/src/useStorageSync/index.ts:71

### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |
| `initialValue` | `MaybeRefOrGetter`\<`boolean`\> |
| `options?` | `UseStorageSyncOptions`\<`boolean`\> |

### Returns

`RemovableRef`\<`boolean`\>

## Call Signature

> **useStorageSync**(`key`, `initialValue`, `options?`): `RemovableRef`\<`number`\>

Defined in: uni-hooks/src/useStorageSync/index.ts:76

### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |
| `initialValue` | `MaybeRefOrGetter`\<`number`\> |
| `options?` | `UseStorageSyncOptions`\<`number`\> |

### Returns

`RemovableRef`\<`number`\>

## Call Signature

> **useStorageSync**\<`T`\>(`key`, `initialValue`, `options?`): `RemovableRef`\<`T`\>

Defined in: uni-hooks/src/useStorageSync/index.ts:82

### Type Parameters

| Type Parameter |
| ------ |
| `T` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |
| `initialValue` | `MaybeRefOrGetter`\<`T`\> |
| `options?` | `UseStorageSyncOptions`\<`T`\> |

### Returns

`RemovableRef`\<`T`\>
