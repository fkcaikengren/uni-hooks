# Function: watchWithFilter()

**`Function`**

带过滤器的watch函数，可控制回调的执行频率
参考实现 https://vueuse.org/shared/watchWithFilter/
 watchWithFilter

## Param

要监听的数据源

## Param

回调函数

## Param

配置选项

## Param

事件过滤器，默认为直接通过

## Param

是否立即执行回调

## Param

是否深度监听

## Param

回调执行时机

## Param

开发模式下追踪依赖

## Param

开发模式下追踪触发

## Example

```ts
import { watchWithFilter, debounceFilter } from '@caikengren/uni-hooks';

// 基本用法
watchWithFilter(
  () => count.value,
  () => {
    console.log('count changed');
  }
);

// 使用防抖过滤器
watchWithFilter(
  () => count.value,
  () => {
    console.log('count changed with debounce');
  },
  {
    eventFilter: debounceFilter(500)
  }
);
```

## Call Signature

> **watchWithFilter**\<`T`, `Immediate`\>(`sources`, `cb`, `options?`): `WatchStopHandle`

Defined in: [packages/uni-hooks-shared/src/watchWithFilter/index.ts:10](https://github.com/fkcaikengren/uni-hooks/blob/main/packages/uni-hooks-shared/src/watchWithFilter/index.ts#L10)

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` *extends* readonly `WatchSource`\<`unknown`\>[] | - |
| `Immediate` *extends* `Readonly`\<`boolean`\> | `false` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `sources` | \[`...T[]`\] |
| `cb` | `WatchCallback`\<`MapSources`\<`T`\>, `MapOldSources`\<`T`, `Immediate`\>\> |
| `options?` | `WatchWithFilterOptions`\<`Immediate`\> |

### Returns

`WatchStopHandle`

## Call Signature

> **watchWithFilter**\<`T`, `Immediate`\>(`source`, `cb`, `options?`): `WatchStopHandle`

Defined in: [packages/uni-hooks-shared/src/watchWithFilter/index.ts:15](https://github.com/fkcaikengren/uni-hooks/blob/main/packages/uni-hooks-shared/src/watchWithFilter/index.ts#L15)

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | - |
| `Immediate` *extends* `Readonly`\<`boolean`\> | `false` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `source` | `WatchSource`\<`T`\> |
| `cb` | `WatchCallback`\<`T`, `Immediate` *extends* `true` ? `T` \| `undefined` : `T`\> |
| `options?` | `WatchWithFilterOptions`\<`Immediate`\> |

### Returns

`WatchStopHandle`

## Call Signature

> **watchWithFilter**\<`T`, `Immediate`\>(`source`, `cb`, `options?`): `WatchStopHandle`

Defined in: [packages/uni-hooks-shared/src/watchWithFilter/index.ts:20](https://github.com/fkcaikengren/uni-hooks/blob/main/packages/uni-hooks-shared/src/watchWithFilter/index.ts#L20)

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` *extends* `object` | - |
| `Immediate` *extends* `Readonly`\<`boolean`\> | `false` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `source` | `T` |
| `cb` | `WatchCallback`\<`T`, `Immediate` *extends* `true` ? `T` \| `undefined` : `T`\> |
| `options?` | `WatchWithFilterOptions`\<`Immediate`\> |

### Returns

`WatchStopHandle`
