<template>
  <div class="container">
    <div class="card">
      <h2 class="title">
        本地存储演示
      </h2>

      <div class="section">
        <h3 class="section-title">
          字符串存储
        </h3>
        <div class="info-item">
          <span class="label">当前值：</span>
          <span class="value">{{ stringValue }}</span>
        </div>
        <div class="input-group">
          <input
            v-model="stringValue"
            type="text"
            class="input"
            placeholder="输入字符串"
          >
          <button
            class="button"
            @click="resetString"
          >
            重置
          </button>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">
          数字存储
        </h3>
        <div class="info-item">
          <span class="label">当前值：</span>
          <span class="value">{{ numberValue }}</span>
        </div>
        <div class="input-group">
          <input
            v-model.number="numberValue"
            type="number"
            class="input"
            placeholder="输入数字"
          >
          <button
            class="button"
            @click="resetNumber"
          >
            重置
          </button>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">
          布尔值存储
        </h3>
        <div class="info-item">
          <span class="label">当前值：</span>
          <span
            class="value"
            :class="{ 'active': booleanValue }"
          >{{ booleanValue ? '是' : '否' }}</span>
        </div>
        <div class="input-group">
          <button
            class="button"
            @click="toggleBoolean"
          >
            切换
          </button>
          <button
            class="button"
            @click="resetBoolean"
          >
            重置
          </button>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">
          对象存储
        </h3>
        <div class="info-item">
          <span class="label">当前值：</span>
          <pre class="value code">{{ JSON.stringify(objectValue, null, 2) }}</pre>
        </div>
        <div class="input-group">
          <button
            class="button"
            @click="updateObject"
          >
            更新对象
          </button>
          <button
            class="button"
            @click="resetObject"
          >
            重置
          </button>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">
          数组存储
        </h3>
        <div class="info-item">
          <span class="label">当前值：</span>
          <pre class="value code">{{ JSON.stringify(arrayValue, null, 2) }}</pre>
        </div>
        <div class="input-group">
          <button
            class="button"
            @click="addArrayItem"
          >
            添加项目
          </button>
          <button
            class="button"
            @click="removeArrayItem"
          >
            删除项目
          </button>
          <button
            class="button"
            @click="resetArray"
          >
            重置
          </button>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">
          删除存储对象示例
        </h3>
        <div class="info-item">
          <span class="label">当前值：</span>
          <pre class="value code">{{ removableValue === undefined ? '未设置' : removableValue }}</pre>
        </div>
        <div class="input-group">
          <input
            v-model="removableInputValue"
            type="text"
            class="input"
            placeholder="输入文本"
          >
          <button
            class="button"
            @click="setRemovableValue"
          >
            设置值
          </button>
          <button
            class="button danger"
            @click="removeValue"
          >
            删除值
          </button>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">
          useStorageSync 示例
        </h3>
        <div class="info-item">
          <span class="label">当前值：</span>
          <span class="value">{{ syncValue }}</span>
        </div>
        <div class="info-item">
          <p class="note">
            注意：useStorageSync 使用同步存储 API，适用于需要立即写入的场景
          </p>
        </div>
        <div class="input-group">
          <input
            v-model="syncValue"
            type="text"
            class="input"
            placeholder="输入文本"
          >
          <button
            class="button"
            @click="resetSync"
          >
            重置
          </button>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">
          useStorageAsync 示例
        </h3>
        <div class="info-item">
          <span class="label">当前值：</span>
          <span class="value">{{ asyncValue }}</span>
        </div>
        <div class="info-item">
          <p class="note">
            注意：useStorageAsync 已被废弃，它只是 useStorage 的别名
          </p>
        </div>
        <div class="input-group">
          <input
            v-model="asyncValue"
            type="text"
            class="input"
            placeholder="输入文本"
          >
          <button
            class="button"
            @click="resetAsync"
          >
            重置
          </button>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">
          操作说明
        </h3>
        <div
          class="info-item"
          style="flex-direction: column;"
        >
          <p>1. 修改任意值后刷新页面，数据会保持</p>
          <p>2. 点击重置按钮可恢复默认值</p>
          <p>3. 点击删除按钮可从存储中移除值</p>
          <p>4. 打开控制台可查看存储操作日志</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useStorage, useStorageSync } from '@caikengren/uni-hooks';

// 字符串存储示例
const stringValue = useStorage('demo-string', '默认字符串');
const resetString = () => {
  stringValue.value = '默认字符串';
  console.log('字符串已重置');
};

// 数字存储示例
const numberValue = useStorage('demo-number', 100);
const resetNumber = () => {
  numberValue.value = 100;
  console.log('数字已重置');
};

// 布尔值存储示例
const booleanValue = useStorage('demo-boolean', false);
const toggleBoolean = () => {
  booleanValue.value = !booleanValue.value;
  console.log('布尔值已切换为:', booleanValue.value);
};
const resetBoolean = () => {
  booleanValue.value = false;
  console.log('布尔值已重置');
};

// 对象存储示例
const defaultObject = { name: '测试用户', age: 25, isVIP: false };
const objectValue = useStorage('demo-object', defaultObject);
const updateObject = () => {
  objectValue.value = {
    ...objectValue.value,
    age: objectValue.value.age + 1,
    lastUpdated: new Date().toISOString(),
  };
  console.log('对象已更新:', objectValue.value);
};
const resetObject = () => {
  objectValue.value = { ...defaultObject };
  console.log('对象已重置');
};

// 数组存储示例
const defaultArray = ['项目1', '项目2', '项目3'];
const arrayValue = useStorage('demo-array', defaultArray);
const addArrayItem = () => {
  arrayValue.value = [...arrayValue.value, `项目${arrayValue.value.length + 1}`];
  console.log('数组已添加项目:', arrayValue.value);
};
const removeArrayItem = () => {
  if (arrayValue.value.length > 0) {
    arrayValue.value = arrayValue.value.slice(0, -1);
    console.log('数组已删除最后一项:', arrayValue.value);
  }
};
const resetArray = () => {
  arrayValue.value = [...defaultArray];
  console.log('数组已重置');
};

// 删除存储对象示例
const removableValue = useStorage('demo-removable', '');
const removableInputValue = ref('');
const setRemovableValue = () => {
  removableValue.value = removableInputValue.value;
  console.log('可删除值已设置:', removableValue.value);
};
const removeValue = () => {
  removableValue.value = undefined;
  console.log('存储对象已删除');
};

// useStorageSync 示例
const syncValue = useStorageSync('demo-sync', '这是通过 useStorageSync 存储的值');
const resetSync = () => {
  syncValue.value = '这是通过 useStorageSync 存储的值';
  console.log('同步存储已重置');
};

// useStorage 异步示例 (替换原来的useStorageAsync)
const asyncValue = useStorage('demo-async', '这是通过 useStorage 存储的值');
const resetAsync = () => {
  asyncValue.value = '这是通过 useStorage 存储的值';
  console.log('异步存储已重置');
};
</script>

<style scoped>
.container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 24px;
  color: #333;
}

.section {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #eee;
}

.section:last-child {
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 0;
}

.section-title {
  font-size: 18px;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 16px;
  color: #333;
}

.info-item {
  margin-bottom: 12px;
  display: flex;
  align-items: flex-start;
}

.label {
  font-weight: 500;
  color: #666;
  width: 100px;
  flex-shrink: 0;
}

.value {
  color: #333;
}

.value.active {
  color: #4caf50;
  font-weight: 500;
}

.note {
  font-size: 12px;
  color: #f44336;
  font-style: italic;
  margin: 4px 0;
}

.code {
  background-color: #f5f5f5;
  padding: 8px;
  border-radius: 4px;
  font-family: monospace;
  white-space: pre-wrap;
  word-break: break-all;
}

.input-group {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.button {
  padding: 0px 16px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.button:hover {
  background-color: #1976d2;
}

.button:active {
  background-color: #0d47a1;
}

.button.danger {
  background-color: #f44336;
}

.button.danger:hover {
  background-color: #d32f2f;
}

.button.danger:active {
  background-color: #b71c1c;
}
</style>
