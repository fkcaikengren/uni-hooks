# Function: usePageScroll()

> **usePageScroll**(`options?`): `object`

Defined in: [packages/uni-hooks/src/usePageScroll/index.ts:47](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/usePageScroll/index.ts#L47)

页面滚动控制。仅支持在页面组件中使用（不兼容在子组件中使用）提供页面滚动控制功能，可以滚动到指定元素位置。在H5环境使用原生scrollIntoView，在小程序环境使用uni.pageScrollTo实现

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`UsePageScrollOptions`](../interfaces/UsePageScrollOptions.md) | 滚动控制选项 |

## Returns

返回对象

### scrollToSelector()

> **scrollToSelector**: (`selector`) => `void`

滚动到指定选择器的元素位置

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `selector` | `string` | CSS选择器 |

#### Returns

`void`

## Example

```ts
// 基本用法
import { usePageScroll } from '@caikengren/uni-hooks';

export default {
  setup() {
    // 默认配置
    const { scrollToSelector } = usePageScroll();

    // 自定义滚动动画时长（仅小程序有效）
    const { scrollToSelector: scrollWithCustomDuration } = usePageScroll({
      duration: 500 // 设置滚动动画时长为500ms
    });

    // 滚动到指定元素
    const scrollToElement = () => {
      scrollToSelector('#target-element');
    };

    return {
      scrollToElement
    };
  }
};
```
