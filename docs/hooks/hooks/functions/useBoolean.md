# Function: useBoolean()

> **useBoolean**(`defaultValue?`): \[`Ref`\<`boolean`, `boolean`\>, `UseBooleanActions`\]

Defined in: uni-hooks/src/useBoolean/index.ts:27

**`Function`**

布尔值状态管理
参考实现 https://inhiblabcore.github.io/vue-hooks-plus/hooks/useBoolean
 useBoolean

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `defaultValue?` | `boolean` | `false` | 默认值，不传默认为false |

## Returns

\[`Ref`\<`boolean`, `boolean`\>, `UseBooleanActions`\]

- 返回一个数组，包含布尔值ref和操作方法

## Example

```ts
// 基本用法
const [state, { toggle, set }] = useBoolean(true);

// 切换状态
toggle(); // state.value === false

// 设置状态
set(true); // state.value === true
```
