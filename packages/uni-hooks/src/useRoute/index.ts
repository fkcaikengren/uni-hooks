function genQueryToStr(query: Record<string, string | number>) {
  return Object.keys(query).map((key) => {
    const value = query[key]
    return `${key}=${value}`
  }).join('&')
}

/**
 * RouteInfo 路由信息
 */
export interface RouteInfo {
  /**
   * path 路由路径
   * @example /pages/index
   */
  path: string
  /**
   * query 路由参数
   * @default {}
   * @example { a: 1, b: 2 }
   */
  query: Record<string, string>
  /**
   * queryStr 路由参数字符串
   * @example a=1&b=2
   */
  queryStr: string
}

/**
 * 获取路由信息
 * @function useRoute
 * @returns {RouteInfo} 路由信息
 *
 * @example
 *
 * import { useRoute } from '@caikengren/uni-hooks';
 *
 * const { path, query, queryStr } = useRoute();
 * console.log(path, query, queryStr);
 */
export function useRoute(): RouteInfo {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  // @ts-ignore
  const query = currentPage?.options || {}
  return {
    path: currentPage.route || '',
    query,
    queryStr: genQueryToStr(query),
    // 1.不支持动态参数 params
    // 2.对于fullPath 小程序没有fullPath
  }
}
