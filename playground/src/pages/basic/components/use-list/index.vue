<template>
  <div class="container">
    <!-- 搜索和刷新区域 -->
    <div class="search-container">
      <input
        v-model="searchKeyword"
        type="text"
        class="search-input"
        placeholder="请输入搜索关键词"
        @keyup.enter="handleSearch"
      >
      <button
        class="search-btn btn"
        @click="handleSearch"
      >
        搜索
      </button>
      <button
        class="refresh-btn btn"
        @click="handleRefresh"
      >
        刷新
      </button>
    </div>

    <div class="container-scroll">
      <!-- 列表加载中 -->
      <div
        v-if="loading"
        class="loading"
      >
        加载中...
      </div>

      <!-- 列表内容 -->
      <div v-else>
        <div
          v-if="data && data.list && data.list.length > 0"
          class="list-container"
        >
          <div
            v-for="item in data.list"
            :key="item.id"
            class="list-item"
          >
            <div class="item-content">
              <h4>{{ item.title }}</h4>
            </div>
            <button
              class="delete-btn btn"
              @click="handleDelete(item.id)"
            >
              删除
            </button>
          </div>

          <!-- 加载更多 -->
          <div class="load-more-container">
            <button
              v-if="!isEnd"
              class="load-more-btn btn"
              :disabled="loadingMore"
              @click="handleLoadMore"
            >
              {{ loadingMore ? '加载中...' : '加载更多' }}
            </button>
            <div
              v-else
              class="no-more"
            >
              没有更多数据了
            </div>
          </div>
        </div>

        <!-- 空列表 -->
        <div
          v-else
          class="empty-list"
        >
          暂无数据
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import { useList, useRequest } from '@caikengren/uni-hooks';

import { getResourceList, deleteResource } from './api';

const PAGE_SIZE = 10;
const searchKeyword = ref('');

// 使用 useList hook 获取列表数据
const {
  data,
  loading,
  loadingMore,
  isEnd,
  loadMore,
  reload,
  mutate,
} = useList(async (data) => {
  console.log(data, 'data');
  const page = data ? data.page : 0;
  console.log(page, 'page---');
  const res = await getResourceList(page + 1, PAGE_SIZE, searchKeyword.value);
  return res.data;
}, {
  manual: false, // 自动加载第一页数据
  showLoadingToast: true,
  loadingToastMessage: '加载中',

  onSuccess: (result) => {
    console.log('加载成功', result);
  },
  onError: (error) => {
    console.error('加载失败', error);
  },
});

// 加载更多
const handleLoadMore = () => {
  loadMore();
};

// 搜索功能
const handleSearch = () => {
  reload(); // 刷新列表，重新加载第一页
};

// 刷新功能
const handleRefresh = () => {
  searchKeyword.value = ''; // 清空搜索关键词
  reload(); // 刷新列表
};

// 删除列表项
const { run: handleDelete } = useRequest(
  async (id) => {
    try {
      await deleteResource(id);
      // 使用 mutate 更新列表数据
      if (data.value && data.value.list) {
        const newList = data.value.list.filter(item => item.id !== id);
        mutate({
          ...data.value,
          list: newList,
        });
      }
    } catch (error) {
      console.error('删除失败', error);
    }
  },
  {
    manual: true,
    onBefore: () => {
      uni.showToast({
        title: '删除中...',
        icon: 'loading',
      });
    },
    onError: () => {
      uni.showToast({
        title: '删除失败',
        icon: 'none',
      });
    },
    onSuccess: () => {
      uni.showToast({
        title: '删除成功',
        icon: 'success',
      });
    },
  },
);

// 组件挂载时自动加载数据（由于设置了manual: false，这里不需要手动调用refresh）
onMounted(() => {
  console.log('组件已挂载');
});
</script>

<style scoped>
.container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.search-container {
  display: flex;
  margin-bottom: 20px;
  gap: 10px;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
}
.btn {
  padding: 0px 16px;
  font-size: 14px;
  line-height: 36px;
}

.search-btn {
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-btn:hover {
  background-color: #40a9ff;
}

.refresh-btn {
  background-color: #52c41a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.refresh-btn:hover {
  background-color: #73d13d;
}

/* .container-scroll {
  height: 600px;
  overflow: auto;
} */

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #666;
}

.list-container {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
  border-bottom: 1px solid #eee;
}

.list-item:last-child {
  border-bottom: none;
}

.item-content {
  flex: 1;
}


.item-content p {
  margin: 0;
  color: #666;
}

.delete-btn {
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: #ff7875;
}

.load-more-container {
  padding: 15px;
  text-align: center;
}

.load-more-btn {
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 4px 6px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.load-more-btn:hover {
  background-color: #40a9ff;
}

.load-more-btn:disabled {
  background-color: #d9d9d9;
  cursor: not-allowed;
}

.no-more {
  color: #999;
  font-size: 14px;
}

.empty-list {
  text-align: center;
  padding: 30px;
  color: #999;
  font-size: 16px;
}
</style>
