# Function: watchPausable()

## Call Signature

> **watchPausable**\<`T`, `Immediate`\>(`sources`, `cb`, `options?`): `WatchPausableReturn`

Defined in: packages/uni-hooks-shared/dist/index.d.ts:562

**`Function`**

可暂停的监听函数
参考实现 https://vueuse.org/shared/watchPausable/
 watchPausable

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` *extends* readonly `WatchSource`\<`unknown`\>[] | - |
| `Immediate` *extends* `Readonly`\<`boolean`\> | `false` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `sources` | \[`...T[]`\] | - |
| `cb` | `WatchCallback`\<`MapSources`\<`T`\>, `MapOldSources`\<`T`, `Immediate`\>\> | 数据源变化时的回调函数 |
| `options?` | `WatchPausableOptions`\<`Immediate`\> | 配置选项 |

### Returns

`WatchPausableReturn`

返回控制对象，包含stop、pause、resume和isActive方法

### Example

```ts
import { watchPausable } from '@caikengren/uni-hooks'
import { nextTick, shallowRef } from 'vue'

const source = shallowRef('foo')

const { stop, pause, resume } = watchPausable(
  source,
  v => console.log(`Changed to ${v}!`),
)

source.value = 'bar'
await nextTick() // Changed to bar!

pause()

source.value = 'foobar'
await nextTick() // (nothing happend)

resume()

source.value = 'hello'
await nextTick() // Changed to hello!
```

## Call Signature

> **watchPausable**\<`T`, `Immediate`\>(`source`, `cb`, `options?`): `WatchPausableReturn`

Defined in: packages/uni-hooks-shared/dist/index.d.ts:563

**`Function`**

可暂停的监听函数
参考实现 https://vueuse.org/shared/watchPausable/
 watchPausable

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | - |
| `Immediate` *extends* `Readonly`\<`boolean`\> | `false` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `source` | `WatchSource`\<`T`\> | 监听的数据源 |
| `cb` | `WatchCallback`\<`T`, `Immediate` *extends* `true` ? `T` \| `undefined` : `T`\> | 数据源变化时的回调函数 |
| `options?` | `WatchPausableOptions`\<`Immediate`\> | 配置选项 |

### Returns

`WatchPausableReturn`

返回控制对象，包含stop、pause、resume和isActive方法

### Example

```ts
import { watchPausable } from '@caikengren/uni-hooks'
import { nextTick, shallowRef } from 'vue'

const source = shallowRef('foo')

const { stop, pause, resume } = watchPausable(
  source,
  v => console.log(`Changed to ${v}!`),
)

source.value = 'bar'
await nextTick() // Changed to bar!

pause()

source.value = 'foobar'
await nextTick() // (nothing happend)

resume()

source.value = 'hello'
await nextTick() // Changed to hello!
```

## Call Signature

> **watchPausable**\<`T`, `Immediate`\>(`source`, `cb`, `options?`): `WatchPausableReturn`

Defined in: packages/uni-hooks-shared/dist/index.d.ts:564

**`Function`**

可暂停的监听函数
参考实现 https://vueuse.org/shared/watchPausable/
 watchPausable

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` *extends* `object` | - |
| `Immediate` *extends* `Readonly`\<`boolean`\> | `false` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `source` | `T` | 监听的数据源 |
| `cb` | `WatchCallback`\<`T`, `Immediate` *extends* `true` ? `T` \| `undefined` : `T`\> | 数据源变化时的回调函数 |
| `options?` | `WatchPausableOptions`\<`Immediate`\> | 配置选项 |

### Returns

`WatchPausableReturn`

返回控制对象，包含stop、pause、resume和isActive方法

### Example

```ts
import { watchPausable } from '@caikengren/uni-hooks'
import { nextTick, shallowRef } from 'vue'

const source = shallowRef('foo')

const { stop, pause, resume } = watchPausable(
  source,
  v => console.log(`Changed to ${v}!`),
)

source.value = 'bar'
await nextTick() // Changed to bar!

pause()

source.value = 'foobar'
await nextTick() // (nothing happend)

resume()

source.value = 'hello'
await nextTick() // Changed to hello!
```
