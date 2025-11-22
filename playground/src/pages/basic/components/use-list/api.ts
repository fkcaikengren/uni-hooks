// 模拟列表数据
let mockData = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  title: `列表项 ${index + 1}`,
  content: `这是列表项 ${index + 1} 的内容`,
}))

/**
 * 获取资源列表
 * @param page 页码，默认为1
 * @param pageSize 每页条数，默认为10
 * @param keyword 搜索关键词，默认为空
 * @returns Promise
 */
export function getResourceList(page = 1, pageSize = 10, keyword = '') {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // 根据关键词筛选数据
        let filteredData = mockData
        if (keyword) {
          filteredData = mockData.filter(item => item.title.toLowerCase().includes(String(keyword).toLowerCase())
            || item.content.toLowerCase().includes(String(keyword).toLowerCase()))
        }

        // 计算分页数据
        const startIndex = (Number(page) - 1) * Number(pageSize)
        const endIndex = startIndex + Number(pageSize)
        const list = filteredData.slice(startIndex, endIndex)

        // 判断是否还有更多数据
        const is_end = endIndex >= filteredData.length

        // 返回请求结果
        resolve({
          code: 200,
          data: {
            list,
            is_end,
            total: filteredData.length,
            page: Number(page),
          },
          message: '请求成功',
          success: true,
        })
      }
      catch (error) {
        reject({
          code: 500,
          data: null,
          message: '获取资源列表失败',
          success: false,
        })
      }
    }, 2000) // 模拟2秒的网络延迟
  })
}

/**
 * 删除资源
 * @param id 要删除的资源ID
 * @returns Promise
 */
export function deleteResource(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (!id) {
          reject({
            code: 400,
            data: null,
            message: '缺少必要参数 id',
            success: false,
          })
          return
        }

        // 从模拟数据中删除指定id的项
        const initialLength = mockData.length
        mockData = mockData.filter(item => item.id !== Number(id))

        // 检查是否成功删除
        if (mockData.length === initialLength) {
          reject({
            code: 404,
            data: null,
            message: `未找到 ID 为 ${id} 的资源`,
            success: false,
          })
          return
        }

        resolve({
          code: 200,
          data: { success: true },
          message: '请求成功',
          success: true,
        })
      }
      catch (error) {
        reject({
          code: 500,
          data: null,
          message: '删除资源失败',
          success: false,
        })
      }
    }, 2000) // 模拟2秒的网络延迟
  })
}
