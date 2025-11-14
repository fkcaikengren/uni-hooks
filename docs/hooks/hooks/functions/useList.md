# Function: useList()

> **useList**\<`TData`\>(`service`, `options?`): `object`

Defined in: uni-hooks/src/useList/index.ts:224

列表数据管理 Hook，支持分页加载更多、刷新等功能

 useList

## Type Parameters

| Type Parameter |
| ------ |
| `TData` *extends* `UseListData` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `service` | `UseListService`\<`TData`\> | 获取列表数据的服务函数 |
| `options?` | `UseListOptions`\<`TData`\> | 配置选项 |

## Returns

`object`

列表数据管理对象

### cancel()

> **cancel**: () => `void`

#### Returns

`void`

### data

> **data**: `Readonly`\<`Ref`\<`TData` \| `undefined`, `TData` \| `undefined`\>\>

### isEnd

> **isEnd**: `ComputedRef`\<`any`\>

### loading

> **loading**: `Readonly`\<`Ref`\<`boolean`, `boolean`\>\>

### loadingMore

> **loadingMore**: `Readonly`\<`Ref`\<`boolean`, `boolean`\>\>

### loadMore()

> **loadMore**: () => `void`

#### Returns

`void`

### loadMoreAsync()

> **loadMoreAsync**: () => `Promise`\<`TData`\> \| `undefined`

#### Returns

`Promise`\<`TData`\> \| `undefined`

### mutate()

> **mutate**: (`mutateData`) => `void` = `setFinalData`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `mutateData` | `TData` \| `undefined` |

#### Returns

`void`

### reload()

> **reload**: () => `void`

#### Returns

`void`

### reloadAsync()

> **reloadAsync**: () => `Promise`\<`TData`\>

#### Returns

`Promise`\<`TData`\>

## Example

```ts
import { useList } from '@caikengren/uni-hooks';

const {
  data,
  loading,
  loadingMore,
  isEnd,
  loadMore,
  reload
} = useList(
  async (lastData) => {
    // 获取列表数据的服务函数
    const res = await api.getList({
      page: lastData ? lastData.page + 1 : 1,
      pageSize: 10
    });
    return {
      list: res.data.list,
      page: res.data.page,
      is_end: res.data.page >= res.data.total_page
    };
  },
  {
    manual: false, // 自动加载第一页
    showLoadingToast: true,
    onSuccess: (data) => {
      console.log('加载成功', data);
    }
  }
);
```
