# Function: useWindowSize()

> **useWindowSize**(): `object`

Defined in: uni-hooks/src/useWindowSize/index.ts:24

获取窗口大小信息

 useWindowSize

## Returns

`object`

窗口大小信息

### isLandscape

> **isLandscape**: `ComputedRef`\<`boolean`\>

### windowHeight

> **windowHeight**: `Ref`\<`number`, `number`\>

### windowWidth

> **windowWidth**: `Ref`\<`number`, `number`\>

## Example

```ts
import { useWindowSize } from '@caikengren/uni-hooks';

const { windowWidth, windowHeight, isLandscape } = useWindowSize();

console.log(windowWidth.value, windowHeight.value, isLandscape.value);
```
