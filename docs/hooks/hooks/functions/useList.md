# Function: useList()

> **useList**\<`TData`\>(`service`, `options?`): [`UseListReturn`](../interfaces/UseListReturn.md)\<`TData`\>

Defined in: [packages/uni-hooks/src/useList/index.ts:216](https://github.com/fkcaikengren/uni-hooks/blob/main/packages/uni-hooks/src/useList/index.ts#L216)

列表数据管理 Hook，支持分页加载更多、刷新等功能

## Type Parameters

| Type Parameter |
| ------ |
| `TData` *extends* [`UseListData`](../type-aliases/UseListData.md) |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `service` | [`UseListService`](../type-aliases/UseListService.md)\<`TData`\> | 获取列表数据的服务函数 |
| `options?` | [`UseListOptions`](../interfaces/UseListOptions.md)\<`TData`\> | 配置选项 |

## Returns

[`UseListReturn`](../interfaces/UseListReturn.md)\<`TData`\>

列表数据管理对象

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
